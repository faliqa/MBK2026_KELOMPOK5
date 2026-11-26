// Gerak, tabrakan, pengambilan sampah, collector.
import { GAME_CONFIG, T, DEBUG } from '../core/config.js';
import { PLAYER_STATE, keys } from '../state.js';
import { MAPS_DATA, solid } from './world.js';
import { gain } from './economy.js';
import { toast, updateComboHUD, updateHUD, updateLevelHUD } from './ui.js';
import { awardXP } from './progression.js';
import { BASE_COMBO_SECONDS, XP_PER_PICKUP } from '../data/skills.js';
import { burst, floatText } from '../render/effects.js';
import { sfx } from '../core/audio.js';
import { dist, clamp } from '../core/util.js';

export function speedMul() {
  const skillBonus = PLAYER_STATE.progression.skills.speed * 0.04;
  return (1 + (PLAYER_STATE.equipped.speed ? 0.35 : 0) + skillBonus) * DEBUG.speed;
}

export function collectorRadius(type) {
  let r = GAME_CONFIG.MAGNET_BASE + PLAYER_STATE.progression.skills.magnet * 10;
  for (const c of PLAYER_STATE.collectors) if (c.type === type) r = Math.max(r, c.radius);
  if (PLAYER_STATE.equipped.magnet) r = Math.max(r, GAME_CONFIG.MAGNET_BASE + 42);
  return r;
}

export function pickupTrash(map, idx) {
  const tr = map.trash[idx];
  if (!tr) return;
  map.trash.splice(idx, 1);
  const combo = PLAYER_STATE.combo;
  combo.count = combo.timeLeft > 0 ? combo.count + 1 : 1;
  combo.timeLeft = BASE_COMBO_SECONDS + PLAYER_STATE.progression.skills.combo * 0.7;
  const extra = PLAYER_STATE.equipped.extra && Math.random() < GAME_CONFIG.EXTRA_CHANCE;
  const amt = 1 + (extra ? 1 : 0);
  gain(tr.type, amt);
  const levelsGained = awardXP(XP_PER_PICKUP);
  if (levelsGained > 0) {
    toast(`Level ${PLAYER_STATE.progression.level}! +${levelsGained} poin skill.`);
    updateHUD();
  }
  const col = tr.type === 'organik' ? '#8fe45a' : tr.type === 'anorganik' ? '#6fd0ff' : '#ffe14d';
  burst(tr.x, tr.y, col, 10);
  floatText(tr.x, tr.y - 10, `+${amt} ${tr.type.toUpperCase()}`, col);
  if (combo.count >= 5 && combo.count % 5 === 0) {
    PLAYER_STATE.stock[tr.type]++;
    updateHUD();
    burst(tr.x, tr.y - 8, '#ffe17b', 14);
    floatText(tr.x, tr.y - 28, 'COMBO BONUS +1', '#ffe17b');
    toast(`Combo x${combo.count}! Bonus +1 ${tr.type}.`);
  }
  updateComboHUD(combo.count, combo.timeLeft /
    (BASE_COMBO_SECONDS + PLAYER_STATE.progression.skills.combo * 0.7));
  sfx('pick');
}

export function updatePlayer(dt) {
  const map = MAPS_DATA[PLAYER_STATE.map];
  const slowZone = (map.slowZones || []).find((zone) =>
    PLAYER_STATE.x >= zone.x * T && PLAYER_STATE.x < (zone.x + zone.w) * T &&
    PLAYER_STATE.y >= zone.y * T && PLAYER_STATE.y < (zone.y + zone.h) * T);
  const sp = GAME_CONFIG.SPEED * speedMul() * (slowZone ? slowZone.speed : 1);
  let vx = 0, vy = 0;
  if (keys.has('a') || keys.has('arrowleft')) vx--;
  if (keys.has('d') || keys.has('arrowright')) vx++;
  if (keys.has('w') || keys.has('arrowup')) vy--;
  if (keys.has('s') || keys.has('arrowdown')) vy++;
  PLAYER_STATE.moving = !!(vx || vy);
  if (vx && vy) { vx *= 0.7071; vy *= 0.7071; }
  if (vx < 0) PLAYER_STATE.dir = 'left';
  else if (vx > 0) PLAYER_STATE.dir = 'right';
  else if (vy < 0) PLAYER_STATE.dir = 'up';
  else if (vy > 0) PLAYER_STATE.dir = 'down';

  const hw = 7, hh = 9;
  const free = (nx, ny) => {
    const l = nx - hw, r = nx + hw, tp = ny - hh, bt = ny;
    for (let ty = Math.floor(tp / T); ty <= Math.floor((bt - 1) / T); ty++)
      for (let tx = Math.floor(l / T); tx <= Math.floor((r - 1) / T); tx++)
        if (solid(map, tx, ty)) return false;
    return true;
  };
  const nx = PLAYER_STATE.x + vx * sp * dt;
  if (free(nx, PLAYER_STATE.y)) PLAYER_STATE.x = clamp(nx, hw, map.w * T - hw);
  const ny = PLAYER_STATE.y + vy * sp * dt;
  if (free(PLAYER_STATE.x, ny)) PLAYER_STATE.y = clamp(ny, hh, map.h * T);

  if (PLAYER_STATE.moving) {
    PLAYER_STATE.animT += dt;
    if (PLAYER_STATE.animT > 0.13) { PLAYER_STATE.animT = 0; PLAYER_STATE.frame ^= 1; }
  } else {
    PLAYER_STATE.frame = 0;
    PLAYER_STATE.animT = 0;
  }
}

export function updateAutoPick(map, dt) {
  const combo = PLAYER_STATE.combo;
  if (combo.timeLeft > 0) {
    combo.timeLeft = Math.max(0, combo.timeLeft - dt);
    if (combo.timeLeft === 0) combo.count = 0;
    updateComboHUD(combo.count, combo.timeLeft /
      (BASE_COMBO_SECONDS + PLAYER_STATE.progression.skills.combo * 0.7));
  }
  if (map.kind !== 'zone') return;
  for (const type of ['organik', 'anorganik', 'b3']) {
    const r = collectorRadius(type);
    for (let i = map.trash.length - 1; i >= 0; i--) {
      const tr = map.trash[i];
      if (tr.type !== type) continue;
      if (dist(tr.x, tr.y, PLAYER_STATE.x, PLAYER_STATE.y) < r) pickupTrash(map, i);
    }
  }
  for (const type of ['organik', 'anorganik', 'b3']) {
    if (!PLAYER_STATE.collectors.some((c) => c.gen && c.type === type)) continue;
    PLAYER_STATE.genTimer[type] += dt;
    if (PLAYER_STATE.genTimer[type] >= GAME_CONFIG.MYTHIC_TICK) {
      PLAYER_STATE.genTimer[type] = 0;
      gain(type, 1);
      floatText(PLAYER_STATE.x, PLAYER_STATE.y - 46, `+1 ${type.toUpperCase()}`, '#ff4d6d');
      burst(PLAYER_STATE.x, PLAYER_STATE.y - 24, '#ff4d6d', 8);
    }
  }
}
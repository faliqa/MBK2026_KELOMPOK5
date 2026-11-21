// Roll rarity, pity, penerapan item, kondisi menang.
import { GAME_CONFIG, DEBUG } from '../core/config.js';
import { PLAYER_STATE } from '../state.js';
import { RARITY, GACHA_POOL } from '../data/items.js';
import { pick } from '../core/util.js';
import { gain } from './economy.js';
import { MAPS_DATA } from './world.js';
import { sfx } from '../core/audio.js';
import * as ui from './ui.js';

const MACHINE_MAP = {
  organik: 'fac_organik',
  anorganik: 'fac_anorganik',
  b3: 'fac_b3'
};

export function rollRarity(theme) {
  if (PLAYER_STATE.pity[theme] >= GAME_CONFIG.PITY_LIMIT - 1) return 'mythic';
  let total = 0;
  for (const k in RARITY) total += RARITY[k].w;
  let r = Math.random() * total;
  for (const k in RARITY) { r -= RARITY[k].w; if (r <= 0) return k; }
  return 'common';
}

export function applyItem(item) {
  if (item.c === 'deco') {
    PLAYER_STATE.decor.push(item.id);
  } else if (item.c === 'buff') {
    PLAYER_STATE.inventory.push(item.id);
    if (!PLAYER_STATE.equipped[item.slot]) PLAYER_STATE.equipped[item.slot] = item.id;
  } else {
    PLAYER_STATE.inventory.push(item.id);
    PLAYER_STATE.collectors.push({
      id: item.id, type: item.type, rarity: item.r,
      radius: item.radius, gen: !!item.gen
    });
    if (item.r === 'mythic') PLAYER_STATE.mythics[item.type] = true;
  }
}

export function openGacha(theme) {
  PLAYER_STATE.gachaTheme = theme;
  document.getElementById('gacha-title').textContent = MAPS_DATA[MACHINE_MAP[theme]].name.toUpperCase();
  refreshGacha();
  document.getElementById('panel-gacha').classList.add('show');
}

export function refreshGacha() {
  const t = PLAYER_STATE.gachaTheme;
  if (!t) return;
  const stock = PLAYER_STATE.stock[t];
  const pity = PLAYER_STATE.pity[t];
  document.getElementById('gacha-info').innerHTML =
    `Sampah <b>${t.toUpperCase()}</b> dimiliki: <b>${stock}</b> / 3 per tarikan<br>` +
    `Pity Mythic: <b>${pity}/${GAME_CONFIG.PITY_LIMIT}</b> - dijamin pada tarikan ke-${GAME_CONFIG.PITY_LIMIT}.`;
  document.getElementById('pull1').disabled = stock < 3;
  document.getElementById('pull10').disabled = stock < 30;
}

export function doPull(times) {
  const t = PLAYER_STATE.gachaTheme;
  if (!t || PLAYER_STATE.stock[t] < times * 3) return;
  if (!DEBUG.infiniteStock) PLAYER_STATE.stock[t] -= times * 3;

  const out = [];
  for (let i = 0; i < times; i++) {
    const rar = rollRarity(t);
    PLAYER_STATE.pity[t] = rar === 'mythic' ? 0 : PLAYER_STATE.pity[t] + 1;
    const pool = GACHA_POOL[t].filter((it) => it.r === rar);
    const item = pick(pool);
    out.push(item);
    applyItem(item);
    PLAYER_STATE.stats.pulls++;
  }

  const hasMythic = out.some((o) => o.r === 'mythic');
  const hasLegend = out.some((o) => o.r === 'legend');
  sfx(hasMythic ? 'mythic' : hasLegend ? 'legend' : 'gacha');
  if (hasMythic) PLAYER_STATE.shake = 11;
  else if (hasLegend) PLAYER_STATE.shake = 6;

  ui.renderResult(out);
  ui.updateHUD();
  refreshGacha();
  checkWin();
}

export function checkWin() {
  if (PLAYER_STATE.won) return;
  const m = PLAYER_STATE.mythics;
  if (m.organik && m.anorganik && m.b3) {
    PLAYER_STATE.won = true;
    ui.showWin(PLAYER_STATE.stats);
    sfx('mythic');
  }
}

export { gain };
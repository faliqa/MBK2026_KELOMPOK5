// Deteksi target terdekat dan aksi E.
import { GAME_CONFIG, T } from '../core/config.js';
import { PLAYER_STATE, RUNTIME } from '../state.js';
import { MAPS_DATA, getMapSpawn, initMap } from './world.js';
import { pickupTrash } from './player.js';
import { openGacha } from './gacha.js';
import { setPrompt, toast, anyPanelOpen } from './ui.js';
import { talkTo } from './npc.js';
import { dist } from '../core/util.js';

export function updateInteract(map) {
  RUNTIME.nearest = null;
  let best = GAME_CONFIG.PICK_RANGE;

  map.trash.forEach((tr, i) => {
    const d = dist(tr.x, tr.y, PLAYER_STATE.x, PLAYER_STATE.y);
    if (d < best) { best = d; RUNTIME.nearest = { kind: 'trash', map, idx: i }; }
  });

  for (const npc of map.npcs || []) {
    const d = dist(npc.x * T + T / 2, (npc.y + 1) * T, PLAYER_STATE.x, PLAYER_STATE.y);
    if (d < best) { best = d; RUNTIME.nearest = { kind: 'npc', npc }; }
  }

  for (const p of map.portals) {
    const d = dist(p.x * T + T / 2, p.y * T + T / 2, PLAYER_STATE.x, PLAYER_STATE.y);
    if (d < best) { best = d; RUNTIME.nearest = { kind: 'portal', to: p.to }; }
  }

  if (map.machine) {
    const mx = map.machine.tx * T + T;
    const my = map.machine.ty * T + 2 * T;
    const d = dist(mx, my, PLAYER_STATE.x, PLAYER_STATE.y);
    if (d < best + 18) RUNTIME.nearest = { kind: 'machine', theme: map.machine.theme };
  }

  if (anyPanelOpen()) { setPrompt(null); return; }
  const n = RUNTIME.nearest;
  if (!n) { setPrompt(null); return; }
  setPrompt(
    n.kind === 'trash' ? '[E] Pungut sampah' :
    n.kind === 'portal' ? '[E] Masuk portal' :
    n.kind === 'npc' ? '[E] Bicara dengan ' + n.npc.name :
    '[E] Putar mesin gacha'
  );
}

export function interact() {
  if (RUNTIME.transitioning > 0 || !RUNTIME.nearest) return;
  const n = RUNTIME.nearest;
  if (n.kind === 'trash') { pickupTrash(n.map, n.idx); RUNTIME.nearest = null; }
  else if (n.kind === 'portal') travel(n.to);
  else if (n.kind === 'npc') talkTo(n.npc);
  else if (n.kind === 'machine') openGacha(n.theme);
}

export function travel(id) {
  if (RUNTIME.transitioning > 0) return;
  RUNTIME.transitioning = 1;
  setTimeout(() => {
    const map = MAPS_DATA[id];
    if (!map) { RUNTIME.transitioning = 0; return; }
    PLAYER_STATE.map = id;
    initMap(map);
    const spawn = getMapSpawn(map);
    PLAYER_STATE.x = spawn.x;
    PLAYER_STATE.y = spawn.y;
    PLAYER_STATE.shake = 4;
    RUNTIME.transitioning = 0;
    toast('Tiba di ' + map.name);
  }, 220);
}
// Tabrakan, spawn sampah, akses peta.
import MAPS_DATA from '../data/maps.json';
import { GAME_CONFIG, T } from '../core/config.js';
import { pick, dist, rnd } from '../core/util.js';
import { PLAYER_STATE } from '../state.js';

export { MAPS_DATA };

export function solid(map, tx, ty) {
  if (tx < 0 || ty < 0 || tx >= map.w || ty >= map.h) return true;
  for (const [x, y, w, h] of map.walls)
    if (tx >= x && tx < x + w && ty >= y && ty < y + h) return true;
  return false;
}

export function freeTiles(map) {
  if (map._free) return map._free;
  const out = [];
  for (let y = 1; y < map.h - 1; y++)
    for (let x = 1; x < map.w - 1; x++)
      if (!solid(map, x, y)) out.push([x, y]);
  map._free = out;
  return out;
}

export function initMap(map) {
  if (!map.trash) map.trash = [];
  if (!map._spawnT) map._spawnT = 0;
}

export function getMapSpawn(map) {
  const spawn = map.spawn || { x: Math.floor(map.w / 2), y: map.h - 3 };
  return { x: spawn.x * T + T / 2, y: spawn.y * T + T / 2 };
}

export function spawnTrash(map) {
  if (map.kind !== 'zone') return;
  if (map.trash.length >= GAME_CONFIG.TRASH_MAX) return;
  const ft = freeTiles(map);
  for (let i = 0; i < 12; i++) {
    const [tx, ty] = pick(ft);
    const wx = tx * T + T / 2, wy = ty * T + T / 2;
    if (dist(wx, wy, PLAYER_STATE.x, PLAYER_STATE.y) < T * 2) continue;
    map.trash.push({ x: wx, y: wy, type: map.type, bob: rnd(0, 6.28) });
    return;
  }
}
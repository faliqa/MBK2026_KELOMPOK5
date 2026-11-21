// Generator ubin prosedural, di-cache per peta.
import { hash2 } from '../core/util.js';

const FLOOR_CACHE = new Map();

export const TILE_FNS = {
  grass(g, tx, ty) {
    g.fillStyle = '#4b7a37'; g.fillRect(tx*16, ty*16, 16, 16);
    for (let j = 0; j < 16; j++) for (let i = 0; i < 16; i++) {
      const n = hash2(tx*16+i, ty*16+j);
      if (n > 0.80) { g.fillStyle = '#5d9245'; g.fillRect(tx*16+i, ty*16+j, 1, 1); }
      else if (n > 0.96) { g.fillStyle = '#6ba84f'; g.fillRect(tx*16+i, ty*16+j, 1, 2); }
    }
  },
  dirt(g, tx, ty) {
    g.fillStyle = '#8a6a48'; g.fillRect(tx*16, ty*16, 16, 16);
    for (let j = 0; j < 16; j++) for (let i = 0; i < 16; i++) {
      const n = hash2(tx*16+i+99, ty*16+j);
      if (n > 0.78) { g.fillStyle = '#9c7a55'; g.fillRect(tx*16+i, ty*16+j, 1, 1); }
      else if (n > 0.94) { g.fillStyle = '#6f5238'; g.fillRect(tx*16+i, ty*16+j, 1, 1); }
    }
  },
  stone(g, tx, ty) {
    g.fillStyle = '#8b8b96'; g.fillRect(tx*16, ty*16, 16, 16);
    g.fillStyle = '#75757f';
    for (let r = 0; r < 4; r++) {
      const y = ty*16 + r*4;
      g.fillRect(tx*16, y, 16, 1);
      const off = (r % 2) ? 4 : 0;
      g.fillRect(tx*16+off, y, 1, 4);
      g.fillRect(tx*16+off+8, y, 1, 4);
    }
    for (let j = 0; j < 16; j++) for (let i = 0; i < 16; i++)
      if (hash2(tx*16+i+7, ty*16+j) > 0.9) { g.fillStyle = '#9a9aa5'; g.fillRect(tx*16+i, ty*16+j, 1, 1); }
  },
  ceramic(g, tx, ty) {
    g.fillStyle = '#d9d0c1'; g.fillRect(tx*16, ty*16, 16, 16);
    g.fillStyle = '#b7ac9b';
    g.fillRect(tx*16, ty*16, 16, 1);
    g.fillRect(tx*16, ty*16, 1, 16);
    for (let j = 0; j < 16; j++) for (let i = 0; i < 16; i++)
      if (hash2(tx*16+i+31, ty*16+j) > 0.93) { g.fillStyle = '#e8e0d3'; g.fillRect(tx*16+i, ty*16+j, 1, 1); }
  },
  factory(g, tx, ty) {
    g.fillStyle = '#474750'; g.fillRect(tx*16, ty*16, 16, 16);
    g.fillStyle = '#5a5a66';
    g.fillRect(tx*16, ty*16, 16, 1);
    g.fillRect(tx*16, ty*16, 1, 16);
    for (let j = 0; j < 16; j++) for (let i = 0; i < 16; i++)
      if (hash2(tx*16+i+53, ty*16+j) > 0.88) { g.fillStyle = '#53535e'; g.fillRect(tx*16+i, ty*16+j, 1, 1); }
  },
  wall(g, tx, ty) {
    g.fillStyle = '#3b3f4d'; g.fillRect(tx*16, ty*16, 16, 16);
    g.fillStyle = '#4e5464'; g.fillRect(tx*16, ty*16, 16, 4);
    g.fillStyle = '#2c303b'; g.fillRect(tx*16, ty*16+13, 16, 3);
    g.fillStyle = '#606878'; g.fillRect(tx*16+2, ty*16+5, 12, 1);
    g.fillStyle = '#31353f'; g.fillRect(tx*16+7, ty*16+6, 2, 7);
  }
};

export function buildFloor(map) {
  if (FLOOR_CACHE.has(map.id)) return FLOOR_CACHE.get(map.id);
  const c = document.createElement('canvas');
  c.width = map.w * 16; c.height = map.h * 16;
  const g = c.getContext('2d');
  g.imageSmoothingEnabled = false;
  const fn = TILE_FNS[map.floor] || TILE_FNS.grass;
  for (let y = 0; y < map.h; y++) for (let x = 0; x < map.w; x++) fn(g, x, y);
  for (const [wx, wy, ww, wh] of map.walls)
    for (let y = wy; y < wy + wh; y++) for (let x = wx; x < wx + ww; x++) TILE_FNS.wall(g, x, y);
  FLOOR_CACHE.set(map.id, c);
  return c;
}

export function clearFloorCache() {
  FLOOR_CACHE.clear();
}
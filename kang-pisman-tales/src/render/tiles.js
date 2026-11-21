// Generator ubin prosedural, di-cache per peta.
import { hash2 } from '../core/util.js';

const FLOOR_CACHE = new Map();
const NATURAL_TEXTURES = new Set(['grass', 'plaza', 'park', 'farm', 'forest']);

function shadeTile(g, tx, ty, material) {
  const x = tx * 16;
  const y = ty * 16;
  const natural = NATURAL_TEXTURES.has(material);
  const marks = natural ? 7 : 13;

  for (let i = 0; i < marks; i++) {
    const n = hash2(tx * 29 + i * 17 + 401, ty * 31 + i * 11 + 701);
    const px = x + 2 + Math.floor(hash2(tx * 19 + i + 83, ty * 23 + i + 47) * 12);
    const py = y + 2 + Math.floor(hash2(tx * 17 + i + 31, ty * 13 + i + 97) * 12);
    const highlight = py < y + 8;
    const alpha = natural ? (highlight ? '.15' : '.13') : (highlight ? '.21' : '.18');
    g.fillStyle = highlight ? `rgba(255,255,255,${alpha})` : `rgba(0,0,0,${alpha})`;
    g.fillRect(px, py, n > 0.88 ? 2 : 1, 1);
  }
}

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
  plaza(g, tx, ty) {
    TILE_FNS.grass(g, tx, ty);
    if (hash2(tx, ty) > 0.82) {
      const x = tx * 16 + 3 + Math.floor(hash2(tx + 5, ty) * 9);
      const y = ty * 16 + 3 + Math.floor(hash2(tx, ty + 7) * 9);
      g.fillStyle = '#f2d879'; g.fillRect(x, y, 1, 1);
      g.fillStyle = '#e9a6b0'; g.fillRect(x + 1, y, 1, 1);
    }
  },
  park(g, tx, ty) {
    TILE_FNS.grass(g, tx, ty);
    if (hash2(tx + 19, ty + 31) > 0.72) {
      g.fillStyle = '#9fc56b'; g.fillRect(tx * 16 + 2, ty * 16 + 11, 1, 2);
      g.fillRect(tx * 16 + 12, ty * 16 + 3, 1, 2);
    }
  },
  farm(g, tx, ty) {
    TILE_FNS.grass(g, tx, ty);
    if (hash2(tx + 43, ty + 11) > 0.68) {
      g.fillStyle = '#b19665'; g.fillRect(tx * 16 + 2, ty * 16 + 13, 3, 1);
      g.fillStyle = '#d1b879'; g.fillRect(tx * 16 + 3, ty * 16 + 12, 1, 1);
    }
  },
  forest(g, tx, ty) {
    g.fillStyle = '#385c38'; g.fillRect(tx * 16, ty * 16, 16, 16);
    for (let j = 0; j < 16; j++) for (let i = 0; i < 16; i++) {
      const n = hash2(tx * 16 + i + 71, ty * 16 + j + 29);
      if (n > 0.82) { g.fillStyle = '#4c7143'; g.fillRect(tx * 16 + i, ty * 16 + j, 1, 1); }
      else if (n < 0.05) { g.fillStyle = '#8c7953'; g.fillRect(tx * 16 + i, ty * 16 + j, 1, 1); }
    }
  },
  greenhouse(g, tx, ty) {
    g.fillStyle = '#b8cdb0'; g.fillRect(tx * 16, ty * 16, 16, 16);
    g.fillStyle = '#91aa88'; g.fillRect(tx * 16, ty * 16, 16, 1);
    g.fillRect(tx * 16, ty * 16, 1, 16);
    g.fillStyle = '#d5dfc4'; g.fillRect(tx * 16 + 2, ty * 16 + 3, 12, 1);
    if (hash2(tx + 6, ty + 9) > 0.72) {
      g.fillStyle = '#698f57'; g.fillRect(tx * 16 + 11, ty * 16 + 9, 2, 2);
    }
  },
  studio(g, tx, ty) {
    g.fillStyle = '#516a8d'; g.fillRect(tx * 16, ty * 16, 16, 16);
    g.fillStyle = '#7795b4'; g.fillRect(tx * 16, ty * 16, 16, 1);
    g.fillStyle = '#405875'; g.fillRect(tx * 16, ty * 16 + 8, 16, 1);
    g.fillRect(tx * 16 + 8, ty * 16, 1, 16);
    g.fillStyle = '#91b5c5'; g.fillRect(tx * 16 + 2, ty * 16 + 2, 1, 1);
    g.fillRect(tx * 16 + 13, ty * 16 + 12, 1, 1);
  },
  reactor(g, tx, ty) {
    g.fillStyle = '#292c3b'; g.fillRect(tx * 16, ty * 16, 16, 16);
    g.fillStyle = '#41475a'; g.fillRect(tx * 16, ty * 16, 16, 1);
    g.fillRect(tx * 16, ty * 16, 1, 16);
    g.fillStyle = '#6e4a69'; g.fillRect(tx * 16 + 3, ty * 16 + 3, 10, 1);
    if ((tx + ty) % 4 === 0) {
      g.fillStyle = '#d3b447'; g.fillRect(tx * 16 + 12, ty * 16 + 11, 2, 1);
    }
  },
  wood(g, tx, ty) {
    const x = tx * 16, y = ty * 16;
    g.fillStyle = '#805a3b'; g.fillRect(x, y, 16, 16);
    g.fillStyle = '#a5764b'; g.fillRect(x, y + 1, 16, 6);
    g.fillStyle = '#67462f'; g.fillRect(x, y + 7, 16, 1);
    g.fillStyle = '#946a45'; g.fillRect(x, y + 8, 16, 7);
    g.fillStyle = '#563d2c'; g.fillRect(x + (ty % 2) * 8, y + 7, 1, 9);
    g.fillStyle = '#bd9260'; g.fillRect(x + 3, y + 3, 3, 1);
  },
  braga(g, tx, ty) {
    const x = tx * 16, y = ty * 16;
    g.fillStyle = '#55575b'; g.fillRect(x, y, 16, 16);
    g.fillStyle = '#626468'; g.fillRect(x + 1, y + 1, 14, 14);
    g.fillStyle = '#484a4d'; g.fillRect(x + 7, y + 3, 1, 1);
    if (hash2(tx + 3, ty + 17) > 0.68) {
      g.fillStyle = '#737579'; g.fillRect(x + 3, y + 11, 2, 1);
    }
  },
  school(g, tx, ty) {
    const x = tx * 16, y = ty * 16;
    g.fillStyle = '#b9a47e'; g.fillRect(x, y, 16, 16);
    g.fillStyle = '#d5c293'; g.fillRect(x + 1, y + 1, 6, 6);
    g.fillRect(x + 9, y + 9, 6, 6);
    g.fillStyle = '#8f8067'; g.fillRect(x + 8, y, 1, 16);
    g.fillRect(x, y + 8, 16, 1);
  },
  office(g, tx, ty) {
    const x = tx * 16, y = ty * 16;
    g.fillStyle = '#78634f'; g.fillRect(x, y, 16, 16);
    g.fillStyle = '#987858'; g.fillRect(x + 1, y + 1, 14, 6);
    g.fillStyle = '#604d40'; g.fillRect(x, y + 7, 16, 1);
    g.fillStyle = '#896e52'; g.fillRect(x + 1, y + 8, 14, 7);
    g.fillStyle = '#b18b5f'; g.fillRect(x + 4, y + 3, 4, 1);
  },
  hospital(g, tx, ty) {
    const x = tx * 16, y = ty * 16;
    g.fillStyle = '#b8cbd0'; g.fillRect(x, y, 16, 16);
    g.fillStyle = '#d8e6e5'; g.fillRect(x + 1, y + 1, 14, 14);
    g.fillStyle = '#9cafb5'; g.fillRect(x, y, 16, 1);
    g.fillRect(x, y, 1, 16);
    g.fillStyle = '#edf3eb'; g.fillRect(x + 2, y + 2, 3, 1);
  },
  industry(g, tx, ty) {
    const x = tx * 16, y = ty * 16;
    g.fillStyle = '#383b43'; g.fillRect(x, y, 16, 16);
    g.fillStyle = '#52565f'; g.fillRect(x + 1, y + 1, 14, 14);
    g.fillStyle = '#292d34'; g.fillRect(x + 1, y + 7, 14, 1);
    g.fillRect(x + 7, y + 1, 1, 14);
    if ((tx + ty) % 5 === 0) {
      g.fillStyle = '#d1ad48'; g.fillRect(x + 11, y + 12, 3, 1);
    }
  },
  wall(g, tx, ty, theme = 'default') {
    const x = tx * 16, y = ty * 16;
    const palettes = {
      default: ['#3b3f4d', '#4e5464', '#2c303b', '#606878'],
      plaza: ['#594735', '#94734f', '#3f352b', '#c5a36d'],
      greenhouse: ['#345342', '#5f8c67', '#233d35', '#9dc67a'],
      studio: ['#354966', '#5b7390', '#263447', '#91b5c5'],
      reactor: ['#3d3049', '#704866', '#282538', '#dc5fb5'],
      farm: ['#563c2b', '#956a43', '#392d25', '#c18d5c'],
      wood: ['#49372c', '#805a3b', '#302922', '#c08e5d'],
      park: ['#35533b', '#567b4a', '#263d30', '#9bbc68'],
      forest: ['#2f4934', '#49674a', '#22342c', '#849451'],
      braga: ['#34363b', '#5a5d62', '#24272b', '#96999b'],
      school: ['#594b3b', '#927c5f', '#3c352e', '#d2bd8b'],
      office: ['#41424b', '#696779', '#2d303a', '#a8a4b8'],
      hospital: ['#55636d', '#92a7ad', '#35444e', '#d6e5df'],
      industry: ['#393a40', '#66615b', '#26282d', '#d5af49']
    };
    const [base, top, shadow, trim] = palettes[theme] || palettes.default;
    g.fillStyle = base; g.fillRect(x, y, 16, 16);
    g.fillStyle = top; g.fillRect(x, y, 16, 4);
    g.fillStyle = shadow; g.fillRect(x, y + 13, 16, 3);
    g.fillStyle = trim; g.fillRect(x + 2, y + 5, 12, 1);
    g.fillStyle = shadow; g.fillRect(x + 7, y + 6, 2, 7);
  }
};

export function buildFloor(map) {
  if (FLOOR_CACHE.has(map.id)) return FLOOR_CACHE.get(map.id);
  const c = document.createElement('canvas');
  c.width = map.w * 16; c.height = map.h * 16;
  const g = c.getContext('2d');
  g.imageSmoothingEnabled = false;
  const fn = TILE_FNS[map.floor] || TILE_FNS.grass;
  for (let y = 0; y < map.h; y++) for (let x = 0; x < map.w; x++) {
    fn(g, x, y);
    shadeTile(g, x, y, map.floor);
  }
  for (const region of map.floorRegions || []) {
    const regionFloor = TILE_FNS[region.floor] || fn;
    for (let y = region.y; y < region.y + region.h; y++)
      for (let x = region.x; x < region.x + region.w; x++)
        if (x >= 0 && y >= 0 && x < map.w && y < map.h) {
          regionFloor(g, x, y);
          shadeTile(g, x, y, region.floor);
        }
  }
  const pathFloor = TILE_FNS[map.pathFloor] || TILE_FNS.dirt;
  for (const [x, y] of map.paths || []) {
    if (x >= 0 && y >= 0 && x < map.w && y < map.h) {
      pathFloor(g, x, y);
      shadeTile(g, x, y, map.pathFloor || 'dirt');
    }
  }
  const wallFloor = TILE_FNS.wall;
  for (const [wx, wy, ww, wh] of map.walls)
    for (let y = wy; y < wy + wh; y++)
      for (let x = wx; x < wx + ww; x++) {
        wallFloor(g, x, y, map.wallTheme);
        shadeTile(g, x, y, map.wallTheme);
      }
  FLOOR_CACHE.set(map.id, c);
  return c;
}

export function clearFloorCache() {
  FLOOR_CACHE.clear();
}
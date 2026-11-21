// Cache sprite: matriks piksel -> offscreen canvas.
import { PIXEL_SPRITES } from '../data/sprites.js';
import { S, T } from '../core/config.js';

const CACHE = new Map();

export function padRows(rows) {
  const w = rows.reduce((m, r) => Math.max(m, r.length), 0);
  return rows.map((r) => r.padEnd(w, '.'));
}

export function buildSpriteCanvas(rows, colors, flip) {
  const g = padRows(rows);
  const w = g[0].length, h = g.length;
  const c = document.createElement('canvas');
  c.width = w; c.height = h;
  const x = c.getContext('2d');
  x.imageSmoothingEnabled = false;
  if (flip) { x.translate(w, 0); x.scale(-1, 1); }
  for (let j = 0; j < h; j++) {
    for (let i = 0; i < w; i++) {
      const ch = g[j][i];
      if (ch === '.') continue;
      const col = colors[ch];
      if (!col) continue;
      x.fillStyle = col;
      x.fillRect(i, j, 1, 1);
    }
  }
  return c;
}

export function getSprite(name, flip) {
  const key = name + (flip ? '#f' : '');
  if (CACHE.has(key)) return CACHE.get(key);
  const def = PIXEL_SPRITES[name];
  if (!def) return null;
  const cv = buildSpriteCanvas(def.rows, def.colors, flip);
  CACHE.set(key, cv);
  return cv;
}

export function drawSprite(ctx, name, px, py, flip) {
  const cv = getSprite(name, flip);
  if (!cv) return;
  ctx.drawImage(cv, Math.round(px), Math.round(py), cv.width * S, cv.height * S);
}

// Jangkar bawah-tengah pada tile.
export function drawDecorSprite(ctx, name, tx, ty) {
  const cv = getSprite(name);
  if (!cv) return;
  const px = tx * T + T / 2 - (cv.width * S) / 2;
  const py = ty * T + T - cv.height * S;
  ctx.drawImage(cv, Math.round(px), Math.round(py), cv.width * S, cv.height * S);
}

// Panggil setelah menamai ulang sprite.
export function clearSpriteCache() {
  CACHE.clear();
}
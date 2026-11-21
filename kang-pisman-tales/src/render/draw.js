// Penggambaran seluruh frame.
import { S, T, DEBUG } from '../core/config.js';
import { rnd, clamp } from '../core/util.js';
import { PLAYER_STATE, particles, floats } from '../state.js';
import { buildFloor } from './tiles.js';
import { getSprite, drawDecorSprite } from './sprite-cache.js';
import { findItem } from '../data/items.js';

export function draw(ctx, map, canvas) {
  ctx.save();
  if (PLAYER_STATE.shake > 0) {
    const s = PLAYER_STATE.shake;
    ctx.translate(rnd(-s, s), rnd(-s, s));
  }
  ctx.fillStyle = '#080a10';
  ctx.fillRect(-20, -20, canvas.width + 40, canvas.height + 40);
  ctx.drawImage(buildFloor(map), 0, 0, map.w * T * S, map.h * T * S);

  const pulse = (Math.sin(performance.now() / 260) + 1) / 2;
  for (const p of map.portals) {
    ctx.globalAlpha = 0.18 + pulse * 0.28;
    ctx.fillStyle = '#5fe0ff';
    ctx.beginPath();
    ctx.ellipse(p.x * T + T / 2, p.y * T + T / 2, T * S * 0.55, T * S * 0.3, 0, 0, 6.3);
    ctx.fill();
    ctx.globalAlpha = 1;
    drawDecorSprite(ctx, 'portal', p.x, p.y);
  }

  const list = [];
  (map.decor || []).forEach((d) =>
    list.push({ y: d.ty * T + T, fn: () => drawDecorSprite(ctx, d.s, d.tx, d.ty) }));

  map.trash.forEach((tr) => list.push({
    y: tr.y,
    fn: () => {
      const bob = Math.sin(performance.now() / 300 + tr.bob) * 2;
      const cv = getSprite('trash_' + tr.type);
      if (cv) ctx.drawImage(cv,
        Math.round(tr.x - (cv.width * S) / 2),
        Math.round(tr.y - cv.height * S + bob),
        cv.width * S, cv.height * S);
      ctx.globalAlpha = 0.2;
      ctx.fillStyle = '#000';
      ctx.beginPath();
      ctx.ellipse(tr.x, tr.y + 2, 7 * S * 0.5, 3 * S * 0.5, 0, 0, 6.3);
      ctx.fill();
      ctx.globalAlpha = 1;
    }
  }));

  if (map.kind === 'lobby') {
    (map.showcase || []).forEach((slot, i) => {
      const id = PLAYER_STATE.decor[i];
      if (!id) return;
      const it = findItem(id);
      if (!it) return;
      list.push({ y: slot.ty * T + T, fn: () => drawDecorSprite(ctx, it.s, slot.tx, slot.ty) });
    });
    if (PLAYER_STATE.mythics.organik)
      list.push({ y: 3 * T + T, fn: () => drawDecorSprite(ctx, 'kalpataru', 14, 2) });
    if (PLAYER_STATE.mythics.anorganik)
      list.push({ y: 3 * T + T, fn: () => drawDecorSprite(ctx, 'monumen', 6, 2) });
  }

  list.push({
    y: PLAYER_STATE.y,
    fn: () => {
      const cv = getSprite('player_' + PLAYER_STATE.dir, PLAYER_STATE.dir === 'right');
      if (!cv) return;
      const off = PLAYER_STATE.frame ? 1 : 0;
      ctx.globalAlpha = 0.22;
      ctx.fillStyle = '#000';
      ctx.beginPath();
      ctx.ellipse(PLAYER_STATE.x, PLAYER_STATE.y + 1, 9 * S * 0.5, 4 * S * 0.5, 0, 0, 6.3);
      ctx.fill();
      ctx.globalAlpha = 1;
      ctx.drawImage(cv,
        Math.round(PLAYER_STATE.x - (cv.width * S) / 2) + off,
        Math.round(PLAYER_STATE.y - cv.height * S),
        cv.width * S, cv.height * S);
    }
  });

  if (PLAYER_STATE.mythics.b3) {
    list.push({
      y: PLAYER_STATE.y - 30,
      fn: () => {
        const t = performance.now() / 400;
        const mx = PLAYER_STATE.x + Math.cos(t) * 34;
        const my = PLAYER_STATE.y - 52 + Math.sin(t * 1.7) * 7;
        const cv = getSprite('mecha');
        if (cv) ctx.drawImage(cv, mx - 12 * S, my, cv.width * S, cv.height * S);
      }
    });
  }

  list.sort((a, b) => a.y - b.y);
  list.forEach((o) => o.fn());

  for (const p of particles) {
    ctx.globalAlpha = clamp(p.life * 2, 0, 1);
    ctx.fillStyle = p.c;
    ctx.fillRect(p.x, p.y, p.s * S, p.s * S);
  }
  ctx.globalAlpha = 1;
  ctx.font = 'bold 13px ui-monospace,monospace';
  ctx.textAlign = 'center';
  for (const f of floats) {
    ctx.globalAlpha = clamp(f.life, 0, 1);
    ctx.fillStyle = '#000';
    ctx.fillText(f.text, f.x + 1, f.y + 1);
    ctx.fillStyle = f.c;
    ctx.fillText(f.text, f.x, f.y);
  }
  ctx.globalAlpha = 1;
  ctx.textAlign = 'left';

  if (DEBUG.revealHitbox) {
    ctx.strokeStyle = '#ff0';
    ctx.strokeRect(PLAYER_STATE.x - 7, PLAYER_STATE.y - 9, 14, 9);
  }
  ctx.restore();

  ctx.fillStyle = 'rgba(6,9,15,.72)';
  ctx.fillRect(0, canvas.height - 24, canvas.width, 24);
  ctx.fillStyle = '#9fb4d8';
  ctx.font = '11px ui-monospace,monospace';
  ctx.fillText(map.name + '  -  WASD/panah gerak - E interaksi - ESC tutup', 10, canvas.height - 8);
}
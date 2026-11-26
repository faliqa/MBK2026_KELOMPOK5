// Penggambaran seluruh frame.
import { S, T, DEBUG } from '../core/config.js';
import { rnd, clamp } from '../core/util.js';
import { PLAYER_STATE } from '../state.js';
import { particles, floats } from './effects.js';
import { buildFloor } from './tiles.js';
import { getSprite, drawDecorSprite, drawImageWithShadow } from './sprite-cache.js';
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
  if (map.id === 'z_taman') {
    ctx.fillStyle = 'rgba(255,178,91,.12)';
    ctx.fillRect(0, 0, map.w * T * S, map.h * T * S);
  }
  if (map.id === 'z_hutan') {
    const t = performance.now() / 1000;
    for (let i = 0; i < 10; i++) {
      const x = ((i * 83 + t * (8 + i % 4) * S) % (map.w * T * S));
      const y = ((i * 41 + t * (12 + i % 3) * S) % (map.h * T * S));
      ctx.fillStyle = i % 2 ? '#c1a34b' : '#7b9b45';
      ctx.fillRect(x, y, 2 * S, S);
    }
  }

  const pulse = (Math.sin(performance.now() / 260) + 1) / 2;
  for (const p of map.portals) {
    ctx.globalAlpha = 0.18 + pulse * 0.28;
    ctx.fillStyle = '#5fe0ff';
    ctx.beginPath();
    ctx.ellipse(p.x * T * S + T * S / 2, p.y * T * S + T * S / 2, T * S * 0.55, T * S * 0.3, 0, 0, 6.3);
    ctx.fill();
    ctx.globalAlpha = 1;
    drawDecorSprite(ctx, 'portal', p.x, p.y);
  }

  const list = [];
  if (map.machine) {
    const machine = map.machine;
    list.push({
      y: machine.ty * T + 2 * T,
      fn: () => {
        const cv = getSprite('machine_' + machine.theme);
        if (!cv) return;
        const x = (machine.tx * T + T) * S;
        const y = (machine.ty * T + 2 * T) * S;
        drawImageWithShadow(ctx, cv,
          Math.round(x - (cv.width * S) / 2),
          Math.round(y - (cv.height * S) / 2),
          cv.width * S, cv.height * S);
        const left = x - (cv.width * S) / 2;
        const top = y - (cv.height * S) / 2;
        const frame = Math.floor(performance.now() / 140);
        if (machine.theme === 'organik') {
          ctx.fillStyle = '#d8ff8a';
          ctx.fillRect(left + (9 + frame % 3) * S, top + (12 - frame % 4) * S, 2 * S, 2 * S);
          ctx.fillRect(left + (15 - frame % 4) * S, top + (15 - (frame + 2) % 4) * S, S, S);
        } else if (machine.theme === 'anorganik') {
          ctx.fillStyle = '#b7f4ff';
          ctx.fillRect(left + 7 * S, top + (10 + frame % 7) * S, 10 * S, S);
        } else {
          const tubes = ['#67efff', '#ff56d7', '#9dff45', '#ffd34e', '#9b6bff', '#ffffff'];
          for (let i = 0; i < tubes.length; i++) {
            ctx.fillStyle = tubes[(i + frame) % tubes.length];
            ctx.fillRect(left + (5 + i * 2) * S, top + 8 * S, S, 2 * S);
          }
        }
      }
    });
  }
  (map.decor || []).forEach((d) =>
    list.push({
      y: d.ty * T + T,
      fn: () => {
        drawDecorSprite(ctx, d.s, d.tx, d.ty);
        if (d.s === 'fountain') {
          const phase = Math.floor(performance.now() / 180) % 3;
          const x = (d.tx * T + T / 2) * S;
          const y = (d.ty * T + T - 12 + 4) * S;
          ctx.fillStyle = phase === 1 ? '#d5faff' : '#7bd4e4';
          ctx.fillRect(x - 2 * S, y - phase * S, S, S);
          ctx.fillRect(x + 2 * S, y - ((phase + 1) % 3) * S, S, S);
        } else if (d.s === 'conveyor') {
          const offset = Math.floor(performance.now() / 110) % 4;
          const x = d.tx * T * S;
          const y = (d.ty * T + T - 8 + 4) * S;
          ctx.fillStyle = '#d2d7dc';
          for (let i = 0; i < 4; i++)
            ctx.fillRect(x + ((i * 4 + offset) % 16) * S, y, 2 * S, S);
        }
      }
    }));

  const drawIdleActor = (actor, interactive) => {
    list.push({
      y: (actor.y + 1) * T,
      fn: () => {
        const cv = getSprite(actor.sprite);
        if (!cv) return;
        const x = (actor.x * T + T / 2) * S;
        const foot = (actor.y * T + T) * S;
        const bob = Math.sin(performance.now() / 460 + (actor.phase || 0)) * (interactive ? 0.7 : 1.1) * S;
        const top = foot - cv.height * S + bob;
        ctx.globalAlpha = 0.2;
        ctx.fillStyle = '#000';
        ctx.beginPath();
        ctx.ellipse(x, foot, 9 * S * 0.5, 4 * S * 0.5, 0, 0, 6.3);
        ctx.fill();
        ctx.globalAlpha = 1;
        drawImageWithShadow(ctx, cv,
          Math.round(x - cv.width * S / 2), Math.round(top), cv.width * S, cv.height * S, 0.2);
        if (actor.name) {
          ctx.font = 'bold 10px ui-monospace,monospace';
          ctx.textAlign = 'center';
          ctx.fillStyle = '#10141d';
          ctx.fillText(actor.name, x + 1, top - 4);
          ctx.fillStyle = '#f2e7c6';
          ctx.fillText(actor.name, x, top - 5);
          ctx.textAlign = 'left';
        }
      }
    });
  };
  (map.npcs || []).forEach((npc) => drawIdleActor(npc, true));
  (map.animals || []).forEach((animal) => drawIdleActor(animal, false));

  map.trash.forEach((tr) => list.push({
    y: tr.y,
    fn: () => {
      const bob = Math.sin(performance.now() / 300 + tr.bob) * 2;
      const cv = getSprite('trash_' + tr.type);
      if (cv) drawImageWithShadow(ctx, cv,
        Math.round(tr.x * S - (cv.width * S) / 2),
        Math.round(tr.y * S - cv.height * S + bob * S),
        cv.width * S, cv.height * S, 0.22);
      ctx.globalAlpha = 0.2;
      ctx.fillStyle = '#000';
      ctx.beginPath();
      ctx.ellipse(tr.x * S, (tr.y + 2) * S, 7 * S * 0.5, 3 * S * 0.5, 0, 0, 6.3);
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
      const spriteName = PLAYER_STATE.dir === 'right'
        ? 'player_left'
        : `player_${PLAYER_STATE.dir}`;
      const cv = getSprite(spriteName, PLAYER_STATE.dir === 'right');
      if (!cv) return;
      const off = PLAYER_STATE.frame ? 1 : 0;
      ctx.globalAlpha = 0.22;
      ctx.fillStyle = '#000';
      ctx.beginPath();
      ctx.ellipse(PLAYER_STATE.x * S, (PLAYER_STATE.y + 1) * S, 9 * S * 0.5, 4 * S * 0.5, 0, 0, 6.3);
      ctx.fill();
      ctx.globalAlpha = 1;
      drawImageWithShadow(ctx, cv,
        Math.round(PLAYER_STATE.x * S - (cv.width * S) / 2) + off * S,
        Math.round(PLAYER_STATE.y * S - cv.height * S),
        cv.width * S, cv.height * S, 0.25);
    }
  });

  PLAYER_STATE.collectors.forEach((collector, index) => {
    list.push({
      y: PLAYER_STATE.y - 30 + index * 0.01,
      fn: () => {
        const t = performance.now() / 400 + index * 1.7;
        const mx = (PLAYER_STATE.x + Math.cos(t) * 34) * S;
        const my = (PLAYER_STATE.y - 52 + Math.sin(t * 1.7) * 7) * S;
        const cv = getSprite(collector.type === 'b3' ? 'mecha' : 'drone');
        if (cv) drawImageWithShadow(ctx, cv, mx - (cv.width * S) / 2, my,
          cv.width * S, cv.height * S, 0.24);
      }
    });
  });

  list.sort((a, b) => a.y - b.y);
  list.forEach((o) => o.fn());

  for (const p of particles) {
    ctx.globalAlpha = clamp(p.life * 2, 0, 1);
    ctx.fillStyle = p.c;
    ctx.fillRect(p.x * S, p.y * S, p.s * S, p.s * S);
  }
  ctx.globalAlpha = 1;
  ctx.font = 'bold 13px ui-monospace,monospace';
  ctx.textAlign = 'center';
  for (const f of floats) {
    ctx.globalAlpha = clamp(f.life, 0, 1);
    ctx.fillStyle = '#000';
    ctx.fillText(f.text, f.x * S + 1, f.y * S + 1);
    ctx.fillStyle = f.c;
    ctx.fillText(f.text, f.x * S, f.y * S);
  }
  ctx.globalAlpha = 1;
  ctx.textAlign = 'left';

  const vignette = ctx.createRadialGradient(
    canvas.width / 2, canvas.height / 2, Math.min(canvas.width, canvas.height) * 0.28,
    canvas.width / 2, canvas.height / 2, Math.max(canvas.width, canvas.height) * 0.72
  );
  vignette.addColorStop(0, 'rgba(5, 8, 12, 0)');
  vignette.addColorStop(1, 'rgba(5, 8, 12, 0.25)');
  ctx.fillStyle = vignette;
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  if (DEBUG.revealHitbox) {
    ctx.strokeStyle = '#ff0';
    ctx.strokeRect((PLAYER_STATE.x - 7) * S, (PLAYER_STATE.y - 9) * S, 14 * S, 9 * S);
  }
  ctx.restore();

  ctx.fillStyle = 'rgba(6,9,15,.72)';
  ctx.fillRect(0, canvas.height - 24, canvas.width, 24);
  ctx.fillStyle = '#9fb4d8';
  ctx.font = '11px ui-monospace,monospace';
  ctx.fillText(map.name + '  -  WASD/panah gerak - E interaksi - ESC tutup', 10, canvas.height - 8);
}
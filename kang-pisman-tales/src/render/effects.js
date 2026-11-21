// Partikel, teks melayang, guncangan layar.
import { rnd, rndi, clamp } from '../core/util.js';
import { PLAYER_STATE } from '../state.js';
import { GAME_CONFIG } from '../core/config.js';

export const particles = [];
export const floats = [];

export function burst(x, y, color, n) {
  for (let i = 0; i < n; i++)
    particles.push({ x, y, vx: rnd(-70, 70), vy: rnd(-110, -20), life: 0.55, c: color, s: rndi(1, 3) });
}

export function floatText(x, y, text, color) {
  floats.push({ x, y, text, c: color, life: 1 });
}

export function updateEffects(dt) {
  for (let i = particles.length - 1; i >= 0; i--) {
    const p = particles[i];
    p.life -= dt;
    if (p.life <= 0) { particles.splice(i, 1); continue; }
    p.x += p.vx * dt; p.y += p.vy * dt; p.vy += 340 * dt;
  }
  for (let i = floats.length - 1; i >= 0; i--) {
    const f = floats[i];
    f.life -= dt * 0.9;
    f.y -= 26 * dt;
    if (f.life <= 0) floats.splice(i, 1);
  }
  PLAYER_STATE.shake = Math.max(0, PLAYER_STATE.shake - GAME_CONFIG.SHAKE_DECAY * dt * 3);
}

export { clamp };
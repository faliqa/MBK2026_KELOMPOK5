// Titik masuk: boot, input, loop.
import { T } from './core/config.js';
import { PLAYER_STATE, RUNTIME, keys } from './state.js';
import { MAPS_DATA, initMap, spawnTrash } from './systems/world.js';
import { updatePlayer, updateAutoPick } from './systems/player.js';
import { updateInteract, interact, travel } from './systems/interaction.js';
import { doPull } from './systems/gacha.js';
import { updateEffects } from './render/effects.js';
import { draw } from './render/draw.js';
import * as ui from './systems/ui.js';

const canvas = document.getElementById('game');
const ctx = canvas.getContext('2d');
ctx.imageSmoothingEnabled = false;

ui.bindUI();
ui.setPullHandler(doPull);
ui.setTravelHandler(travel);

window.addEventListener('keydown', (e) => {
  const k = e.key.toLowerCase();
  if (['arrowup', 'arrowdown', 'arrowleft', 'arrowright', ' '].includes(k)) e.preventDefault();
  if (k === 'escape') { ui.closeAll(); return; }
  keys.add(k);
  if ((k === 'e' || k === ' ') && !ui.anyPanelOpen() && RUNTIME.transitioning === 0) interact();
});
window.addEventListener('keyup', (e) => keys.delete(e.key.toLowerCase()));

function loop(t) {
  const dt = Math.min(0.05, (t - RUNTIME.lastT) / 1000 || 0);
  RUNTIME.lastT = t;

  const map = MAPS_DATA[PLAYER_STATE.map];
  initMap(map);

  if (!ui.anyPanelOpen() && RUNTIME.transitioning === 0) updatePlayer(dt);
  updateAutoPick(map, dt);
  updateInteract(map);

  map._spawnT += dt;
  if (map._spawnT > 3.2) { map._spawnT = 0; spawnTrash(map); }

  updateEffects(dt);
  draw(ctx, map, canvas);

  if (RUNTIME.transitioning > 0) {
    ctx.fillStyle = `rgba(0,0,0,${RUNTIME.transitioning * 0.9})`;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
  }
  requestAnimationFrame(loop);
}

function boot() {
  for (const id in MAPS_DATA) {
    const m = MAPS_DATA[id];
    initMap(m);
    if (m.kind === 'zone') for (let i = 0; i < 4; i++) spawnTrash(m);
  }
  PLAYER_STATE.map = 'lobby';
  PLAYER_STATE.x = 10 * T + T / 2;
  PLAYER_STATE.y = 9 * T + T / 2;
  ui.updateHUD();
  ui.toast('Selamat datang, Kang Pisman!');
  requestAnimationFrame(loop);
}

boot();
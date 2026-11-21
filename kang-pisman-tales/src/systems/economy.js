// Penambahan stok sampah dan statistik.
import { PLAYER_STATE } from '../state.js';
import { updateHUD } from './ui.js';

export function gain(type, n) {
  PLAYER_STATE.stock[type] += n;
  PLAYER_STATE.stats.picked += n;
  updateHUD();
}
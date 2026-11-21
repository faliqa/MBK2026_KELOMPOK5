// Penambahan stok sampah dan statistik.
import { PLAYER_STATE } from '../state.js';
import { toast, updateHUD } from './ui.js';

export function gain(type, n) {
  PLAYER_STATE.stock[type] += n;
  PLAYER_STATE.stats.picked += n;
  const mission = PLAYER_STATE.missions.starterWaste;
  if (!mission.rewarded && PLAYER_STATE.stats.picked >= mission.goal) {
    mission.completed = true;
    mission.rewarded = true;
    PLAYER_STATE.stock.organik += 3;
    toast('Misi selesai! Bonus +3 sampah organik.');
  }
  updateHUD();
}
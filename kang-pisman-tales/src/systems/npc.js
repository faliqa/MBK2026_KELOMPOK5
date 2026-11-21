import { NPC_DIALOGUES } from '../data/npc-dialogues.js';
import { PLAYER_STATE } from '../state.js';
import { showDialogue } from './ui.js';

export function talkTo(npc) {
  let lines = NPC_DIALOGUES[npc.dialogue];
  if (npc.dialogue === 'budi' && PLAYER_STATE.missions.starterWaste.rewarded) {
    lines = [
      'Terima kasih sudah memilah 5 sampah! Bonus 3 sampah organik sudah masuk ke koleksimu.',
      'Teruskan kebiasaan memilah sampah agar lingkungan Bandung tetap bersih.'
    ];
  } else if (npc.dialogue === 'budi') {
    const goal = PLAYER_STATE.missions.starterWaste.goal;
    const progress = Math.min(PLAYER_STATE.stats.picked, goal);
    lines = [
      NPC_DIALOGUES.budi[0],
      `Progress misi: ${progress}/${goal}. Hadiahmu adalah 3 sampah organik.`
    ];
  }
  if (!lines) return;
  showDialogue(npc.name, lines);
}

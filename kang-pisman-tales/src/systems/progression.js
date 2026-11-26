import { PLAYER_STATE } from '../state.js';
import { SKILLS, xpToNextLevel } from '../data/skills.js';

export function awardXP(amount) {
  if (!Number.isFinite(amount) || amount <= 0) return 0;
  const progression = PLAYER_STATE.progression;
  progression.xp += amount;
  let levelsGained = 0;

  while (progression.xp >= xpToNextLevel(progression.level)) {
    progression.xp -= xpToNextLevel(progression.level);
    progression.level++;
    progression.skillPoints++;
    levelsGained++;
  }
  return levelsGained;
}

export function upgradeSkill(id) {
  const definition = SKILLS[id];
  if (!definition || PLAYER_STATE.progression.skillPoints < 1) return false;
  if (PLAYER_STATE.progression.skills[id] >= definition.maxRank) return false;
  PLAYER_STATE.progression.skills[id]++;
  PLAYER_STATE.progression.skillPoints--;
  return true;
}

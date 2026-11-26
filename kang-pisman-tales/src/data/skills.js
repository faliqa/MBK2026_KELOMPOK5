export const XP_PER_PICKUP = 25;
export const BASE_COMBO_SECONDS = 5.5;

export const SKILLS = {
  speed: {
    name: 'Langkah Gesit',
    description: 'Kecepatan bergerak +4% per rank.',
    maxRank: 5
  },
  magnet: {
    name: 'Magnet Sampah',
    description: 'Jangkauan pungut otomatis +10 px per rank.',
    maxRank: 5
  },
  combo: {
    name: 'Rantai Pemilah',
    description: 'Waktu untuk menjaga combo +0,7 detik per rank.',
    maxRank: 5
  }
};

export function xpToNextLevel(level) {
  return 100 + Math.max(0, level - 1) * 50;
}

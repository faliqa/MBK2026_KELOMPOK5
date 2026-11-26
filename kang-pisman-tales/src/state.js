// Modul 6: state pemain. Satu sumber kebenaran.
export const PLAYER_STATE = {
  x: 0, y: 0, dir: 'down', moving: false, animT: 0, frame: 0,
  map: 'lobby',
  stock: { organik: 0, anorganik: 0, b3: 0 },
  mythics: { organik: false, anorganik: false, b3: false },
  pity: { organik: 0, anorganik: 0, b3: 0 },
  inventory: [], decor: [], collectors: [],
  equipped: { speed: null, magnet: null, extra: null },
  genTimer: { organik: 0, anorganik: 0, b3: 0 },
  combo: { count: 0, timeLeft: 0 },
  progression: {
    level: 1,
    xp: 0,
    skillPoints: 0,
    skills: { speed: 0, magnet: 0, combo: 0 }
  },
  missions: { starterWaste: { goal: 5, completed: false, rewarded: false } },
  stats: { picked: 0, pulls: 0 },
  won: false, freeRoam: false,
  shake: 0
};

// State sementara yang tidak perlu disimpan.
export const RUNTIME = {
  nearest: null,
  gachaTheme: null,
  transitioning: 0,
  lastT: 0
};

export const keys = new Set();
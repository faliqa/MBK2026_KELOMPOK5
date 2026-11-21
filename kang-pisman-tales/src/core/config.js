// Modul 1: konfigurasi global. Ubah di sini untuk tuning.
export const GAME_CONFIG = {
  TILE: 16,
  SCALE: 3,
  COLS: 32,
  ROWS: 20,
  SPEED: 96,
  PICK_RANGE: 36,
  MAGNET_BASE: 24,
  EXTRA_CHANCE: 0.25,
  TRASH_MAX: 6,
  TRASH_RESPAWN: 3.2,
  MYTHIC_TICK: 8,
  PITY_LIMIT: 12,
  SHAKE_DECAY: 7,
  SAVE_KEY: 'kangpisman_save_v1'
};

export const S = GAME_CONFIG.SCALE;
export const T = GAME_CONFIG.TILE;

// Flag debug. Matikan sebelum build final.
export const DEBUG = {
  infiniteStock: false,
  revealHitbox: false,
  speed: 1
};
// Modul 2: palet warna karakter.
export const PALETTE = {
  skin:  { s: '#f2c49b', S: '#d9a074' },
  hair:  { h: '#3b2a1e', H: '#5a4030' },
  cloth: { r: '#d9483b', R: '#a63328', b: '#2f4f7a', n: '#f2c94c' },
  face:  { e: '#ffffff', p: '#14161d', m: '#b5563f' },
  shoe:  { k: '#23242b' },
  rarity: {
    common: '#9aa6bd', uncommon: '#5cd98a', rare: '#4fa8ff',
    epic: '#b06bff', legend: '#ffb340', mythic: '#ff4d6d'
  }
};

export const P_PLAYER = {
  ...PALETTE.skin, ...PALETTE.hair, ...PALETTE.cloth,
  ...PALETTE.face, ...PALETTE.shoe
};
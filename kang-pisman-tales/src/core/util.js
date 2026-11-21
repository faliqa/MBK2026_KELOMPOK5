// Modul 0: utilitas matematika dan acak.
export const rnd  = (a, b) => a + Math.random() * (b - a);
export const rndi = (a, b) => Math.floor(rnd(a, b + 1));
export const clamp = (v, a, b) => Math.max(a, Math.min(b, v));
export const dist = (a, b, c, d) => Math.hypot(a - c, b - d);
export const pick = (arr) => arr[Math.floor(Math.random() * arr.length)];

// Hash deterministik untuk noise ubin.
export function hash2(x, y) {
  let n = x * 374761393 + y * 668265263;
  n = (n ^ (n >> 13)) * 1274126177;
  return ((n ^ (n >> 16)) >>> 0) / 4294967296;
}
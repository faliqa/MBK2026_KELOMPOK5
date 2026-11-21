// Akses aman ke kolam item.
import gacha from './gacha.json';

export const RARITY = gacha.rarity;
export const CATEGORIES = gacha.categories;
export const GACHA_POOL = gacha.pool;

export function allItems() {
  return Object.values(GACHA_POOL).flat();
}
export function findItem(id) {
  return allItems().find((i) => i.id === id);
}
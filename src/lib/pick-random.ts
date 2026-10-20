/** Client-side random picks (call only from event handlers or effects, not during SSR). */

export function pickRandomIndex(
  length: number,
  avoidIndex: number | null = null,
): number {
  if (length <= 0) {
    return 0;
  }
  if (length === 1) {
    return 0;
  }
  if (avoidIndex === null || avoidIndex < 0 || avoidIndex >= length) {
    return Math.floor(Math.random() * length);
  }

  let index = Math.floor(Math.random() * length);
  if (index === avoidIndex) {
    index = (avoidIndex + 1 + Math.floor(Math.random() * (length - 1))) % length;
  }
  return index;
}

export function pickRandomItem<T>(
  items: readonly T[],
  avoidIndex: number | null = null,
): { item: T; index: number } {
  const index = pickRandomIndex(items.length, avoidIndex);
  return { item: items[index] as T, index };
}

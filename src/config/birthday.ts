/**
 * Aysha's birthday (month and day only). Never expose birth year or age in the UI.
 */
export const ayshaBirthday = {
  month: 11,
  day: 1,
} as const;

export type AyshaBirthdayConfig = typeof ayshaBirthday;

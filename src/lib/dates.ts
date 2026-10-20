import { ayshaBirthday } from "@/config/birthday";

export type BirthdayPhase = "birthday" | "countdown";

export type BirthdayStatus =
  | { phase: "birthday" }
  | { phase: "countdown"; daysRemaining: number };

/** Local calendar date at midnight (no time component). */
export function startOfLocalDay(date: Date): Date {
  return new Date(date.getFullYear(), date.getMonth(), date.getDate());
}

export function isBirthdayOnDate(
  date: Date,
  month: number = ayshaBirthday.month,
  day: number = ayshaBirthday.day,
): boolean {
  const local = startOfLocalDay(date);
  return local.getMonth() + 1 === month && local.getDate() === day;
}

/** Whole calendar days from `from` until `to` (local dates). */
export function differenceInCalendarDays(from: Date, to: Date): number {
  const a = startOfLocalDay(from);
  const b = startOfLocalDay(to);
  const msPerDay = 86_400_000;
  return Math.round((b.getTime() - a.getTime()) / msPerDay);
}

function localBirthdayDate(year: number, month: number, day: number): Date {
  return new Date(year, month - 1, day);
}

/**
 * Days until the next occurrence of the birthday (month/day).
 * Returns 0 when `from` is already on the birthday (use `computeBirthdayStatus` instead).
 */
export function daysUntilNextBirthday(
  from: Date,
  month: number = ayshaBirthday.month,
  day: number = ayshaBirthday.day,
): number {
  const today = startOfLocalDay(from);
  const year = today.getFullYear();
  let next = localBirthdayDate(year, month, day);

  if (today.getTime() > next.getTime()) {
    next = localBirthdayDate(year + 1, month, day);
  }

  return Math.max(0, differenceInCalendarDays(today, next));
}

export function computeBirthdayStatus(
  now: Date,
  month: number = ayshaBirthday.month,
  day: number = ayshaBirthday.day,
): BirthdayStatus {
  if (isBirthdayOnDate(now, month, day)) {
    return { phase: "birthday" };
  }

  const daysRemaining = daysUntilNextBirthday(now, month, day);
  return { phase: "countdown", daysRemaining: Math.max(1, daysRemaining) };
}

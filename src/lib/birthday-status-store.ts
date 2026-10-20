import { ayshaBirthday } from "@/config/birthday";
import { getBirthdayClockTick } from "@/lib/birthday-clock-subscribe";
import {
  parseBirthdayDevPreview,
  resolveBirthdayStatusWithPreview,
} from "@/lib/birthday-preview";
import { computeBirthdayStatus, type BirthdayStatus } from "@/lib/dates";

export const BIRTHDAY_STATUS_SNAPSHOT = "birthday" as const;
export const LOADING_STATUS_SNAPSHOT = "loading" as const;

const birthdayStatus: BirthdayStatus = { phase: "birthday" };
const countdownByDays = new Map<number, BirthdayStatus>();

function countdownStatus(daysRemaining: number): BirthdayStatus {
  const cached = countdownByDays.get(daysRemaining);
  if (cached) {
    return cached;
  }
  const status: BirthdayStatus = { phase: "countdown", daysRemaining };
  countdownByDays.set(daysRemaining, status);
  return status;
}

function readStatus(search: URLSearchParams): BirthdayStatus {
  const preview = parseBirthdayDevPreview(search);
  return resolveBirthdayStatusWithPreview(new Date(), preview, (now) =>
    computeBirthdayStatus(now, ayshaBirthday.month, ayshaBirthday.day),
  );
}

/** Stable string for `useSyncExternalStore` (must not allocate fresh objects). */
export function getBirthdayStatusSnapshot(searchKey: string): string {
  void getBirthdayClockTick();
  const status = readStatus(new URLSearchParams(searchKey));
  if (status.phase === "birthday") {
    return BIRTHDAY_STATUS_SNAPSHOT;
  }
  return `countdown:${status.daysRemaining}`;
}

export function parseBirthdayStatusSnapshot(
  snapshot: string,
): BirthdayStatus | null {
  if (snapshot === LOADING_STATUS_SNAPSHOT) {
    return null;
  }
  if (snapshot === BIRTHDAY_STATUS_SNAPSHOT) {
    return birthdayStatus;
  }
  if (snapshot.startsWith("countdown:")) {
    const days = Number.parseInt(snapshot.slice("countdown:".length), 10);
    if (Number.isFinite(days) && days >= 1) {
      return countdownStatus(days);
    }
  }
  return null;
}

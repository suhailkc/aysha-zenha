import type { BirthdayStatus } from "@/lib/dates";

export type BirthdayDevPreview =
  | { kind: "live" }
  | { kind: "birthday" }
  | { kind: "countdown"; daysRemaining: number };

const PREVIEW_PARAM = "birthdayPreview";

/**
 * Dev-only URL override for countdown / birthday UI. Ignored in production builds.
 */
export function parseBirthdayDevPreview(
  searchParams: URLSearchParams | null | undefined,
): BirthdayDevPreview {
  if (process.env.NODE_ENV === "production") {
    return { kind: "live" };
  }

  const raw = searchParams?.get(PREVIEW_PARAM)?.trim().toLowerCase();
  if (!raw) {
    return { kind: "live" };
  }

  if (raw === "birthday" || raw === "today" || raw === "0") {
    return { kind: "birthday" };
  }

  if (raw === "eve" || raw === "1") {
    return { kind: "countdown", daysRemaining: 1 };
  }

  const days = Number.parseInt(raw, 10);
  if (Number.isFinite(days) && days >= 2 && days <= 366) {
    return { kind: "countdown", daysRemaining: days };
  }

  return { kind: "live" };
}

export function birthdayPreviewQuery(
  mode: "birthday" | "eve" | number,
): string {
  if (mode === "birthday") {
    return `?${PREVIEW_PARAM}=birthday`;
  }
  if (mode === "eve") {
    return `?${PREVIEW_PARAM}=eve`;
  }
  return `?${PREVIEW_PARAM}=${mode}`;
}

export function resolveBirthdayStatusWithPreview(
  now: Date,
  preview: BirthdayDevPreview,
  compute: (date: Date) => BirthdayStatus,
): BirthdayStatus {
  if (preview.kind === "birthday") {
    return { phase: "birthday" };
  }
  if (preview.kind === "countdown") {
    return {
      phase: "countdown",
      daysRemaining: Math.max(1, preview.daysRemaining),
    };
  }
  return compute(now);
}

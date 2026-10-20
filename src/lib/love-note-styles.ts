import type { LoveNoteAccent, LoveNoteCategoryId } from "@/types/content";

export const loveNoteCategoryLabels: Record<LoveNoteCategoryId, string> = {
  encouragement: "Encouragement",
  birthday: "Birthday",
  love: "Love",
  cheer: "Cheer",
  gratitude: "Gratitude",
};

export const loveNoteAccentSurface: Record<LoveNoteAccent, string> = {
  lavender: "bg-lavender/35 border-lavender/50",
  pink: "bg-bubblegum/30 border-bubblegum/45",
  mint: "bg-mint/35 border-mint/50",
  butter: "bg-butter/40 border-butter/55",
};

export const loveNoteAccentBorder: Record<LoveNoteAccent, string> = {
  lavender: "border-l-lavender",
  pink: "border-l-bubblegum",
  mint: "border-l-mint",
  butter: "border-l-butter",
};

export function loveNoteAccentOrDefault(
  accent: LoveNoteAccent | undefined,
): LoveNoteAccent {
  return accent ?? "lavender";
}

/** Slight tilts for a handmade scrapbook pile (index-based, stable). */
export const loveNoteTilts = [
  "-rotate-1",
  "rotate-1",
  "-rotate-2",
  "rotate-2",
  "rotate-0",
  "-rotate-1",
] as const;

export function loveNoteTiltClass(index: number): string {
  return loveNoteTilts[index % loveNoteTilts.length];
}

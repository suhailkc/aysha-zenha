import type { LoveNoteCategoryId } from "@/types/content";

export const messagesPageContent = {
  title: "Family Love Notes",
  subtitle:
    "Little paper cards tucked onto a scrapbook page — short messages from the people who adore you.",
  emptyTitle: "No love notes yet",
  emptyBody:
    "When you are ready, add message cards in the local data file and they will appear here automatically.",
  emptyHint: "Edit src/data/messages.json",
  editHint:
    "To add, edit, reorder, or remove notes, update src/data/messages.json (see docs/content-editing.md).",
} as const;

export const loveNoteCategoryLabels: Record<LoveNoteCategoryId, string> = {
  encouragement: "Encouragement",
  birthday: "Birthday",
  love: "Love",
  cheer: "Cheer",
  gratitude: "Gratitude",
};

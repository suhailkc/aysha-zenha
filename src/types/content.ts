/** Shared content types for static data (gallery, messages, quizzes). */

export type GalleryTagId =
  | "everyday"
  | "celebrations"
  | "adventures"
  | "goofy-moments";

export type GalleryPhotoEntry = {
  id: string;
  /** Basename under public/photos/ (must match prepare.config.json output). */
  file: string;
  alt: string;
  caption?: string;
  tags?: GalleryTagId[];
};

export type GalleryManifestFile = {
  output: string;
  src: string;
  width: number;
  height: number;
  sourceInput?: string;
};

export type GalleryManifest = {
  version: number;
  generatedAt: string | null;
  files: GalleryManifestFile[];
};

/** Gallery photo merged from manifest + entries (safe to render). */
export type GalleryPhoto = {
  id: string;
  src: string;
  alt: string;
  caption?: string;
  tags: GalleryTagId[];
  width: number;
  height: number;
};

export type LoveNoteAccent = "lavender" | "pink" | "mint" | "butter";

/** Decorative sticker on a love note card (rendered visually, not read aloud). */
export type LoveNoteStickerId =
  | "heart"
  | "star"
  | "flower"
  | "sparkle"
  | "sun";

export type LoveNoteCategoryId =
  | "encouragement"
  | "birthday"
  | "love"
  | "cheer"
  | "gratitude";

export type FamilyMessage = {
  id: string;
  message: string;
  /** Optional sender label or family role (e.g. "Grandma", "Your aunties"). */
  author?: string;
  accent?: LoveNoteAccent;
  sticker: LoveNoteStickerId;
  category?: LoveNoteCategoryId;
};

export type ScrapbookMemoryEntry = {
  id: string;
  /** Basename under `public/images/scrapbook/` (optional until a photo is added). */
  file?: string;
  /** Describe the photo for screen readers; required even when `file` is missing. */
  alt: string;
  caption: string;
  /** Optional broad year or memory grouping, family-approved only. */
  yearOrCategory?: string;
  note?: string;
  /** Paper tint for the spread card. */
  accent?: LoveNoteAccent;
};

/** Scrapbook memory with resolved image path when the file exists locally. */
export type ScrapbookMemory = ScrapbookMemoryEntry & {
  src?: string;
};

export type QuizOption = {
  id: string;
  label: string;
};

export type QuizQuestion = {
  id: string;
  prompt: string;
  options: QuizOption[];
  correctOptionId: string;
  successMessage: string;
  wrongMessage: string;
};

export type {
  DailySprinkleItem,
  DailySprinkleKind,
  StickerDiscoveryItem,
  SurpriseAccent,
  SurpriseDoodleId,
} from "@/data/surprises";

/** Shared content types for static data (gallery, love notes). */

export type GalleryTagId =
  | "everyday"
  | "celebrations"
  | "adventures"
  | "goofy-moments"
  | "karate";

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

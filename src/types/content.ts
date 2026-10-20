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

export type FamilyMessage = {
  id: string;
  author: string;
  message: string;
  accent?: "lavender" | "pink" | "mint" | "butter";
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

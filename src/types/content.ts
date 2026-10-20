/** Shared content types for static data (gallery, messages, quizzes). */

export type GalleryPhoto = {
  id: string;
  src: string;
  alt: string;
  caption?: string;
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

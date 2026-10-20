import type { StickerAccent } from "@/components/ui/Sticker";

export type PersonalityOutcomeId =
  | "sparkle-storm"
  | "giggle-galaxy"
  | "rainbow-explorer"
  | "captain-curious";

export type PersonalityOutcome = {
  id: PersonalityOutcomeId;
  title: string;
  emoji: string;
  tagline: string;
  description: string;
  accent: StickerAccent;
};

export type PersonalityQuizOption = {
  id: string;
  label: string;
  outcomeId: PersonalityOutcomeId;
};

export type PersonalityQuizQuestion = {
  id: string;
  prompt: string;
  options: PersonalityQuizOption[];
};

export type SuperpowerId =
  | "laugh-beam"
  | "snack-radar"
  | "adventure-flip"
  | "bubble-shield"
  | "time-skip-tea"
  | "doodle-life";

export type SuperpowerChoice = {
  id: SuperpowerId;
  title: string;
  teaser: string;
  emoji: string;
  resultTitle: string;
  resultBody: string;
  accent: StickerAccent;
};

export type GiggleEmojiChoice = {
  id: string;
  emoji: string;
  label: string;
  response: string;
};

export type GiggleEmojiPrompt = {
  id: string;
  kind: "emoji";
  prompt: string;
  choices: GiggleEmojiChoice[];
};

export type GiggleActionPrompt = {
  id: string;
  kind: "action";
  prompt: string;
  actionLabel: string;
  response: string;
};

export type GigglePrompt = GiggleEmojiPrompt | GiggleActionPrompt;

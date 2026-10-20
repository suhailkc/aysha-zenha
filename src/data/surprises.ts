/** Interactive surprise copy — edit freely; keep playful labels clearly fictional, not factual. */

export type DailySprinkleKind = "thought" | "playful-fact" | "challenge";

export type SurpriseDoodleId =
  | "star"
  | "flower"
  | "sparkle"
  | "heart"
  | "planet"
  | "smiley";

export type SurpriseAccent = "lavender" | "bubblegum" | "mint" | "butter";

export type DailySprinkleItem = {
  id: string;
  kind: DailySprinkleKind;
  text: string;
};

export type StickerDiscoveryItem = {
  id: string;
  doodle: SurpriseDoodleId;
  /** Short label for the control (shown + used in aria-label). */
  tapLabel: string;
  message: string;
  accent: SurpriseAccent;
  tilt: "left" | "right" | "none";
};

export const surprisesContent = {
  page: {
    title: "Little surprises",
    subtitle:
      "Tap, peek, and giggle. Everything here stays on this page — no sign-ups, no tracking, just silly joy.",
  },
  sections: {
    surpriseMe: {
      title: "Surprise me",
      description: "One random boost of nonsense, fresh each tap.",
      buttonLabel: "Surprise me!",
      closeLabel: "Okay, yay!",
      dialogBadge: "Surprise!",
    },
    envelope: {
      title: "Open a happy envelope",
      description: "A sealed note with something warm tucked inside.",
      openLabel: "Open the envelope",
      resetLabel: "Seal it again",
      sealedHint: "Psst… something nice is waiting inside.",
    },
    dailySprinkle: {
      title: "Daily sprinkle",
      description: "A decorative dose of cheer for today (picked when you tap).",
      buttonLabel: "Today's sprinkle",
      resetLabel: "Hide for now",
      waitingHint: "Tap the star jar when you're ready for today's sprinkle.",
      kindLabels: {
        thought: "Positive thought",
        "playful-fact": "Playful fun fact",
        challenge: "Tiny challenge",
      } satisfies Record<DailySprinkleKind, string>,
      playfulFactDisclaimer:
        "Just for fun — not a real fact about anyone in particular.",
    },
    stickers: {
      title: "Sticker discovery",
      description: "Tap the stickers — each one hides a tiny joke or hello.",
    },
    celebration: {
      title: "Mini celebration",
      description: "A quick confetti moment. No sound, just sparkle.",
      buttonLabel: "Launch mini celebration",
      doneLabel: "Nice!",
      reducedMotionNote: "Confetti skipped — but you're still worth celebrating.",
    },
  },
} as const;

export const surpriseMeMessages = [
  "Breaking news: today is a good day for extra giggles.",
  "Secret mission: find something that makes you smile.",
  "Achievement unlocked: professional fun-haver.",
  "You found the secret sparkle button! Gold star for you.",
  "Plot twist: you are officially awesome today.",
  "Sending a virtual sticker parade your way!",
  "The universe says: keep being wonderfully you.",
  "Reminder: your laugh counts as cardio (probably).",
  "Status update: certified excellent human detected.",
] as const;

export const envelopeMessages = [
  "You are loved louder than a whole sticker collection.",
  "This envelope contains one hug, no assembly required.",
  "May your day have extra butter-yellow moments.",
  "Someone is cheering for you — loudly and off-key.",
  "Keep collecting tiny joys like they're shiny treasures.",
] as const;

export const dailySprinkles = [
  {
    id: "sprinkle-01",
    kind: "thought",
    text: "Your imagination runs on premium glitter fuel.",
  },
  {
    id: "sprinkle-02",
    kind: "playful-fact",
    text: "Scientists agree* that giggles travel faster than walking. (*imaginary scientists)",
  },
  {
    id: "sprinkle-03",
    kind: "challenge",
    text: "Find three things around you that match the mint-green vibe.",
  },
  {
    id: "sprinkle-04",
    kind: "thought",
    text: "Brave looks like trying again after a silly mistake.",
  },
  {
    id: "sprinkle-05",
    kind: "playful-fact",
    text: "Somewhere, a cloud is practicing heart shapes just for fun.",
  },
  {
    id: "sprinkle-06",
    kind: "challenge",
    text: "Draw a tiny star on paper and give it a dramatic name.",
  },
  {
    id: "sprinkle-07",
    kind: "thought",
    text: "Kindness is a superpower that never runs out of battery.",
  },
] as const satisfies readonly DailySprinkleItem[];

export const stickerDiscoveries = [
  {
    id: "sticker-star",
    doodle: "star",
    tapLabel: "Gold star sticker",
    message: "You're the main character of this snack break.",
    accent: "butter",
    tilt: "right",
  },
  {
    id: "sticker-heart",
    doodle: "heart",
    tapLabel: "Heart sticker",
    message: "Emergency hug deployed. Return when needed.",
    accent: "bubblegum",
    tilt: "left",
  },
  {
    id: "sticker-planet",
    doodle: "planet",
    tapLabel: "Planet sticker",
    message: "Your orbit includes excellent people.",
    accent: "lavender",
    tilt: "right",
  },
  {
    id: "sticker-smiley",
    doodle: "smiley",
    tapLabel: "Smiley sticker",
    message: "Official permission granted to be ridiculously silly.",
    accent: "mint",
    tilt: "left",
  },
  {
    id: "sticker-flower",
    doodle: "flower",
    tapLabel: "Flower sticker",
    message: "Bloom wherever you planted your socks this morning.",
    accent: "mint",
    tilt: "none",
  },
  {
    id: "sticker-sparkle",
    doodle: "sparkle",
    tapLabel: "Sparkle sticker",
    message: "Shine level: visible from the snack cupboard.",
    accent: "butter",
    tilt: "right",
  },
] as const satisfies readonly StickerDiscoveryItem[];

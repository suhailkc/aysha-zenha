import type {
  PersonalityOutcome,
  PersonalityQuizQuestion,
} from "@/types/play";

export const personalityOutcomes: PersonalityOutcome[] = [
  {
    id: "sparkle-storm",
    title: "Sparkle Storm",
    emoji: "✨",
    tagline: "You bring the shimmer wherever you go.",
    description:
      "Your universe runs on glitter-level enthusiasm. When something feels dull, you add confetti energy until the whole room notices.",
    accent: "lavender",
  },
  {
    id: "giggle-galaxy",
    title: "Giggle Galaxy",
    emoji: "😄",
    tagline: "Your laugh could power a small moon.",
    description:
      "You collect jokes like other people collect cool rocks. Silly moments orbit around you, and that is a superpower.",
    accent: "bubblegum",
  },
  {
    id: "rainbow-explorer",
    title: "Rainbow Explorer",
    emoji: "🌈",
    tagline: "More colors, more adventures.",
    description:
      "You notice paths other people walk right past. Every day is a chance to mix something new and make it unforgettable.",
    accent: "mint",
  },
  {
    id: "captain-curious",
    title: "Captain Curious",
    emoji: "🔍",
    tagline: "Questions are your compass.",
    description:
      "You do not need all the answers on day one. You love a good mystery, a clever clue, and one more “but why?”",
    accent: "butter",
  },
];

export const personalityQuizQuestions: PersonalityQuizQuestion[] = [
  {
    id: "q-backpack",
    prompt: "If your backpack could hold ONE magic thing, you would pick…",
    options: [
      {
        id: "glitter",
        label: "Glitter that never runs out",
        outcomeId: "sparkle-storm",
      },
      {
        id: "joke-book",
        label: "A joke book that writes itself",
        outcomeId: "giggle-galaxy",
      },
      {
        id: "rainbow-map",
        label: "A map to secret rainbow paths",
        outcomeId: "rainbow-explorer",
      },
      {
        id: "magnifier",
        label: "A magnifying glass for tiny mysteries",
        outcomeId: "captain-curious",
      },
    ],
  },
  {
    id: "q-weather",
    prompt: "Best weather for an adventure?",
    options: [
      {
        id: "stars",
        label: "Starry night with shooting stars",
        outcomeId: "sparkle-storm",
      },
      {
        id: "silly-clouds",
        label: "Clouds shaped like silly faces",
        outcomeId: "giggle-galaxy",
      },
      {
        id: "double-rainbow",
        label: "Double rainbow right after rain",
        outcomeId: "rainbow-explorer",
      },
      {
        id: "windy",
        label: "Windy day made for kite detective work",
        outcomeId: "captain-curious",
      },
    ],
  },
  {
    id: "q-treehouse",
    prompt: "Your dream treehouse would definitely have…",
    options: [
      {
        id: "disco",
        label: "A disco ball and fairy lights",
        outcomeId: "sparkle-storm",
      },
      {
        id: "comedy-stage",
        label: "A comedy stage and one rubber chicken",
        outcomeId: "giggle-galaxy",
      },
      {
        id: "color-slides",
        label: "Slides in every color",
        outcomeId: "rainbow-explorer",
      },
      {
        id: "telescope",
        label: "A telescope and a locked mystery box",
        outcomeId: "captain-curious",
      },
    ],
  },
  {
    id: "q-snack",
    prompt: "Pick a snack from the imagination café:",
    options: [
      {
        id: "star-cookies",
        label: "Star cookies that crunch like applause",
        outcomeId: "sparkle-storm",
      },
      {
        id: "tickle-jelly",
        label: "Giggling grape jelly (it tickles!)",
        outcomeId: "giggle-galaxy",
      },
      {
        id: "layer-cake",
        label: "Layer cake with every flavor at once",
        outcomeId: "rainbow-explorer",
      },
      {
        id: "mystery-muffin",
        label: "Mystery muffin — surprise every bite",
        outcomeId: "captain-curious",
      },
    ],
  },
  {
    id: "q-cloud-door",
    prompt: "You found a tiny door floating in a cloud. You would…",
    options: [
      {
        id: "confetti-knock",
        label: "Knock three times and toss confetti",
        outcomeId: "sparkle-storm",
      },
      {
        id: "pun-first",
        label: "Tell the door your best pun first",
        outcomeId: "giggle-galaxy",
      },
      {
        id: "paint-frame",
        label: "Paint the frame in rainbow stripes",
        outcomeId: "rainbow-explorer",
      },
      {
        id: "password",
        label: "Ask politely, “What is the password?”",
        outcomeId: "captain-curious",
      },
    ],
  },
];

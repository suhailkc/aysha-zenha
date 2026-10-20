import type { GigglePrompt } from "@/types/play";

export const gigglePrompts: GigglePrompt[] = [
  {
    id: "emoji-mood",
    kind: "emoji",
    prompt: "Pick the emoji that matches your energy right now:",
    choices: [
      {
        id: "rocket",
        emoji: "🚀",
        label: "Rocket ready",
        response: "Mission: be awesome at maximum speed. Helmet optional.",
      },
      {
        id: "pizza",
        emoji: "🍕",
        label: "Pizza peaceful",
        response: "You are in cozy slice mode. Chew thoughtfully, dream loudly.",
      },
      {
        id: "unicorn",
        emoji: "🦄",
        label: "Unicorn mysterious",
        response: "Legend says you sparkle when nobody is looking. Prove it.",
      },
      {
        id: "frog",
        emoji: "🐸",
        label: "Frog fabulous",
        response: "Tiny jumps, big attitude. Ribbit like you mean business.",
      },
    ],
  },
  {
    id: "emoji-superpower",
    kind: "emoji",
    prompt: "Which emoji would you borrow as a superpower for one hour?",
    choices: [
      {
        id: "lightning",
        emoji: "⚡",
        label: "Lightning",
        response: "You zoom through chores like a cartoon. Zzzzt — done!",
      },
      {
        id: "rainbow",
        emoji: "🌈",
        label: "Rainbow",
        response: "Everything you touch gets a color upgrade. Even socks.",
      },
      {
        id: "ghost",
        emoji: "👻",
        label: "Friendly ghost",
        response: "You float through the room saying “boo” in a nice way.",
      },
      {
        id: "robot",
        emoji: "🤖",
        label: "Robot",
        response: "Beep boop. You speak in robot voice until someone laughs.",
      },
    ],
  },
  {
    id: "action-wiggle",
    kind: "action",
    prompt: "Do a tiny wiggle dance for five seconds. No music required.",
    actionLabel: "I wiggled!",
    response: "Certified wiggle champion. The universe is 12% sillier now.",
  },
  {
    id: "action-whisper",
    kind: "action",
    prompt: "Whisper “banana” like it is a top-secret password.",
    actionLabel: "Secret delivered",
    response: "Access granted to the Invisible Banana Club. Welcome.",
  },
  {
    id: "action-statue",
    kind: "action",
    prompt: "Freeze like a statue… then blink dramatically once.",
    actionLabel: "Statue complete",
    response: "Museum quality! Tour guides are already writing plaques.",
  },
  {
    id: "emoji-cloud",
    kind: "emoji",
    prompt: "You get to ride one cloud. Pick your ride:",
    choices: [
      {
        id: "cotton",
        emoji: "☁️",
        label: "Fluffy classic",
        response: "Soft landing guaranteed. Bring a tiny umbrella anyway.",
      },
      {
        id: "sparkle",
        emoji: "✨",
        label: "Sparkle cloud",
        response: "You leave a glitter trail. Birds request autographs.",
      },
      {
        id: "moon",
        emoji: "🌙",
        label: "Moon cruiser",
        response: "Night mode activated. Cool breeze, excellent vibes.",
      },
      {
        id: "sun",
        emoji: "☀️",
        label: "Sunny puff",
        response: "Warm and cheerful. Sunglasses appear magically.",
      },
    ],
  },
  {
    id: "action-nose",
    kind: "action",
    prompt: "Touch your nose with one finger and say “beep” out loud.",
    actionLabel: "Beep achieved",
    response: "Human button pressed successfully. Please stand by for giggles.",
  },
];

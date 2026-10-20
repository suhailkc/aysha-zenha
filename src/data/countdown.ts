/** Family-authored copy for the birthday countdown page. */
export const countdownContent = {
  pageTitle: "Birthday countdown",
  pageSubtitle:
    "Mark your calendar for Aysha Day — November 1 — and come back when the stars align.",
  loadingLabel: "Checking the sparkle calendar…",
  countdown: {
    headline: (days: number) =>
      days === 1
        ? "Only 1 sleep until Aysha Day!"
        : `Only ${days} sleeps until Aysha Day!`,
    subline: "November 1 is getting closer. Save a little extra joy for that day.",
    dayLabel: "sleeps to go",
    dayLabelSingular: "sleep to go",
  },
  birthday: {
    headline: "It's Aysha Day!",
    subline:
      "Today is November 1 — the universe is extra sparkly. Happy birthday, Aysha!",
    sticker: "Today!",
  },
  celebrateButton: "Celebrate!",
  celebrateReducedMotion:
    "Confetti is resting (reduced motion is on), but the happy feelings are still here!",
  celebrateManualNote: "You pressed the party button — nice!",
  devPreviewTitle: "Preview modes (development only)",
  devPreviewHint:
    "These links fake the countdown for testing. They do nothing in production builds.",
} as const;

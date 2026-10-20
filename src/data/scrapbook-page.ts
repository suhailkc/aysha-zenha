export const scrapbookPageContent = {
  title: "Digital Scrapbook",
  subtitle:
    "Curated spreads with photos and captions — softer and story-like than the memory gallery grid.",
  emptyTitle: "No scrapbook spreads yet",
  emptyBody:
    "Add memories in the local scrapbook data file. Each spread can include a photo, caption, and short note.",
  emptyHint: "Edit src/data/scrapbook.json",
  editHint:
    "Photos live in public/images/scrapbook/. Register each memory in src/data/scrapbook.json (see docs/content-editing.md).",
  photoPendingLabel: "Photo coming soon",
  photoPendingHint: "Add the image file named in scrapbook.json, then rebuild or refresh.",
  photoLoadError: "This photo could not be loaded.",
} as const;

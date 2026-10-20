export const galleryPageContent = {
  title: "Memory Gallery",
  subtitle:
    "Little snapshots from Aysha's world, tucked into a scrapbook just for her. Tap a photo to see it up close.",
  filterLabel: "Browse by mood",
  emptyTitle: "No photos yet",
  emptyBody:
    "When you are ready, drop originals into private-photo-input/, run npm run photos:prepare, and this page will fill with memories.",
  emptyHint: "See docs/photo-workflow.md for step-by-step help.",
} as const;

export const galleryTagLabels = {
  all: "All",
  everyday: "Everyday",
  celebrations: "Celebrations",
  adventures: "Adventures",
  "goofy-moments": "Goofy Moments",
} as const;

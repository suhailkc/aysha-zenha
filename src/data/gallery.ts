import type { GalleryPhoto } from "@/types/content";

/**
 * Register photos under `public/images/gallery/` when the family adds them.
 * Preview uses the first entries on the homepage.
 */
export const galleryPhotos: GalleryPhoto[] = [
  {
    id: "preview-01",
    src: "/images/gallery/01-moment.webp",
    alt: "A cheerful scrapbook moment waiting for a real photo",
    caption: "Add your first memory",
  },
  {
    id: "preview-02",
    src: "/images/gallery/02-moment.webp",
    alt: "Another scrapbook frame ready for a family photo",
    caption: "More magic here",
  },
  {
    id: "preview-03",
    src: "/images/gallery/03-moment.webp",
    alt: "Pastel scrapbook placeholder for a future snapshot",
    caption: "Smiles loading…",
  },
  {
    id: "preview-04",
    src: "/images/gallery/04-moment.webp",
    alt: "Decorative gallery slot for a treasured picture",
    caption: "Your story goes here",
  },
];

export const galleryPreviewCount = 4;

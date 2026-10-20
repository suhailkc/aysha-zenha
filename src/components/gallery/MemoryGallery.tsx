"use client";

import { GalleryEmptyState } from "@/components/gallery/GalleryEmptyState";
import {
  GalleryMasonryCard,
  PhotoLightbox,
} from "@/components/gallery/PhotoLightbox";
import { galleryPageContent, galleryTagLabels } from "@/data/gallery-page";
import { cn } from "@/lib/cn";
import type { GalleryPhoto, GalleryTagId } from "@/types/content";
import { useMemo, useState, type ReactNode } from "react";

type FilterId = "all" | GalleryTagId;

const filterOptions: FilterId[] = [
  "all",
  "everyday",
  "celebrations",
  "adventures",
  "goofy-moments",
  "karate",
];

type MemoryGalleryProps = {
  photos: GalleryPhoto[];
};

export function MemoryGallery({ photos }: MemoryGalleryProps) {
  const [filter, setFilter] = useState<FilterId>("all");
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const filteredPhotos = useMemo(() => {
    if (filter === "all") {
      return photos;
    }
    return photos.filter((photo) => photo.tags.includes(filter));
  }, [filter, photos]);

  if (photos.length === 0) {
    return <GalleryEmptyState />;
  }

  return (
    <>
      <div className="mt-8 space-y-6">
        <div>
          <p
            id="gallery-filter-label"
            className="font-display text-sm font-semibold uppercase tracking-wide text-plum/70"
          >
            {galleryPageContent.filterLabel}
          </p>
          <div
            role="group"
            aria-labelledby="gallery-filter-label"
            className="mt-3 flex flex-wrap gap-2"
          >
            {filterOptions.map((option) => {
              const isActive = filter === option;
              const label =
                option === "all" ? galleryTagLabels.all : galleryTagLabels[option];
              return (
                <button
                  key={option}
                  type="button"
                  aria-pressed={isActive}
                  onClick={() => {
                    setFilter(option);
                    setLightboxIndex(null);
                  }}
                  className={cn(
                    "min-h-11 rounded-scrapbook-pill border px-4 py-2 font-display text-sm font-semibold transition-colors",
                    isActive
                      ? option === "karate"
                        ? "border-deep-orange/25 bg-karate-orange/35 text-plum shadow-[var(--shadow-paper)]"
                        : "border-plum/20 bg-lavender text-plum shadow-[var(--shadow-paper)]"
                      : "border-plum/15 bg-white/70 text-plum/85 hover:bg-lavender/40",
                  )}
                >
                  {label}
                </button>
              );
            })}
          </div>
        </div>

        {filteredPhotos.length === 0 ? (
          <PaperCardMuted>{galleryPageContent.filterEmptyMessage}</PaperCardMuted>
        ) : (
          <div className="gallery-masonry">
            {filteredPhotos.map((photo, index) => (
              <GalleryMasonryCard
                key={photo.id}
                photo={photo}
                index={index}
                onOpen={setLightboxIndex}
              />
            ))}
          </div>
        )}
      </div>

      {lightboxIndex !== null && filteredPhotos.length > 0 ? (
        <PhotoLightbox
          photos={filteredPhotos}
          activeIndex={lightboxIndex}
          onClose={() => setLightboxIndex(null)}
          onNavigate={setLightboxIndex}
        />
      ) : null}
    </>
  );
}

function PaperCardMuted({ children }: { children: ReactNode }) {
  return (
    <div className="paper-card rounded-scrapbook-xl px-5 py-6 text-center text-secondary">
      {children}
    </div>
  );
}

"use client";

import { KaratePhotoSticker } from "@/components/karate/KaratePhotoSticker";
import { PhotoWithFallback } from "@/components/ui/PhotoWithFallback";
import { galleryPageContent } from "@/data/gallery-page";
import { cn } from "@/lib/cn";
import { useModalLayer } from "@/lib/modal-layer";
import type { GalleryPhoto } from "@/types/content";
import { useCallback, useEffect, useId, useRef } from "react";

type PhotoLightboxProps = {
  photos: GalleryPhoto[];
  activeIndex: number;
  onClose: () => void;
  onNavigate: (index: number) => void;
};

export function PhotoLightbox({
  photos,
  activeIndex,
  onClose,
  onNavigate,
}: PhotoLightboxProps) {
  const titleId = useId();
  const closeRef = useRef<HTMLButtonElement>(null);
  const photo = photos[activeIndex];

  const goPrev = useCallback(() => {
    if (photos.length <= 1) return;
    const next = (activeIndex - 1 + photos.length) % photos.length;
    onNavigate(next);
  }, [activeIndex, onNavigate, photos.length]);

  const goNext = useCallback(() => {
    if (photos.length <= 1) return;
    const next = (activeIndex + 1) % photos.length;
    onNavigate(next);
  }, [activeIndex, onNavigate, photos.length]);

  useModalLayer(true, onClose);

  useEffect(() => {
    closeRef.current?.focus();

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "ArrowLeft") {
        event.preventDefault();
        goPrev();
      } else if (event.key === "ArrowRight") {
        event.preventDefault();
        goNext();
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [goNext, goPrev]);

  if (!photo) {
    return null;
  }

  const showNav = photos.length > 1;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6"
      role="presentation"
    >
      <button
        type="button"
        aria-label="Close photo viewer"
        className="absolute inset-0 bg-plum/55 backdrop-blur-[2px]"
        onClick={onClose}
      />
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        className="relative z-10 flex w-full max-w-4xl flex-col gap-4"
      >
        <div className="flex items-center justify-between gap-3">
          <p id={titleId} className="sr-only">
            Photo {activeIndex + 1} of {photos.length}
          </p>
          <button
            ref={closeRef}
            type="button"
            onClick={onClose}
            className="btn-secondary ml-auto shrink-0 px-4 py-2 text-sm"
          >
            Close
          </button>
        </div>

        <figure className="paper-card relative overflow-hidden rounded-scrapbook-xl p-3 sm:p-4">
          <div className="relative mx-auto max-h-[min(72vh,720px)] w-full overflow-hidden rounded-scrapbook-lg bg-cream/80">
            <PhotoWithFallback
              unoptimized
              src={photo.src}
              alt={photo.alt}
              width={photo.width}
              height={photo.height}
              fallbackLabel={galleryPageContent.photoLoadError}
              className="mx-auto h-auto max-h-[min(72vh,720px)] w-auto max-w-full object-contain"
              sizes="(max-width: 768px) 92vw, 720px"
            />
          </div>
          {photo.caption ? (
            <figcaption className="mt-4 px-1 text-center font-display text-lg font-semibold text-plum">
              {photo.caption}
            </figcaption>
          ) : null}
        </figure>

        {showNav ? (
          <div className="flex items-center justify-center gap-3">
            <button
              type="button"
              onClick={goPrev}
              aria-label="Previous photo"
              className="btn-secondary min-h-11 px-5 py-2 text-sm"
            >
              Previous
            </button>
            <span className="font-display text-sm font-semibold text-cream">
              {activeIndex + 1} / {photos.length}
            </span>
            <button
              type="button"
              onClick={goNext}
              aria-label="Next photo"
              className="btn-secondary min-h-11 px-5 py-2 text-sm"
            >
              Next
            </button>
          </div>
        ) : null}
      </div>
    </div>
  );
}

export function GalleryMasonryCard({
  photo,
  index,
  onOpen,
  className,
}: {
  photo: GalleryPhoto;
  index: number;
  onOpen: (index: number) => void;
  className?: string;
}) {
  const rotation =
    index % 4 === 0
      ? "-rotate-1"
      : index % 4 === 1
        ? "rotate-1"
        : index % 4 === 2
          ? "rotate-[0.5deg]"
          : "-rotate-[0.5deg]";

  return (
    <article className={cn("gallery-masonry-item break-inside-avoid", className)}>
      <button
        type="button"
        onClick={() => onOpen(index)}
        aria-label={`Open photo: ${photo.alt}`}
        className={cn("photo-card-interactive group w-full text-left", rotation)}
      >
        <div
          className={cn(
            "photo-frame-scrapbook gallery-photo-frame relative overflow-hidden bg-white/60 p-1.5 shadow-[var(--shadow-paper-lifted)]",
            photo.tags.includes("karate") && "gallery-photo-frame--karate",
          )}
        >
          <div className="overflow-hidden rounded-[inherit]">
            <PhotoWithFallback
              unoptimized
              src={photo.src}
              alt={photo.alt}
              width={photo.width}
              height={photo.height}
              loading="lazy"
              fallbackLabel={galleryPageContent.photoLoadError}
              className="h-auto w-full object-cover transition-transform duration-200 group-hover:scale-[1.015]"
              sizes="(max-width: 640px) 45vw, (max-width: 1024px) 30vw, 280px"
            />
          </div>
          {photo.tags.includes("karate") ? <KaratePhotoSticker /> : null}
        </div>
        {photo.caption ? (
          <p className="mt-2 px-1 font-display text-sm font-semibold text-plum/85">
            {photo.caption}
          </p>
        ) : null}
      </button>
    </article>
  );
}

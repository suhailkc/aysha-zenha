"use client";

import { GalleryPreviewPhoto } from "@/components/home/GalleryPreviewPhoto";
import { GalleryPreviewPlaceholder } from "@/components/home/GalleryPreviewPlaceholder";
import { cn } from "@/lib/cn";
import type { GalleryPhoto } from "@/types/content";
import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
  type PointerEvent as ReactPointerEvent,
  type TransitionEvent,
} from "react";

const AUTOPLAY_MS = 4500;
const MD_MIN_WIDTH_PX = 768;
const SWIPE_MIN_PX = 48;
const LOOP_COPIES = 3;

const rotations = ["left", "right", "none", "right"] as const;

type GalleryPreviewCarouselProps = {
  photos: GalleryPhoto[];
  placeholderCount?: number;
};

type PhotoSlide = {
  kind: "photo";
  key: string;
  photo: GalleryPhoto;
  slideIndex: number;
};

type PlaceholderSlide = {
  kind: "placeholder";
  key: string;
  slideIndex: number;
};

type PreviewSlide = PhotoSlide | PlaceholderSlide;

type LoopSlide = PreviewSlide & { loopKey: string };

type DragState = {
  pointerId: number | null;
  startX: number;
  deltaX: number;
};

function useVisibleSlideCount() {
  const [visibleCount, setVisibleCount] = useState(2);

  useEffect(() => {
    const media = window.matchMedia(`(min-width: ${MD_MIN_WIDTH_PX}px)`);
    const sync = () => setVisibleCount(media.matches ? 4 : 2);
    sync();
    media.addEventListener("change", sync);
    return () => media.removeEventListener("change", sync);
  }, []);

  return visibleCount;
}

function usePrefersReducedMotion() {
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => setReduced(media.matches);
    sync();
    media.addEventListener("change", sync);
    return () => media.removeEventListener("change", sync);
  }, []);

  return reduced;
}

function buildPreviewSlides(
  photos: GalleryPhoto[],
  placeholderCount: number,
): PreviewSlide[] {
  const slides: PreviewSlide[] = photos.map((photo, slideIndex) => ({
    kind: "photo",
    key: photo.id,
    photo,
    slideIndex,
  }));

  for (let i = 0; i < placeholderCount; i += 1) {
    slides.push({
      kind: "placeholder",
      key: `placeholder-${i}`,
      slideIndex: slides.length,
    });
  }

  return slides;
}

function buildLoopSlides(slides: PreviewSlide[]): LoopSlide[] {
  const loopSlides: LoopSlide[] = [];
  for (let copy = 0; copy < LOOP_COPIES; copy += 1) {
    slides.forEach((slide) => {
      loopSlides.push({
        ...slide,
        loopKey: `${slide.key}-loop-${copy}`,
      });
    });
  }
  return loopSlides;
}

function rotationForIndex(index: number) {
  return rotations[index % rotations.length] ?? "none";
}

export function GalleryPreviewCarousel({
  photos,
  placeholderCount = 0,
}: GalleryPreviewCarouselProps) {
  const visibleCount = useVisibleSlideCount();
  const prefersReducedMotion = usePrefersReducedMotion();
  const viewportRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLUListElement>(null);
  const dragRef = useRef<DragState>({
    pointerId: null,
    startX: 0,
    deltaX: 0,
  });
  const positionRef = useRef(0);
  const [isJumping, setIsJumping] = useState(false);

  const previewSlides = useMemo(
    () => buildPreviewSlides(photos, placeholderCount),
    [photos, placeholderCount],
  );
  const slideCount = previewSlides.length;
  const loopSlides = useMemo(
    () => buildLoopSlides(previewSlides),
    [previewSlides],
  );
  const loopBlockStart = slideCount;
  const loopBlockEnd = slideCount * 2;

  const [positionIndex, setPositionIndex] = useState(loopBlockStart);
  const [stepPx, setStepPx] = useState(0);
  const [paused, setPaused] = useState(false);
  const [dragDeltaX, setDragDeltaX] = useState(0);
  const [isDragging, setIsDragging] = useState(false);

  const maxStartIndex = Math.max(0, slideCount - visibleCount);
  const pageCount = maxStartIndex + 1;
  const canScroll = slideCount > visibleCount;

  const logicalStartIndex =
    slideCount > 0
      ? (((positionIndex - loopBlockStart) % pageCount) + pageCount) % pageCount
      : 0;

  useEffect(() => {
    positionRef.current = positionIndex;
  }, [positionIndex]);

  useLayoutEffect(() => {
    const viewport = viewportRef.current;
    const track = trackRef.current;
    if (!viewport || !track) return;

    const measure = () => {
      const slide = track.querySelector<HTMLElement>(
        "[data-gallery-preview-slide]",
      );
      if (!slide) return;
      const gap =
        parseFloat(
          getComputedStyle(track).columnGap || getComputedStyle(track).gap,
        ) || 0;
      setStepPx(slide.offsetWidth + gap);
    };

    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(viewport);
    return () => observer.disconnect();
  }, [slideCount, visibleCount]);

  const snapLoopPosition = useCallback(
    (index: number) => {
      if (slideCount === 0) return;
      if (index >= loopBlockEnd) {
        setIsJumping(true);
        setPositionIndex(index - slideCount);
        return;
      }
      if (index < loopBlockStart) {
        setIsJumping(true);
        setPositionIndex(index + slideCount);
      }
    },
    [loopBlockEnd, loopBlockStart, slideCount],
  );

  useLayoutEffect(() => {
    if (!isJumping) return;
    const frame = requestAnimationFrame(() => setIsJumping(false));
    return () => cancelAnimationFrame(frame);
  }, [isJumping, positionIndex]);

  const onTrackTransitionEnd = (event: TransitionEvent<HTMLUListElement>) => {
    if (event.propertyName !== "transform" || isDragging || isJumping) return;
    snapLoopPosition(positionRef.current);
  };

  const moveBy = useCallback(
    (delta: number) => {
      if (!canScroll) return;
      setPositionIndex((index) => {
        let next = index + delta;
        if (prefersReducedMotion) {
          if (next >= loopBlockEnd) next -= slideCount;
          if (next < loopBlockStart) next += slideCount;
        }
        return next;
      });
    },
    [
      canScroll,
      loopBlockEnd,
      loopBlockStart,
      prefersReducedMotion,
      slideCount,
    ],
  );

  const advance = useCallback(() => moveBy(1), [moveBy]);
  const retreat = useCallback(() => moveBy(-1), [moveBy]);

  useEffect(() => {
    if (prefersReducedMotion || paused || !canScroll || isDragging) return;
    const timer = window.setInterval(advance, AUTOPLAY_MS);
    return () => window.clearInterval(timer);
  }, [advance, canScroll, isDragging, paused, prefersReducedMotion]);

  const goToPage = (page: number) => {
    setPositionIndex(
      loopBlockStart + Math.min(Math.max(page, 0), maxStartIndex),
    );
  };

  const endDrag = useCallback(
    (commit: boolean) => {
      const { deltaX } = dragRef.current;
      dragRef.current = { pointerId: null, startX: 0, deltaX: 0 };
      setIsDragging(false);
      setDragDeltaX(0);
      setPaused(false);

      if (!commit || !canScroll) return;

      const threshold = Math.min(SWIPE_MIN_PX, stepPx * 0.18);
      if (deltaX <= -threshold) {
        advance();
      } else if (deltaX >= threshold) {
        retreat();
      }
    },
    [advance, canScroll, retreat, stepPx],
  );

  const onViewportPointerDown = (event: ReactPointerEvent<HTMLDivElement>) => {
    if (!canScroll || event.button !== 0) return;
    dragRef.current = {
      pointerId: event.pointerId,
      startX: event.clientX,
      deltaX: 0,
    };
    setIsDragging(true);
    setPaused(true);
    setDragDeltaX(0);
    event.currentTarget.setPointerCapture(event.pointerId);
  };

  const onViewportPointerMove = (event: ReactPointerEvent<HTMLDivElement>) => {
    if (dragRef.current.pointerId !== event.pointerId) return;
    const deltaX = event.clientX - dragRef.current.startX;
    dragRef.current.deltaX = deltaX;
    setDragDeltaX(deltaX);
  };

  const onViewportPointerUp = (event: ReactPointerEvent<HTMLDivElement>) => {
    if (dragRef.current.pointerId !== event.pointerId) return;
    if (event.currentTarget.hasPointerCapture(event.pointerId)) {
      event.currentTarget.releasePointerCapture(event.pointerId);
    }
    endDrag(true);
  };

  const onViewportPointerCancel = (event: ReactPointerEvent<HTMLDivElement>) => {
    if (dragRef.current.pointerId !== event.pointerId) return;
    endDrag(false);
  };

  const translatePx = stepPx > 0 ? positionIndex * stepPx - dragDeltaX : 0;
  const transitionEnabled = !isDragging && !isJumping;

  if (slideCount === 0) {
    return null;
  }

  return (
    <div
      className="mt-8"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => {
        if (!isDragging) setPaused(false);
      }}
      onFocusCapture={() => setPaused(true)}
      onBlurCapture={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget as Node | null)) {
          setPaused(false);
        }
      }}
    >
      <p className="sr-only">
        Swipe left or right to see more scrapbook photos. The carousel plays
        automatically unless you interact with it.
      </p>
      <div
        ref={viewportRef}
        className={cn(
          "touch-pan-y overflow-x-clip overflow-y-hidden",
          isDragging && "cursor-grabbing select-none",
          canScroll && !isDragging && "cursor-grab",
        )}
        aria-roledescription="carousel"
        aria-label="Gallery memory preview"
        onPointerDown={onViewportPointerDown}
        onPointerMove={onViewportPointerMove}
        onPointerUp={onViewportPointerUp}
        onPointerCancel={onViewportPointerCancel}
      >
        <ul
          ref={trackRef}
          className={cn(
            "flex list-none items-start gap-4 p-0 sm:gap-6",
            transitionEnabled &&
              "motion-safe:transition-transform motion-safe:duration-700 motion-safe:ease-out",
          )}
          style={{
            transform:
              stepPx > 0 ? `translateX(-${translatePx}px)` : undefined,
          }}
          onTransitionEnd={onTrackTransitionEnd}
          aria-live={prefersReducedMotion ? "polite" : "off"}
        >
          {loopSlides.map((slide) => (
            <li
              key={slide.loopKey}
              data-gallery-preview-slide
              className="w-[calc((100%-1rem)/2)] shrink-0 md:w-[calc((100%-4.5rem)/4)]"
            >
              {slide.kind === "photo" ? (
                <GalleryPreviewPhoto
                  photo={slide.photo}
                  rotation={rotationForIndex(slide.slideIndex)}
                />
              ) : (
                <GalleryPreviewPlaceholder
                  rotation={rotationForIndex(slide.slideIndex)}
                />
              )}
            </li>
          ))}
        </ul>
      </div>

      {canScroll ? (
        <div className="mt-2 flex flex-wrap items-center justify-center gap-1 sm:gap-2">
          <p className="sr-only" aria-live="polite">
            Showing memories {logicalStartIndex + 1} to{" "}
            {Math.min(logicalStartIndex + visibleCount, slideCount)} of{" "}
            {slideCount}
          </p>
          <div
            className="flex max-w-full flex-wrap items-center justify-center gap-1 sm:gap-2"
            role="tablist"
            aria-label="Choose gallery preview slide"
          >
            {Array.from({ length: pageCount }, (_, page) => {
              const selected = page === logicalStartIndex;
              return (
                <button
                  key={page}
                  type="button"
                  role="tab"
                  aria-selected={selected}
                  aria-label={`Show memories starting at photo ${page + 1}`}
                  className={cn(
                    "inline-flex min-h-9 min-w-9 items-center justify-center rounded-full sm:min-h-10 sm:min-w-10",
                    "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-lavender",
                  )}
                  onClick={() => goToPage(page)}
                >
                  <span
                    aria-hidden
                    className={cn(
                      "h-2.5 w-2.5 rounded-full border border-lavender/40 transition-colors",
                      selected
                        ? "bg-lavender"
                        : "bg-white/80 hover:bg-lavender/35",
                    )}
                  />
                </button>
              );
            })}
          </div>
        </div>
      ) : null}
    </div>
  );
}

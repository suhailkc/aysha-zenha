"use client";

import { LoveNoteCard } from "@/components/messages/LoveNoteCard";
import { CarouselPagination } from "@/components/ui/CarouselPagination";
import { loveNoteTiltClass } from "@/lib/love-note-styles";
import { cn } from "@/lib/cn";
import type { FamilyMessage } from "@/types/content";
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

const AUTOPLAY_MS = 5500;
const MD_MIN_WIDTH_PX = 768;
const SWIPE_MIN_PX = 48;
const LOOP_COPIES = 3;

type LoveNotesCarouselProps = {
  notes: FamilyMessage[];
};

type LoopSlide = {
  key: string;
  note: FamilyMessage;
  noteIndex: number;
};

type DragState = {
  pointerId: number | null;
  startX: number;
  deltaX: number;
};

function useVisibleSlideCount() {
  const [visibleCount, setVisibleCount] = useState(1);

  useEffect(() => {
    const media = window.matchMedia(`(min-width: ${MD_MIN_WIDTH_PX}px)`);
    const sync = () => setVisibleCount(media.matches ? 3 : 1);
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

function buildLoopSlides(notes: FamilyMessage[]): LoopSlide[] {
  const slides: LoopSlide[] = [];
  for (let copy = 0; copy < LOOP_COPIES; copy += 1) {
    notes.forEach((note, noteIndex) => {
      slides.push({
        key: `${note.id}-loop-${copy}`,
        note,
        noteIndex,
      });
    });
  }
  return slides;
}

export function LoveNotesCarousel({ notes }: LoveNotesCarouselProps) {
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

  const noteCount = notes.length;
  const loopSlides = useMemo(() => buildLoopSlides(notes), [notes]);
  const loopBlockStart = noteCount;
  const loopBlockEnd = noteCount * 2;

  const [positionIndex, setPositionIndex] = useState(loopBlockStart);
  const [stepPx, setStepPx] = useState(0);
  const [paused, setPaused] = useState(false);
  const [dragDeltaX, setDragDeltaX] = useState(0);
  const [isDragging, setIsDragging] = useState(false);

  const maxStartIndex = Math.max(0, noteCount - visibleCount);
  const pageCount = maxStartIndex + 1;
  const canScroll = noteCount > visibleCount;

  const logicalStartIndex =
    noteCount > 0
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
      const slide = track.querySelector<HTMLElement>("[data-love-note-slide]");
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
  }, [noteCount, visibleCount]);

  const snapLoopPosition = useCallback(
    (index: number) => {
      if (index >= loopBlockEnd) {
        setIsJumping(true);
        setPositionIndex(index - noteCount);
        return;
      }
      if (index < loopBlockStart) {
        setIsJumping(true);
        setPositionIndex(index + noteCount);
      }
    },
    [loopBlockEnd, loopBlockStart, noteCount],
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
          if (next >= loopBlockEnd) next -= noteCount;
          if (next < loopBlockStart) next += noteCount;
        }
        return next;
      });
    },
    [
      canScroll,
      loopBlockEnd,
      loopBlockStart,
      noteCount,
      prefersReducedMotion,
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
    setPositionIndex(loopBlockStart + Math.min(Math.max(page, 0), maxStartIndex));
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

  const translatePx =
    stepPx > 0 ? positionIndex * stepPx - dragDeltaX : 0;

  const transitionEnabled = !isDragging && !isJumping;

  if (notes.length === 0) {
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
        Swipe left or right on the notes to see more messages.
      </p>
      <div
        ref={viewportRef}
        className={cn(
          "touch-pan-y overflow-x-clip overflow-y-visible py-3",
          isDragging && "cursor-grabbing select-none",
          canScroll && !isDragging && "cursor-grab",
        )}
        aria-roledescription="carousel"
        aria-label="Family love notes"
        onPointerDown={onViewportPointerDown}
        onPointerMove={onViewportPointerMove}
        onPointerUp={onViewportPointerUp}
        onPointerCancel={onViewportPointerCancel}
      >
        <ul
          ref={trackRef}
          className={cn(
            "flex list-none gap-4 p-0",
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
              key={slide.key}
              data-love-note-slide
              className="w-full shrink-0 md:w-[calc((100%-2rem)/3)]"
            >
              <div
                className={cn(
                  "motion-safe:transition-transform",
                  loveNoteTiltClass(slide.noteIndex),
                )}
              >
                <LoveNoteCard
                  note={slide.note}
                  compact
                  className="bg-white/80 !shadow-none"
                />
              </div>
            </li>
          ))}
        </ul>
      </div>

      {canScroll ? (
        <div className="mt-4 sm:mt-6">
          <p className="sr-only" aria-live="polite">
            Showing notes {logicalStartIndex + 1} to{" "}
            {Math.min(logicalStartIndex + visibleCount, noteCount)} of{" "}
            {noteCount}
          </p>
          <CarouselPagination
            pageCount={pageCount}
            activePage={logicalStartIndex}
            onSelectPage={goToPage}
            ariaLabel="Choose love note slide"
            compactLabel="love note"
            getPageAriaLabel={(page) =>
              `Show love notes starting at note ${page + 1}`
            }
          />
        </div>
      ) : null}
    </div>
  );
}

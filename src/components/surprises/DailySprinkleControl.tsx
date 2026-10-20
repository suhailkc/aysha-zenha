"use client";

import { DecorativeDoodle } from "@/components/ui/DecorativeDoodle";
import { Sticker } from "@/components/ui/Sticker";
import { dailySprinkles, surprisesContent } from "@/data/surprises";
import { getLocalDayOfYearIndex } from "@/lib/pick-random";
import { cn } from "@/lib/cn";
import { useCallback, useId, useState } from "react";

export function DailySprinkleControl() {
  const copy = surprisesContent.sections.dailySprinkle;
  const revealId = useId();
  const [isOpen, setIsOpen] = useState(false);
  const [sprinkle, setSprinkle] = useState<(typeof dailySprinkles)[number] | null>(
    null,
  );

  const revealSprinkle = useCallback(() => {
    const index = getLocalDayOfYearIndex(dailySprinkles.length);
    setSprinkle(dailySprinkles[index] ?? dailySprinkles[0] ?? null);
    setIsOpen(true);
  }, []);

  const hideSprinkle = useCallback(() => {
    setIsOpen(false);
  }, []);

  const kindLabel = sprinkle
    ? copy.kindLabels[sprinkle.kind]
    : null;

  return (
    <div className="flex flex-col items-center gap-4">
      <button
        type="button"
        className={cn(
          "daily-sprinkle-trigger group relative flex min-h-[5.5rem] min-w-[5.5rem] items-center justify-center",
          "rounded-full border-2 border-dashed border-plum/20 bg-gradient-to-br from-lavender/40 via-white/80 to-butter/50",
          "shadow-paper transition-[transform,box-shadow] duration-200 ease-out",
          "hover:-translate-y-0.5 hover:shadow-paper-lifted",
          "motion-reduce:hover:translate-y-0",
        )}
        onClick={revealSprinkle}
        aria-expanded={isOpen}
        aria-controls={revealId}
        aria-label={copy.buttonLabel}
      >
        <DecorativeDoodle
          variant="sparkle"
          size={36}
          className="text-plum/80 transition-transform duration-200 group-hover:scale-110 motion-reduce:group-hover:scale-100"
        />
        <span className="sr-only">{copy.buttonLabel}</span>
      </button>

      {!isOpen ? (
        <p className="max-w-xs text-center text-sm text-secondary">
          {copy.waitingHint}
        </p>
      ) : null}

      {isOpen && sprinkle ? (
        <div
          id={revealId}
          role="region"
          aria-live="polite"
          className="daily-sprinkle-reveal w-full max-w-md rounded-scrapbook-lg border border-plum/10 bg-white/75 p-5 shadow-paper"
        >
          <div className="flex flex-wrap items-center gap-2">
            <Sticker accent="lavender" tilt="right">
              {kindLabel}
            </Sticker>
          </div>
          <p className="mt-3 font-display text-lg font-semibold text-plum">
            {sprinkle.text}
          </p>
          {sprinkle.kind === "playful-fact" ? (
            <p className="mt-2 text-sm text-secondary">
              {copy.playfulFactDisclaimer}
            </p>
          ) : null}
          <div className="mt-4 flex justify-end">
            <button
              type="button"
              className="btn-secondary"
              onClick={hideSprinkle}
            >
              {copy.resetLabel}
            </button>
          </div>
        </div>
      ) : null}
    </div>
  );
}

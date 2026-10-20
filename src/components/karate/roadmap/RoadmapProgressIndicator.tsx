import { getOrderedKarateBeltStages } from "@/data/karate-roadmap";
import { cn } from "@/lib/cn";
import type { CSSProperties } from "react";

type RoadmapProgressIndicatorProps = {
  progress: {
    currentLabel: string;
    dreamLabel: string;
  };
  className?: string;
};

/** Decorative belt-color stepping stones — not a percentage bar. */
export function RoadmapProgressIndicator({
  progress,
  className,
}: RoadmapProgressIndicatorProps) {
  const belts = getOrderedKarateBeltStages();

  return (
    <div
      className={cn(
        "mx-auto flex max-w-2xl flex-col items-center gap-3 text-center",
        className,
      )}
      aria-label="Karate belt journey overview"
    >
      <div className="flex flex-wrap items-center justify-center gap-1 sm:gap-1.5" aria-hidden>
        {belts.map((belt, i) => (
          <span key={belt.id} className="flex items-center gap-1 sm:gap-1.5">
            <span
              className={cn(
                "roadmap-step-stone inline-block rounded-full border-2 shadow-[var(--shadow-sticker)]",
                belt.status === "current-achievement" &&
                  "infographic-step-current ring-2 ring-karate-orange/50 ring-offset-1 ring-offset-cream",
                belt.status === "long-term-goal" && "infographic-dream-star",
                belt.id === "white-belt" ? "border-plum/25" : "border-plum/15",
                belt.id === "black-belt" ? "h-3.5 w-3.5 sm:h-4 sm:w-4" : "h-2.5 w-2.5 sm:h-3 sm:w-3",
              )}
              style={{ background: belt.beltColor }}
              title={belt.beltName}
            />
            {i < belts.length - 1 ? (
              <span
                className="infographic-dash h-0.5 w-2 rounded-full border-t-2 border-dotted border-plum/25 sm:w-3"
                style={{ "--infographic-delay": `${i * 0.18}s` } as CSSProperties}
              />
            ) : null}
          </span>
        ))}
        <span className="infographic-dream-star ml-0.5 text-butter" aria-hidden>
          ★
        </span>
      </div>
      <div className="flex flex-col gap-1 sm:flex-row sm:flex-wrap sm:justify-center sm:gap-x-4">
        <p className="font-display text-sm font-semibold text-deep-orange sm:text-base">
          {progress.currentLabel}
        </p>
        <p className="font-display text-sm font-semibold text-plum/80 sm:text-base">
          {progress.dreamLabel}
        </p>
      </div>
    </div>
  );
}

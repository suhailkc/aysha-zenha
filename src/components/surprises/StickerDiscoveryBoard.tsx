"use client";

import { DecorativeDoodle } from "@/components/ui/DecorativeDoodle";
import { SurpriseButton } from "@/components/surprises/SurpriseButton";
import { stickerDiscoveries } from "@/data/surprises";
import { cn } from "@/lib/cn";
import { useCallback, useId, useState } from "react";

const layoutClasses = [
  "left-[4%] top-[8%] rotate-[-6deg]",
  "right-[6%] top-[12%] rotate-[5deg]",
  "left-[12%] bottom-[18%] rotate-[3deg]",
  "right-[10%] bottom-[22%] rotate-[-4deg]",
  "left-[38%] top-[42%] rotate-[2deg]",
  "right-[32%] bottom-[8%] rotate-[-2deg]",
] as const;

export function StickerDiscoveryBoard() {
  const boardId = useId();
  const [activeId, setActiveId] = useState<string | null>(null);

  const toggleSticker = useCallback((id: string) => {
    setActiveId((current) => (current === id ? null : id));
  }, []);

  return (
    <div className="relative mx-auto min-h-[16rem] w-full max-w-lg sm:min-h-[18rem]">
      {stickerDiscoveries.map((sticker, index) => {
        const isActive = activeId === sticker.id;
        const revealId = `${boardId}-${sticker.id}`;
        const position =
          layoutClasses[index % layoutClasses.length] ?? layoutClasses[0];

        return (
          <div
            key={sticker.id}
            className={cn("absolute z-[1]", position)}
          >
            <SurpriseButton
              variant="sticker"
              className={cn(
                "h-16 w-16 p-2",
                sticker.accent === "lavender" && "bg-lavender/50",
                sticker.accent === "bubblegum" && "bg-bubblegum/50",
                sticker.accent === "mint" && "bg-mint/50",
                sticker.accent === "butter" && "bg-butter/60",
                sticker.tilt === "left" && "-rotate-3",
                sticker.tilt === "right" && "rotate-3",
                isActive && "ring-2 ring-plum/25 ring-offset-2 ring-offset-cream",
              )}
              aria-expanded={isActive}
              aria-controls={revealId}
              aria-label={`${sticker.tapLabel}. Tap to ${isActive ? "hide" : "reveal"} message.`}
              onClick={() => toggleSticker(sticker.id)}
            >
              <DecorativeDoodle
                variant={sticker.doodle}
                size={32}
                className="text-plum"
              />
            </SurpriseButton>

            {isActive ? (
              <div
                id={revealId}
                role="region"
                aria-live="polite"
                className="absolute left-1/2 top-full z-[2] mt-2 w-52 -translate-x-1/2 rounded-scrapbook-md border border-plum/10 bg-white/95 p-3 text-center shadow-paper-lifted"
              >
                <p className="font-display text-sm font-semibold leading-snug text-plum">
                  {sticker.message}
                </p>
                <button
                  type="button"
                  className="mt-2 text-xs font-semibold text-secondary underline-offset-2 hover:underline"
                  onClick={() => setActiveId(null)}
                >
                  Hide
                </button>
              </div>
            ) : null}
          </div>
        );
      })}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-4 rounded-scrapbook-xl border-2 border-dashed border-plum/10 bg-white/30"
      />
    </div>
  );
}

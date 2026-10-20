"use client";

import { IconStarBadge } from "@/components/karate/KarateIcons";
import { cn } from "@/lib/cn";
import { useEffect, useRef, useState } from "react";

type OrangeBeltChampionBadgeProps = {
  title: string;
  className?: string;
};

/** Medal-style badge with a gentle entrance when scrolled into view. */
export function OrangeBeltChampionBadge({
  title,
  className,
}: OrangeBeltChampionBadgeProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.35, rootMargin: "0px 0px -8% 0px" },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={cn(
        "relative inline-flex flex-col items-center",
        visible && "achievement-pop",
        className,
      )}
    >
      <div className="relative flex flex-col items-center">
        {/* Ribbon tails */}
        <div
          aria-hidden
          className="absolute -top-1 left-1/2 flex -translate-x-1/2 gap-8"
        >
          <span className="h-10 w-3 origin-top -rotate-12 rounded-sm bg-karate-orange shadow-[var(--shadow-sticker)]" />
          <span className="h-10 w-3 origin-top rotate-12 rounded-sm bg-deep-orange shadow-[var(--shadow-sticker)]" />
        </div>
        <div
          className={cn(
            "relative z-[1] flex min-w-[10.5rem] flex-col items-center gap-1 rounded-scrapbook-xl",
            "border-2 border-plum/10 bg-gradient-to-b from-lavender/80 via-white/90 to-butter/50",
            "px-5 py-4 shadow-[var(--shadow-paper-lifted)]",
          )}
        >
          <IconStarBadge className="text-karate-orange" size={22} />
          <p className="text-center font-display text-base font-bold leading-tight text-plum sm:text-lg">
            {title}
          </p>
          <p className="text-center font-display text-xs font-semibold uppercase tracking-wider text-deep-orange">
            Orange Belt
          </p>
        </div>
        {/* Medal circle */}
        <div
          aria-hidden
          className="absolute -bottom-2 left-1/2 z-0 h-5 w-5 -translate-x-1/2 rounded-full border-2 border-plum/15 bg-karate-orange shadow-[var(--shadow-sticker)]"
        />
      </div>
    </div>
  );
}

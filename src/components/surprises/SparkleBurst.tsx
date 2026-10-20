"use client";

import { cn } from "@/lib/cn";
import { useEffect, type CSSProperties } from "react";

type SparkleBurstProps = {
  active: boolean;
  onComplete?: () => void;
  className?: string;
};

const SPARKLE_COUNT = 8;

/** Brief decorative star burst; parent unmounts after animation via onComplete. */
export function SparkleBurst({ active, onComplete, className }: SparkleBurstProps) {
  useEffect(() => {
    if (!active) return;
    const timer = window.setTimeout(() => {
      onComplete?.();
    }, 720);
    return () => window.clearTimeout(timer);
  }, [active, onComplete]);

  if (!active) {
    return null;
  }

  return (
    <div
      aria-hidden
      className={cn(
        "pointer-events-none fixed inset-0 z-[60] flex items-center justify-center",
        className,
      )}
    >
      <div className="sparkle-burst relative h-0 w-0">
        {Array.from({ length: SPARKLE_COUNT }, (_, i) => (
          <span
            key={i}
            className="sparkle-burst__particle"
            style={
              {
                "--sparkle-i": i,
                "--sparkle-angle": `${i * (360 / SPARKLE_COUNT)}deg`,
              } as CSSProperties
            }
          />
        ))}
      </div>
    </div>
  );
}

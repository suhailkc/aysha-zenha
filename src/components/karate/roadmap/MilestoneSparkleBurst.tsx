"use client";

import { cn } from "@/lib/cn";
import { useEffect, type CSSProperties } from "react";

type MilestoneSparkleBurstProps = {
  active: boolean;
  onComplete?: () => void;
  className?: string;
};

const COUNT = 8;

/** Local star burst for milestone activation (not full-screen). */
export function MilestoneSparkleBurst({
  active,
  onComplete,
  className,
}: MilestoneSparkleBurstProps) {
  useEffect(() => {
    if (!active) return;
    const timer = window.setTimeout(() => onComplete?.(), 720);
    return () => window.clearTimeout(timer);
  }, [active, onComplete]);

  if (!active) return null;

  return (
    <div aria-hidden className={cn("pointer-events-none absolute inset-0 z-20", className)}>
      <div className="absolute left-1/2 top-1/2 h-0 w-0 -translate-x-1/2 -translate-y-1/2">
        {Array.from({ length: COUNT }, (_, i) => (
          <span
            key={i}
            className="sparkle-burst__particle"
            style={
              {
                "--sparkle-i": i,
                "--sparkle-angle": `${i * (360 / COUNT)}deg`,
              } as CSSProperties
            }
          />
        ))}
      </div>
    </div>
  );
}

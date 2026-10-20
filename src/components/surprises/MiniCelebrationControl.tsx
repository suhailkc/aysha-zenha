"use client";

import { SurpriseButton } from "@/components/surprises/SurpriseButton";
import { surprisesContent } from "@/data/surprises";
import {
  prefersReducedMotion,
  runConfettiBurst,
} from "@/lib/confetti-burst";
import { useCallback, useEffect, useRef, useState } from "react";

export function MiniCelebrationControl() {
  const copy = surprisesContent.sections.celebration;
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const stopBurstRef = useRef<(() => void) | null>(null);
  const [note, setNote] = useState<string | null>(null);

  useEffect(() => {
    return () => {
      stopBurstRef.current?.();
    };
  }, []);

  const launch = useCallback(() => {
    stopBurstRef.current?.();
    setNote(null);

    if (prefersReducedMotion()) {
      setNote(copy.reducedMotionNote);
      return;
    }

    const canvas = canvasRef.current;
    if (!canvas) {
      return;
    }

    stopBurstRef.current = runConfettiBurst(canvas);
    window.setTimeout(() => {
      setNote("Celebration deployed!");
    }, 400);
  }, [copy.reducedMotionNote]);

  const dismissNote = useCallback(() => {
    setNote(null);
  }, []);

  return (
    <>
      <canvas
        ref={canvasRef}
        className="confetti-canvas pointer-events-none fixed inset-0 z-[60]"
        aria-hidden
      />
      <div className="flex flex-col items-center gap-3">
        <SurpriseButton variant="primary" onClick={launch}>
          {copy.buttonLabel}
        </SurpriseButton>
        {note ? (
          <div
            role="status"
            aria-live="polite"
            className="max-w-sm rounded-scrapbook-md border border-plum/10 bg-white/85 px-4 py-3 text-center shadow-paper"
          >
            <p className="text-sm text-plum">{note}</p>
            <button
              type="button"
              className="mt-2 text-xs font-semibold text-secondary underline-offset-2 hover:underline"
              onClick={dismissNote}
            >
              {copy.doneLabel}
            </button>
          </div>
        ) : null}
      </div>
    </>
  );
}

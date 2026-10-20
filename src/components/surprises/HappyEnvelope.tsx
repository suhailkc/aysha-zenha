"use client";

import { SurpriseButton } from "@/components/surprises/SurpriseButton";
import { SurpriseReveal } from "@/components/surprises/SurpriseReveal";
import { envelopeMessages, surprisesContent } from "@/data/surprises";
import { pickRandomItem } from "@/lib/pick-random";
import { cn } from "@/lib/cn";
import { useCallback, useId, useRef, useState } from "react";

export function HappyEnvelope() {
  const copy = surprisesContent.sections.envelope;
  const revealId = useId();
  const lastIndexRef = useRef<number | null>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  const openEnvelope = useCallback(() => {
    const { item, index } = pickRandomItem(
      envelopeMessages,
      lastIndexRef.current,
    );
    lastIndexRef.current = index;
    setMessage(item);
    setIsOpen(true);
  }, []);

  const resetEnvelope = useCallback(() => {
    setIsOpen(false);
    setMessage(null);
  }, []);

  return (
    <div className="flex flex-col items-center gap-5">
      <div
        className={cn(
          "happy-envelope",
          isOpen && "happy-envelope--open",
        )}
        aria-hidden={isOpen}
      >
        <svg
          viewBox="0 0 200 140"
          className="happy-envelope__svg"
          role="img"
          aria-hidden
        >
          <rect
            x="20"
            y="50"
            width="160"
            height="85"
            rx="6"
            className="happy-envelope__body"
          />
          <path
            d="M20 55 L100 95 L180 55"
            className="happy-envelope__inner-fold"
          />
          <path
            d="M20 50 L100 90 L180 50 Z"
            className="happy-envelope__flap"
          />
          <circle cx="100" cy="72" r="7" className="happy-envelope__seal" />
          <rect
            x="55"
            y="62"
            width="90"
            height="55"
            rx="4"
            className="happy-envelope__letter"
          />
          <path
            d="M68 78 H132 M68 88 H120 M68 98 H125"
            className="happy-envelope__letter-lines"
          />
        </svg>
      </div>

      {!isOpen ? (
        <p className="text-center text-sm text-secondary">{copy.sealedHint}</p>
      ) : null}

      <SurpriseButton
        variant="primary"
        onClick={isOpen ? resetEnvelope : openEnvelope}
        aria-expanded={isOpen}
        aria-controls={revealId}
      >
        {isOpen ? copy.resetLabel : copy.openLabel}
      </SurpriseButton>

      <SurpriseReveal
        mode="inline"
        isOpen={isOpen && message !== null}
        onClose={resetEnvelope}
        revealId={revealId}
        closeLabel={copy.resetLabel}
        className="w-full max-w-md rounded-scrapbook-lg border border-plum/10 bg-white/70 p-4 shadow-paper"
      >
        <p className="font-display text-lg font-semibold text-plum">{message}</p>
      </SurpriseReveal>
    </div>
  );
}

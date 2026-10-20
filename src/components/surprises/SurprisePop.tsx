"use client";

import { PaperCard } from "@/components/ui/PaperCard";
import { SecondaryButton } from "@/components/ui/SecondaryButton";
import { Sticker } from "@/components/ui/Sticker";
import { surpriseMessages } from "@/data/home";
import { useCallback, useId, useRef, useState } from "react";

type SurprisePopProps = {
  label: string;
  className?: string;
};

export function SurprisePop({ label, className }: SurprisePopProps) {
  const dialogTitleId = useId();
  const triggerRef = useRef<HTMLButtonElement>(null);
  const [message, setMessage] = useState<string | null>(null);

  const openSurprise = useCallback(() => {
    const index = Math.floor(Math.random() * surpriseMessages.length);
    setMessage(surpriseMessages[index] ?? surpriseMessages[0]);
  }, []);

  const closeSurprise = useCallback(() => {
    setMessage(null);
    triggerRef.current?.focus();
  }, []);

  return (
    <>
      <SecondaryButton
        ref={triggerRef}
        className={className}
        onClick={openSurprise}
        aria-haspopup="dialog"
        aria-expanded={message !== null}
      >
        {label}
      </SecondaryButton>

      {message ? (
        <div
          className="fixed inset-0 z-50 flex items-end justify-center p-4 sm:items-center"
          role="presentation"
        >
          <button
            type="button"
            className="absolute inset-0 bg-plum/25 backdrop-blur-[2px]"
            aria-label="Close surprise"
            onClick={closeSurprise}
          />
          <PaperCard
            role="dialog"
            aria-modal="true"
            aria-labelledby={dialogTitleId}
            elevated
            className="relative z-10 w-full max-w-md"
          >
            <div className="flex flex-wrap items-center gap-2">
              <Sticker accent="butter" tilt="right">
                Surprise!
              </Sticker>
            </div>
            <p
              id={dialogTitleId}
              className="mt-4 font-display text-xl font-semibold text-plum"
            >
              {message}
            </p>
            <div className="mt-6 flex justify-end">
              <SecondaryButton onClick={closeSurprise}>Okay, yay!</SecondaryButton>
            </div>
          </PaperCard>
        </div>
      ) : null}
    </>
  );
}

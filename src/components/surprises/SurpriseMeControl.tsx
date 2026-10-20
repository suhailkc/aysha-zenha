"use client";

import { SurpriseButton } from "@/components/surprises/SurpriseButton";
import { SurpriseReveal } from "@/components/surprises/SurpriseReveal";
import {
  surpriseMeMessages,
  surprisesContent,
} from "@/data/surprises";
import { pickRandomItem } from "@/lib/pick-random";
import { useCallback, useRef, useState } from "react";

type SurpriseMeControlProps = {
  buttonLabel?: string;
  className?: string;
};

export function SurpriseMeControl({
  buttonLabel = surprisesContent.sections.surpriseMe.buttonLabel,
  className,
}: SurpriseMeControlProps) {
  const copy = surprisesContent.sections.surpriseMe;
  const triggerRef = useRef<HTMLButtonElement>(null);
  const [message, setMessage] = useState<string | null>(null);
  const lastIndexRef = useRef<number | null>(null);

  const openSurprise = useCallback(() => {
    const { item, index } = pickRandomItem(
      surpriseMeMessages,
      lastIndexRef.current,
    );
    lastIndexRef.current = index;
    setMessage(item);
  }, []);

  const closeSurprise = useCallback(() => {
    setMessage(null);
    triggerRef.current?.focus();
  }, []);

  return (
    <>
      <SurpriseButton
        ref={triggerRef}
        className={className}
        onClick={openSurprise}
        aria-haspopup="dialog"
        aria-expanded={message !== null}
      >
        {buttonLabel}
      </SurpriseButton>

      <SurpriseReveal
        mode="dialog"
        isOpen={message !== null}
        onClose={closeSurprise}
        title={message ?? ""}
        badge={copy.dialogBadge}
        closeLabel={copy.closeLabel}
      />
    </>
  );
}

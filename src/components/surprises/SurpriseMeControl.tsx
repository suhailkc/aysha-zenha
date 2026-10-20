"use client";

import { SparkleBurst } from "@/components/surprises/SparkleBurst";
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
  const [sparkleKey, setSparkleKey] = useState(0);
  const lastIndexRef = useRef<number | null>(null);

  const openSurprise = useCallback(() => {
    setSparkleKey((k) => k + 1);
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
      {sparkleKey > 0 ? (
        <SparkleBurst key={sparkleKey} active />
      ) : null}
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

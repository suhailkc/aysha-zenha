"use client";

import { GameChoiceButton } from "@/components/play/GameChoiceButton";
import { SecondaryButton } from "@/components/ui/SecondaryButton";
import { Sticker } from "@/components/ui/Sticker";
import { playPageContent } from "@/data/play-page";
import { superpowerChoices } from "@/data/superpowers";
import type { SuperpowerChoice } from "@/types/play";
import { useCallback, useId, useState } from "react";

const { shared } = playPageContent;

export function SuperpowerPickerGame() {
  const baseId = useId();
  const [selected, setSelected] = useState<SuperpowerChoice | null>(null);

  const pickPower = useCallback((power: SuperpowerChoice) => {
    setSelected(power);
  }, []);

  const reset = useCallback(() => {
    setSelected(null);
  }, []);

  if (selected) {
    const headingId = `${baseId}-power-result`;
    return (
      <div
        className="fun-zone-result-card fun-zone-result-card--mint"
        role="status"
        aria-labelledby={headingId}
      >
        <Sticker accent={selected.accent} tilt="left" className="mb-3">
          Superpower activated
        </Sticker>
        <p className="text-4xl" aria-hidden>
          {selected.emoji}
        </p>
        <h3
          id={headingId}
          className="mt-2 font-display text-2xl font-semibold text-plum"
        >
          {selected.resultTitle}
        </h3>
        <p className="mt-4 text-secondary">{selected.resultBody}</p>
        <div className="mt-8 flex flex-wrap gap-3">
          <SecondaryButton onClick={reset}>
            {shared.restartLabel}
          </SecondaryButton>
        </div>
      </div>
    );
  }

  const listLabelId = `${baseId}-power-list`;

  return (
    <div className="flex flex-col gap-4">
      <p id={listLabelId} className="text-secondary">
        Tap a power. There is no wrong pick — only excellent nonsense.
      </p>
      <ul className="grid gap-3 sm:grid-cols-2" aria-labelledby={listLabelId}>
        {superpowerChoices.map((power) => (
          <li key={power.id}>
            <GameChoiceButton
              compact
              className="h-full w-full flex-col items-start gap-1 py-4 text-left"
              onClick={() => pickPower(power)}
            >
              <span className="flex items-center gap-2 font-display text-lg font-semibold text-plum">
                <span aria-hidden>{power.emoji}</span>
                {power.title}
              </span>
              <span className="text-sm font-normal text-secondary">
                {power.teaser}
              </span>
            </GameChoiceButton>
          </li>
        ))}
      </ul>
    </div>
  );
}

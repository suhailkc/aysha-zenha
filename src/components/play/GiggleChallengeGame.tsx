"use client";

import { GameChoiceButton } from "@/components/play/GameChoiceButton";
import { PrimaryButton } from "@/components/ui/PrimaryButton";
import { SecondaryButton } from "@/components/ui/SecondaryButton";
import { Sticker } from "@/components/ui/Sticker";
import { gigglePrompts } from "@/data/giggle-challenges";
import { playPageContent } from "@/data/play-page";
import { pickRandomItem } from "@/lib/pick-random";
import type { GigglePrompt } from "@/types/play";
import { useCallback, useId, useRef, useState } from "react";

const { shared } = playPageContent;

export function GiggleChallengeGame() {
  const baseId = useId();
  const lastIndexRef = useRef<number | null>(null);
  const [prompt, setPrompt] = useState<GigglePrompt>(gigglePrompts[0] as GigglePrompt);
  const [response, setResponse] = useState<string | null>(null);
  const [selectedChoiceId, setSelectedChoiceId] = useState<string | null>(
    null,
  );

  const loadAnother = useCallback(() => {
    const { item, index } = pickRandomItem(gigglePrompts, lastIndexRef.current);
    lastIndexRef.current = index;
    setPrompt(item);
    setResponse(null);
    setSelectedChoiceId(null);
  }, []);

  const restart = useCallback(() => {
    loadAnother();
  }, [loadAnother]);

  const promptId = `${baseId}-giggle-prompt`;

  if (response) {
    return (
      <div
        className="fun-zone-result-card fun-zone-result-card--butter"
        role="status"
        aria-live="polite"
      >
        <Sticker accent="butter" tilt="right" className="mb-3">
          Challenge complete
        </Sticker>
        <p className="font-display text-lg font-semibold text-plum">
          {response}
        </p>
        <div className="mt-8 flex flex-wrap gap-3">
          <PrimaryButton type="button" onClick={loadAnother}>
            {shared.anotherPromptLabel}
          </PrimaryButton>
          <SecondaryButton type="button" onClick={restart}>
            {shared.restartLabel}
          </SecondaryButton>
        </div>
      </div>
    );
  }

  if (prompt.kind === "action") {
    return (
      <div className="flex flex-col gap-5">
        <h3
          id={promptId}
          className="font-display text-xl font-semibold text-plum sm:text-2xl"
        >
          {prompt.prompt}
        </h3>
        <PrimaryButton
          type="button"
          onClick={() => setResponse(prompt.response)}
        >
          {prompt.actionLabel}
        </PrimaryButton>
        <SecondaryButton type="button" onClick={loadAnother}>
          {shared.anotherPromptLabel}
        </SecondaryButton>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-5">
      <h3
        id={promptId}
        className="font-display text-xl font-semibold text-plum sm:text-2xl"
      >
        {prompt.prompt}
      </h3>
      <ul
        className="grid grid-cols-2 gap-3 sm:grid-cols-4"
        aria-labelledby={promptId}
      >
        {prompt.choices.map((choice) => (
          <li key={choice.id}>
            <GameChoiceButton
              compact
              selected={selectedChoiceId === choice.id}
              className="flex h-full min-h-[5.5rem] w-full flex-col items-center justify-center gap-1 py-3"
              onClick={() => {
                setSelectedChoiceId(choice.id);
                setResponse(choice.response);
              }}
            >
              <span className="text-3xl" aria-hidden>
                {choice.emoji}
              </span>
              <span className="text-center text-sm font-semibold text-plum">
                {choice.label}
              </span>
            </GameChoiceButton>
          </li>
        ))}
      </ul>
      <SecondaryButton type="button" onClick={loadAnother}>
        {shared.anotherPromptLabel}
      </SecondaryButton>
    </div>
  );
}

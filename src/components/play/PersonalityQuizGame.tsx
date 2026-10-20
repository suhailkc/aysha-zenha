"use client";

import { GameChoiceButton } from "@/components/play/GameChoiceButton";
import { DecorativeDoodle } from "@/components/ui/DecorativeDoodle";
import { PrimaryButton } from "@/components/ui/PrimaryButton";
import { SecondaryButton } from "@/components/ui/SecondaryButton";
import { Sticker } from "@/components/ui/Sticker";
import { playPageContent } from "@/data/play-page";
import {
  personalityOutcomes,
  personalityQuizQuestions,
} from "@/data/personality-quiz";
import { computePersonalityOutcome } from "@/lib/personality-quiz-score";
import { useCallback, useId, useMemo, useState } from "react";

const { shared } = playPageContent;

export function PersonalityQuizGame() {
  const baseId = useId();
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [stepIndex, setStepIndex] = useState(0);
  const [showResult, setShowResult] = useState(false);

  const question = personalityQuizQuestions[stepIndex];
  const total = personalityQuizQuestions.length;
  const selectedForStep = question ? answers[question.id] : undefined;

  const outcome = useMemo(
    () =>
      computePersonalityOutcome(
        personalityQuizQuestions,
        answers,
        personalityOutcomes,
      ),
    [answers],
  );

  const restart = useCallback(() => {
    setAnswers({});
    setStepIndex(0);
    setShowResult(false);
  }, []);

  const selectOption = useCallback(
    (optionId: string) => {
      if (!question) {
        return;
      }
      setAnswers((prev) => ({ ...prev, [question.id]: optionId }));
    },
    [question],
  );

  const goNext = useCallback(() => {
    if (!question || !selectedForStep) {
      return;
    }
    if (stepIndex >= total - 1) {
      setShowResult(true);
      return;
    }
    setStepIndex((i) => i + 1);
  }, [question, selectedForStep, stepIndex, total]);

  const goBack = useCallback(() => {
    setShowResult(false);
    setStepIndex((i) => Math.max(0, i - 1));
  }, []);

  if (showResult && outcome) {
    const headingId = `${baseId}-result`;
    return (
      <div
        className="fun-zone-result-card fun-zone-result-card--lavender"
        role="status"
        aria-labelledby={headingId}
      >
        <DecorativeDoodle
          variant="sparkle"
          size={28}
          className="absolute right-4 top-4 text-lavender"
          aria-hidden
        />
        <Sticker accent={outcome.accent} tilt="right" className="mb-3">
          Your cosmic vibe
        </Sticker>
        <p className="text-4xl" aria-hidden>
          {outcome.emoji}
        </p>
        <h3
          id={headingId}
          className="mt-2 font-display text-2xl font-semibold text-plum sm:text-3xl"
        >
          {outcome.title}
        </h3>
        <p className="mt-2 font-display text-lg text-plum/90">
          {outcome.tagline}
        </p>
        <p className="mt-4 text-secondary">{outcome.description}</p>
        <div className="mt-8 flex flex-wrap gap-3">
          <SecondaryButton onClick={restart}>{shared.restartLabel}</SecondaryButton>
        </div>
      </div>
    );
  }

  if (!question) {
    return null;
  }

  const promptId = `${baseId}-prompt`;
  const progressLabel = `Question ${stepIndex + 1} of ${total}`;

  return (
    <div className="flex flex-col gap-5">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <p className="font-display text-sm font-semibold text-plum/80">
          {progressLabel}
        </p>
        <div
          className="h-2 flex-1 min-w-[8rem] max-w-xs overflow-hidden rounded-pill bg-plum/10"
          role="progressbar"
          aria-valuemin={1}
          aria-valuemax={total}
          aria-valuenow={stepIndex + 1}
          aria-label="Quiz progress"
        >
          <div
            className="h-full rounded-pill bg-lavender transition-[width] duration-300 ease-out"
            style={{ width: `${((stepIndex + 1) / total) * 100}%` }}
          />
        </div>
      </div>

      <h3
        id={promptId}
        className="font-display text-xl font-semibold text-plum sm:text-2xl"
      >
        {question.prompt}
      </h3>

      <ul
        className="grid gap-3 sm:grid-cols-2"
        role="list"
        aria-labelledby={promptId}
      >
        {question.options.map((option) => (
          <li key={option.id}>
            <GameChoiceButton
              selected={selectedForStep === option.id}
              onClick={() => selectOption(option.id)}
              className="h-full w-full text-left"
            >
              {option.label}
            </GameChoiceButton>
          </li>
        ))}
      </ul>

      <div className="flex flex-wrap gap-3 pt-2">
        {stepIndex > 0 ? (
          <SecondaryButton type="button" onClick={goBack}>
            {shared.backLabel}
          </SecondaryButton>
        ) : null}
        <PrimaryButton
          type="button"
          onClick={goNext}
          disabled={!selectedForStep}
          aria-disabled={!selectedForStep}
        >
          {stepIndex >= total - 1
            ? shared.seeResultLabel
            : shared.nextQuestionLabel}
        </PrimaryButton>
      </div>
    </div>
  );
}

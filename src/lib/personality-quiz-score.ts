import type {
  PersonalityOutcome,
  PersonalityOutcomeId,
  PersonalityQuizQuestion,
} from "@/types/play";

export function scorePersonalityAnswers(
  questions: readonly PersonalityQuizQuestion[],
  answers: Readonly<Record<string, string>>,
): Record<PersonalityOutcomeId, number> {
  const scores: Record<PersonalityOutcomeId, number> = {
    "sparkle-storm": 0,
    "giggle-galaxy": 0,
    "rainbow-explorer": 0,
    "captain-curious": 0,
  };

  for (const question of questions) {
    const selectedId = answers[question.id];
    if (!selectedId) {
      continue;
    }
    const option = question.options.find((o) => o.id === selectedId);
    if (option) {
      scores[option.outcomeId] += 1;
    }
  }

  return scores;
}

export function resolvePersonalityOutcome(
  outcomes: readonly PersonalityOutcome[],
  scores: Record<PersonalityOutcomeId, number>,
): PersonalityOutcome {
  let best = outcomes[0] as PersonalityOutcome;
  let bestScore = scores[best.id] ?? 0;

  for (const outcome of outcomes) {
    const value = scores[outcome.id] ?? 0;
    if (value > bestScore) {
      bestScore = value;
      best = outcome;
    }
  }

  return best;
}

export function computePersonalityOutcome(
  questions: readonly PersonalityQuizQuestion[],
  answers: Readonly<Record<string, string>>,
  outcomes: readonly PersonalityOutcome[],
): PersonalityOutcome | null {
  const answeredCount = questions.filter((q) => answers[q.id]).length;
  if (answeredCount < questions.length) {
    return null;
  }

  const scores = scorePersonalityAnswers(questions, answers);
  return resolvePersonalityOutcome(outcomes, scores);
}

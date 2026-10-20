"use client";

import { DecorativeDoodle } from "@/components/ui/DecorativeDoodle";
import dynamic from "next/dynamic";
import { PaperCard } from "@/components/ui/PaperCard";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Sticker } from "@/components/ui/Sticker";
import { playPageContent } from "@/data/play-page";

const PersonalityQuizGame = dynamic(
  () =>
    import("@/components/play/PersonalityQuizGame").then(
      (mod) => mod.PersonalityQuizGame,
    ),
  {
    loading: () => (
      <p className="text-secondary" aria-busy="true">
        Loading quiz…
      </p>
    ),
  },
);

const SuperpowerPickerGame = dynamic(
  () =>
    import("@/components/play/SuperpowerPickerGame").then(
      (mod) => mod.SuperpowerPickerGame,
    ),
  {
    loading: () => (
      <p className="text-secondary" aria-busy="true">
        Loading superpowers…
      </p>
    ),
  },
);

const GiggleChallengeGame = dynamic(
  () =>
    import("@/components/play/GiggleChallengeGame").then(
      (mod) => mod.GiggleChallengeGame,
    ),
  {
    loading: () => (
      <p className="text-secondary" aria-busy="true">
        Loading giggle challenge…
      </p>
    ),
  },
);

export function FunZoneExperience() {
  const { page, games } = playPageContent;

  return (
    <div className="mx-auto flex w-full max-w-6xl flex-1 flex-col gap-10 px-4 py-10 sm:px-6 sm:py-12">
      <SectionHeading
        as="h1"
        title={page.title}
        subtitle={page.subtitle}
        className="max-w-2xl"
      />

      <div className="grid gap-8 lg:grid-cols-1">
        <PaperCard
          elevated
          className="fun-zone-game-card fun-zone-game-card--quiz relative overflow-visible"
        >
          <DecorativeDoodle
            variant="star"
            size={26}
            className="absolute -right-1 -top-2 text-lavender"
            aria-hidden
          />
          <Sticker accent="lavender" tilt="right" className="mb-4">
            {games.personalityQuiz.badge}
          </Sticker>
          <h2 className="font-display text-2xl font-semibold text-plum">
            {games.personalityQuiz.title}
          </h2>
          <p className="mt-2 text-secondary">
            {games.personalityQuiz.description}
          </p>
          <div className="mt-8">
            <PersonalityQuizGame />
          </div>
        </PaperCard>

        <PaperCard
          elevated
          className="fun-zone-game-card fun-zone-game-card--power relative overflow-visible"
        >
          <DecorativeDoodle
            variant="heart"
            size={22}
            className="absolute left-3 top-2 text-mint"
            aria-hidden
          />
          <Sticker accent="mint" tilt="left" className="mb-4">
            {games.superpowers.badge}
          </Sticker>
          <h2 className="font-display text-2xl font-semibold text-plum">
            {games.superpowers.title}
          </h2>
          <p className="mt-2 text-secondary">
            {games.superpowers.description}
          </p>
          <div className="mt-8">
            <SuperpowerPickerGame />
          </div>
        </PaperCard>

        <PaperCard
          elevated
          className="fun-zone-game-card fun-zone-game-card--giggle relative overflow-visible"
        >
          <DecorativeDoodle
            variant="sparkle"
            size={24}
            className="absolute right-5 top-3 text-butter"
            aria-hidden
          />
          <Sticker accent="butter" tilt="right" className="mb-4">
            {games.giggleChallenge.badge}
          </Sticker>
          <h2 className="font-display text-2xl font-semibold text-plum">
            {games.giggleChallenge.title}
          </h2>
          <p className="mt-2 text-secondary">
            {games.giggleChallenge.description}
          </p>
          <div className="mt-8">
            <GiggleChallengeGame />
          </div>
        </PaperCard>
      </div>
    </div>
  );
}

"use client";

import { DailySprinkleControl } from "@/components/surprises/DailySprinkleControl";
import { HappyEnvelope } from "@/components/surprises/HappyEnvelope";
import { MiniCelebrationControl } from "@/components/surprises/MiniCelebrationControl";
import { StickerDiscoveryBoard } from "@/components/surprises/StickerDiscoveryBoard";
import { SurpriseMeControl } from "@/components/surprises/SurpriseMeControl";
import { DecorativeDoodle } from "@/components/ui/DecorativeDoodle";
import { PaperCard } from "@/components/ui/PaperCard";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { surprisesContent } from "@/data/surprises";

export function SurprisesExperience() {
  const { page, sections } = surprisesContent;

  return (
    <div className="mx-auto flex w-full max-w-6xl flex-1 flex-col gap-10 px-4 py-10 sm:px-6 sm:py-12">
      <SectionHeading
        as="h1"
        title={page.title}
        subtitle={page.subtitle}
        className="max-w-2xl"
      />

      <div className="grid gap-6 lg:grid-cols-2">
        <PaperCard elevated className="relative overflow-visible">
          <DecorativeDoodle
            variant="star"
            size={24}
            className="absolute -right-1 -top-2 text-butter"
          />
          <h2 className="font-display text-2xl font-semibold text-plum">
            {sections.surpriseMe.title}
          </h2>
          <p className="mt-2 text-secondary">{sections.surpriseMe.description}</p>
          <div className="mt-6">
            <SurpriseMeControl />
          </div>
        </PaperCard>

        <PaperCard elevated className="relative overflow-visible">
          <DecorativeDoodle
            variant="heart"
            size={22}
            className="absolute -left-2 top-3 text-bubblegum"
          />
          <h2 className="font-display text-2xl font-semibold text-plum">
            {sections.envelope.title}
          </h2>
          <p className="mt-2 text-secondary">{sections.envelope.description}</p>
          <div className="mt-6">
            <HappyEnvelope />
          </div>
        </PaperCard>

        <PaperCard elevated className="relative overflow-visible lg:col-span-2">
          <DecorativeDoodle
            variant="sparkle"
            size={26}
            className="absolute right-4 top-4 text-lavender"
          />
          <h2 className="font-display text-2xl font-semibold text-plum">
            {sections.dailySprinkle.title}
          </h2>
          <p className="mt-2 text-secondary">
            {sections.dailySprinkle.description}
          </p>
          <div className="mt-6 flex justify-center">
            <DailySprinkleControl />
          </div>
        </PaperCard>

        <PaperCard elevated className="relative overflow-visible lg:col-span-2">
          <h2 className="font-display text-2xl font-semibold text-plum">
            {sections.stickers.title}
          </h2>
          <p className="mt-2 text-secondary">{sections.stickers.description}</p>
          <div className="mt-8">
            <StickerDiscoveryBoard />
          </div>
        </PaperCard>

        <PaperCard elevated className="relative overflow-visible lg:col-span-2">
          <h2 className="font-display text-2xl font-semibold text-plum">
            {sections.celebration.title}
          </h2>
          <p className="mt-2 text-secondary">
            {sections.celebration.description}
          </p>
          <div className="mt-6 flex justify-center">
            <MiniCelebrationControl />
          </div>
        </PaperCard>
      </div>
    </div>
  );
}

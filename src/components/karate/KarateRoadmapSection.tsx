import { KarateRoadmapJourney } from "@/components/karate/roadmap/KarateRoadmapJourney";
import { RoadmapProgressIndicator } from "@/components/karate/roadmap/RoadmapProgressIndicator";
import { DecorativeDoodle } from "@/components/ui/DecorativeDoodle";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Sticker } from "@/components/ui/Sticker";
import { getOrderedKarateBeltStages, karateRoadmapContent } from "@/data/karate-roadmap";

export function KarateRoadmapSection() {
  const milestones = getOrderedKarateBeltStages();
  const copy = karateRoadmapContent;

  return (
    <section
      id="karate-roadmap"
      aria-labelledby="karate-roadmap-heading"
      className="section-reveal mx-auto w-full max-w-7xl scroll-mt-24 px-4 py-8 sm:px-6 sm:py-12"
    >
      <div className="relative mb-6 flex flex-col items-center gap-3">
        <Sticker accent="orange" tilt="right" className="w-fit">
          {copy.editionLabel}
        </Sticker>
        <DecorativeDoodle
          variant="star"
          size={26}
          className="anim-float absolute left-2 top-12 text-butter sm:left-8"
        />
        <DecorativeDoodle
          variant="sparkle"
          size={22}
          className="anim-float-delayed absolute right-2 top-14 text-lavender sm:right-10"
        />
        <SectionHeading
          as="h2"
          headingId="karate-roadmap-heading"
          title={copy.heading}
          subtitle={copy.supporting}
          align="center"
          className="max-w-3xl"
        />
        <p className="max-w-2xl text-center text-base leading-relaxed text-secondary sm:text-lg">
          {copy.encouragement}
        </p>
        <RoadmapProgressIndicator progress={copy.progress} className="mt-2" />
      </div>

      <KarateRoadmapJourney milestones={milestones} />
    </section>
  );
}

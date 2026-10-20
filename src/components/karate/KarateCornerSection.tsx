import { DojoRoofDecoration } from "@/components/karate/DojoRoofDecoration";
import { KarateValueBadge } from "@/components/karate/KarateValueBadge";
import { OrangeBeltChampionBadge } from "@/components/karate/OrangeBeltChampionBadge";
import { OrangeBeltIllustration } from "@/components/karate/OrangeBeltIllustration";
import { DecorativeDoodle } from "@/components/ui/DecorativeDoodle";
import { PaperCard } from "@/components/ui/PaperCard";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Sticker } from "@/components/ui/Sticker";
import { homeContent } from "@/data/home";

export function KarateCornerSection() {
  const { karateCorner } = homeContent;

  return (
    <section
      id="karate-corner"
      aria-labelledby="karate-corner-heading"
      className="section-reveal mx-auto w-full max-w-6xl scroll-mt-24 px-4 py-8 sm:px-6 sm:py-12"
    >
      <div className="relative mb-8 flex flex-col items-center gap-2">
        <DojoRoofDecoration className="text-karate-orange" />
        <DecorativeDoodle
          variant="sparkle"
          size={24}
          className="anim-float absolute -left-1 top-6 text-butter sm:left-4"
        />
        <DecorativeDoodle
          variant="star"
          size={22}
          className="anim-float-delayed absolute -right-1 top-10 text-lavender sm:right-6"
        />
        <SectionHeading
          as="h2"
          headingId="karate-corner-heading"
          title={karateCorner.heading}
          subtitle={karateCorner.supporting}
          align="center"
          className="max-w-2xl"
        />
      </div>

      <PaperCard
        elevated
        className="relative overflow-visible border-karate-orange/20 bg-gradient-to-br from-white/80 via-lavender/15 to-mint/20 p-6 sm:p-10"
      >
        <DecorativeDoodle
          variant="heart"
          size={20}
          className="absolute right-4 top-4 text-bubblegum/70"
        />
        <div className="grid items-center gap-10 lg:grid-cols-[1fr_auto_1fr] lg:gap-8">
          <div className="flex flex-col items-center gap-4 text-center lg:items-start lg:text-left">
            <Sticker accent="orange" tilt="right">
              Verified achievement
            </Sticker>
            <p className="font-display text-xl font-semibold text-plum sm:text-2xl">
              {karateCorner.tagline}
            </p>
            <p className="max-w-sm text-sm leading-relaxed text-secondary sm:text-base">
              {karateCorner.cardBlurb}
            </p>
            <div className="group relative mt-2 flex items-center gap-3">
              <OrangeBeltIllustration />
            </div>
          </div>

          <div className="flex justify-center">
            <OrangeBeltChampionBadge title={karateCorner.badgeTitle} />
          </div>

          <div className="flex flex-col items-center gap-5 lg:items-end">
            <p className="font-display text-sm font-semibold uppercase tracking-wide text-plum/70">
              Warrior values
            </p>
            <div className="flex flex-wrap justify-center gap-2 lg:justify-end">
              {karateCorner.values.map((value) => (
                <KarateValueBadge key={value} label={value} />
              ))}
            </div>
          </div>
        </div>
      </PaperCard>
    </section>
  );
}

import { DecorativeDoodle } from "@/components/ui/DecorativeDoodle";
import { PaperCard } from "@/components/ui/PaperCard";
import { PrimaryButton } from "@/components/ui/PrimaryButton";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Sticker } from "@/components/ui/Sticker";
import { homeContent } from "@/data/home";

export function FunZonePreviewSection() {
  const { funZone } = homeContent;

  return (
    <section
      aria-labelledby="fun-zone-heading"
      className="mx-auto w-full max-w-6xl px-4 py-8 sm:px-6 sm:py-10"
    >
      <SectionHeading
        as="h2"
        headingId="fun-zone-heading"
        title={funZone.heading}
        subtitle={funZone.subtitle}
        align="center"
        className="mx-auto max-w-2xl"
      />
      <PaperCard
        elevated
        className="relative mx-auto mt-8 max-w-3xl overflow-visible"
      >
        <DecorativeDoodle
          variant="sparkle"
          size={28}
          className="absolute -right-2 -top-3 text-butter"
        />
        <DecorativeDoodle
          variant="planet"
          size={24}
          className="absolute -left-3 bottom-4 text-lavender"
        />
        <div className="flex flex-col items-center gap-5 text-center sm:flex-row sm:text-left">
          <div className="flex flex-1 flex-col gap-3">
            <Sticker accent="bubblegum" tilt="left" className="mx-auto w-fit sm:mx-0">
              Fun Zone
            </Sticker>
            <p className="text-base leading-relaxed text-secondary">
              {funZone.teaser}
            </p>
          </div>
          <PrimaryButton href="/play" className="shrink-0">
            {funZone.cta}
          </PrimaryButton>
        </div>
      </PaperCard>
    </section>
  );
}

import { ScrapbookPortrait } from "@/components/home/ScrapbookPortrait";
import { PrimaryButton } from "@/components/ui/PrimaryButton";
import { SecondaryButton } from "@/components/ui/SecondaryButton";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Sticker } from "@/components/ui/Sticker";
import { homeContent } from "@/data/home";

export function HeroSection() {
  const { hero, heroKarate } = homeContent;

  return (
    <section
      aria-labelledby="hero-heading"
      className="section-reveal mx-auto w-full max-w-6xl px-4 py-10 sm:px-6 sm:py-14 lg:py-16"
    >
      <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-12">
        <div className="order-2 flex flex-col gap-6 lg:order-1">
          <div className="flex flex-wrap items-center gap-2">
            <Sticker accent="mint" tilt="right" className="w-fit">
              {hero.badge}
            </Sticker>
            <Sticker accent="orange" tilt="left" className="w-fit">
              {heroKarate.editionSticker}
            </Sticker>
          </div>
          <SectionHeading
            as="h1"
            headingId="hero-heading"
            title={hero.headline}
            subtitle={hero.supporting}
            className="text-balance"
          />
          <p className="font-display text-lg font-semibold text-deep-orange">
            {homeContent.karateCorner.tagline}
          </p>
          <Sticker accent="lavender" tilt="right" className="w-fit achievement-pop">
            {heroKarate.championLabel}
          </Sticker>
          <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center">
            <PrimaryButton href="#memories-preview">
              {hero.exploreMemoriesLabel}
            </PrimaryButton>
            <SecondaryButton href={heroKarate.dojoLinkHref}>
              {heroKarate.dojoLinkLabel}
            </SecondaryButton>
          </div>
        </div>
        <div className="order-1 lg:order-2">
          <ScrapbookPortrait />
        </div>
      </div>
    </section>
  );
}

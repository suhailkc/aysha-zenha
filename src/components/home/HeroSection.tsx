import { ScrapbookPortrait } from "@/components/home/ScrapbookPortrait";
import { SurprisePop } from "@/components/surprises/SurprisePop";
import { PrimaryButton } from "@/components/ui/PrimaryButton";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Sticker } from "@/components/ui/Sticker";
import { homeContent } from "@/data/home";

export function HeroSection() {
  const { hero } = homeContent;

  return (
    <section
      aria-labelledby="hero-heading"
      className="mx-auto w-full max-w-6xl px-4 py-10 sm:px-6 sm:py-14 lg:py-16"
    >
      <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-12">
        <div className="order-2 flex flex-col gap-6 lg:order-1">
          <Sticker accent="mint" tilt="right" className="w-fit">
            {hero.badge}
          </Sticker>
          <SectionHeading
            as="h1"
            headingId="hero-heading"
            title={hero.headline}
            subtitle={hero.supporting}
            className="text-balance"
          />
          <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center">
            <PrimaryButton href="#memories-preview">
              {hero.exploreMemoriesLabel}
            </PrimaryButton>
            <SurprisePop label={hero.surpriseLabel} />
          </div>
        </div>
        <div className="order-1 lg:order-2">
          <ScrapbookPortrait />
        </div>
      </div>
    </section>
  );
}

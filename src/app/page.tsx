import {
  DecorativeDoodle,
  PaperCard,
  PrimaryButton,
  SectionHeading,
  Sticker,
} from "@/components/ui";
import { siteConfig } from "@/data/site";

/** Minimal foundation preview — not the full landing page. */
export default function Home() {
  return (
    <main className="mx-auto flex w-full max-w-2xl flex-1 flex-col gap-10 px-4 py-10 sm:px-6 sm:py-14 md:py-16">
      <div className="flex flex-wrap items-center gap-2">
        <Sticker accent="mint" tilt="right">
          Phase 0
        </Sticker>
        <Sticker accent="butter" tilt="left">
          Design system
        </Sticker>
      </div>

      <SectionHeading
        as="h1"
        title={siteConfig.projectName}
        subtitle={siteConfig.tagline}
      />

      <PaperCard elevated className="relative overflow-visible">
        <DecorativeDoodle
          variant="sparkle"
          size={20}
          className="absolute -right-1 -top-2 text-lavender"
        />
        <SectionHeading
          as="h2"
          title="Scrapbook building blocks"
          subtitle="Paper cards, stickers, doodles, and buttons will carry the rest of the site. More surprises come later."
        />
        <div className="mt-8 flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
          <div
            aria-hidden
            className="photo-frame-scrapbook mx-auto h-28 w-28 shrink-0 bg-linear-to-br from-lavender/40 via-bubblegum/30 to-mint/40 sm:mx-0"
          />
          <div className="flex flex-col items-stretch gap-3 sm:items-end">
            <PrimaryButton href="#foundation-preview">
              Peek inside
            </PrimaryButton>
            <p className="text-center text-sm text-secondary sm:text-right">
              Touch-friendly, rounded, and ready for real pages.
            </p>
          </div>
        </div>
      </PaperCard>

      <section
        id="foundation-preview"
        aria-label="Color and type preview"
        className="grid gap-4 sm:grid-cols-2"
      >
        <PaperCard padding="sm">
          <p className="font-display text-lg font-semibold text-plum">Display</p>
          <p className="mt-1 text-sm text-secondary">
            Fredoka for headlines and labels.
          </p>
        </PaperCard>
        <PaperCard padding="sm">
          <p className="text-lg font-semibold text-plum">Body</p>
          <p className="mt-1 text-sm text-secondary">
            Nunito for comfortable reading on cream.
          </p>
        </PaperCard>
      </section>
    </main>
  );
}

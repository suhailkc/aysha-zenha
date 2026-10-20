import { DecorativeDoodle } from "@/components/ui/DecorativeDoodle";
import { publicFileExists } from "@/lib/public-asset";
import { cn } from "@/lib/cn";
import Image from "next/image";

const HERO_IMAGE_PATH = "/photos/hero.webp";

type ScrapbookPortraitProps = {
  className?: string;
};

export function ScrapbookPortrait({ className }: ScrapbookPortraitProps) {
  const hasHero = publicFileExists(HERO_IMAGE_PATH);

  return (
    <div className={cn("relative mx-auto w-full max-w-sm", className)}>
      <div
        aria-hidden
        className="absolute -left-3 top-6 z-20 rotate-[-8deg] rounded-scrapbook-sm bg-butter px-2 py-1 font-display text-xs font-semibold text-plum shadow-[var(--shadow-sticker)]"
      >
        Hi!
      </div>
      <DecorativeDoodle
        variant="star"
        size={26}
        className="absolute -right-2 top-2 z-20 text-lavender"
      />
      <DecorativeDoodle
        variant="flower"
        size={28}
        className="absolute -left-4 bottom-16 z-20 text-mint"
      />
      <DecorativeDoodle
        variant="planet"
        size={24}
        className="absolute right-0 bottom-8 z-20 text-bubblegum/90"
      />
      <DecorativeDoodle
        variant="smiley"
        size={22}
        className="absolute left-6 bottom-2 z-20 text-butter"
      />

      <div
        aria-hidden
        className="absolute inset-3 -z-10 rotate-3 rounded-scrapbook-2xl border-2 border-dashed border-lavender/50 bg-white/40"
      />
      <div
        aria-hidden
        className="absolute inset-0 -z-10 -rotate-2 rounded-scrapbook-2xl bg-mint/30"
      />

      <div className="photo-frame-layered relative aspect-[4/5] w-full">
        {hasHero ? (
          <Image
            src={HERO_IMAGE_PATH}
            alt="Aysha smiling in a cozy outfit, framed like a scrapbook portrait"
            fill
            priority
            sizes="(max-width: 768px) 85vw, 360px"
            className="object-cover"
          />
        ) : (
          <div className="scrapbook-portrait-placeholder">
            <div className="scrapbook-portrait-placeholder__silhouette" />
            <p className="max-w-[12rem] text-center font-display text-sm font-semibold text-plum/80">
              Hero photo goes in{" "}
              <span className="whitespace-nowrap">public/photos/hero.webp</span>
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

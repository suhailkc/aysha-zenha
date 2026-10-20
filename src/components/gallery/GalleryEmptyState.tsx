import { OrangeBeltIllustration } from "@/components/karate/OrangeBeltIllustration";
import { DecorativeDoodle } from "@/components/ui/DecorativeDoodle";
import { PaperCard } from "@/components/ui/PaperCard";
import { galleryPageContent } from "@/data/gallery-page";

export function GalleryEmptyState() {
  const { emptyTitle, emptyBody, emptyHint } = galleryPageContent;

  return (
    <PaperCard className="relative mx-auto max-w-xl border-karate-orange/15 px-6 py-10 text-center">
      <DecorativeDoodle
        variant="star"
        size={32}
        className="mx-auto mb-4 text-lavender"
      />
      <div aria-hidden className="mx-auto mb-4 flex justify-center opacity-90">
        <OrangeBeltIllustration interactive={false} className="w-[5rem]" />
      </div>
      <h2 className="font-display text-2xl font-semibold text-plum">
        {emptyTitle}
      </h2>
      <p className="mt-3 text-base leading-relaxed text-secondary">
        {emptyBody}
      </p>
      <p className="mt-4 font-display text-sm font-semibold text-plum/70">
        {emptyHint}
      </p>
    </PaperCard>
  );
}

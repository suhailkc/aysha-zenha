import { DecorativeDoodle } from "@/components/ui/DecorativeDoodle";
import { PaperCard } from "@/components/ui/PaperCard";
import { scrapbookPageContent } from "@/data/scrapbook-page";

export function ScrapbookEmptyState() {
  const { emptyTitle, emptyBody, emptyHint } = scrapbookPageContent;

  return (
    <PaperCard className="relative mx-auto max-w-xl px-6 py-10 text-center">
      <DecorativeDoodle
        variant="flower"
        size={36}
        className="mx-auto mb-4 text-mint"
      />
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

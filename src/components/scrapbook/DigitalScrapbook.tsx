import { ScrapbookEmptyState } from "@/components/scrapbook/ScrapbookEmptyState";
import { ScrapbookSpreadCard } from "@/components/scrapbook/ScrapbookSpreadCard";
import { scrapbookPageContent } from "@/data/scrapbook-page";
import type { ScrapbookMemory } from "@/types/content";

type DigitalScrapbookProps = {
  memories: ScrapbookMemory[];
};

export function DigitalScrapbook({ memories }: DigitalScrapbookProps) {
  if (memories.length === 0) {
    return <ScrapbookEmptyState />;
  }

  return (
    <div className="mt-10 space-y-10">
      <ol className="scrapbook-spread-list m-0 flex list-none flex-col gap-10 p-0">
        {memories.map((memory, index) => (
          <li key={memory.id}>
            <ScrapbookSpreadCard
              memory={memory}
              index={index}
              priorityImage={index === 0}
            />
          </li>
        ))}
      </ol>
      <p className="text-center font-display text-sm font-semibold text-plum/65">
        {scrapbookPageContent.editHint}
      </p>
    </div>
  );
}

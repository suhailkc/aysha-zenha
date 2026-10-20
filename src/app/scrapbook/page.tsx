import { DigitalScrapbook } from "@/components/scrapbook/DigitalScrapbook";
import { DecorativeDoodle } from "@/components/ui/DecorativeDoodle";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { scrapbookPageContent } from "@/data/scrapbook-page";
import { getScrapbookMemories } from "@/lib/scrapbook";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Digital Scrapbook",
  description:
    "Curated photo spreads with captions and notes, separate from the memory gallery grid.",
};

export default function ScrapbookPage() {
  const memories = getScrapbookMemories();

  return (
    <main className="mx-auto flex w-full max-w-5xl flex-1 flex-col px-4 py-10 sm:px-6 sm:py-12">
      <div className="relative max-w-2xl">
        <DecorativeDoodle
          variant="flower"
          size={36}
          className="absolute -left-2 top-0 hidden text-mint sm:block"
        />
        <DecorativeDoodle
          variant="sparkle"
          size={28}
          className="absolute right-0 top-8 text-butter"
        />
        <SectionHeading
          as="h1"
          title={scrapbookPageContent.title}
          subtitle={scrapbookPageContent.subtitle}
          className="relative"
        />
      </div>
      <DigitalScrapbook memories={memories} />
    </main>
  );
}

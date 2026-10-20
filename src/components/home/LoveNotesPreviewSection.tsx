import { LoveNotesCarousel } from "@/components/home/LoveNotesCarousel";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { homeContent } from "@/data/home";
import { getFamilyLoveNotes } from "@/lib/messages";

export function LoveNotesPreviewSection() {
  const { loveNotes } = homeContent;
  const messages = getFamilyLoveNotes();

  return (
    <section
      aria-labelledby="love-notes-heading"
      className="mx-auto w-full max-w-6xl px-4 py-8 sm:px-6 sm:py-12"
    >
      <SectionHeading
        as="h2"
        headingId="love-notes-heading"
        title={loveNotes.heading}
        subtitle={loveNotes.subtitle}
      />
      {messages.length === 0 ? (
        <p className="mt-8 text-center text-secondary">
          Add notes in src/data/messages.json to preview them here.
        </p>
      ) : (
        <LoveNotesCarousel notes={messages} />
      )}
    </section>
  );
}

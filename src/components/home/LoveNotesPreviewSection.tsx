import { LoveNoteCard } from "@/components/messages/LoveNoteCard";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { homeContent } from "@/data/home";
import { getFamilyLoveNotes } from "@/lib/messages";
import { loveNoteTiltClass } from "@/lib/love-note-styles";
import { cn } from "@/lib/cn";

const previewCount = 3;

export function LoveNotesPreviewSection() {
  const { loveNotes } = homeContent;
  const previewMessages = getFamilyLoveNotes().slice(0, previewCount);

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
      {previewMessages.length === 0 ? (
        <p className="mt-8 text-center text-secondary">
          Add notes in src/data/messages.json to preview them here.
        </p>
      ) : (
        <ul className="mt-8 grid list-none gap-4 p-0 md:grid-cols-3">
          {previewMessages.map((note, index) => (
            <li
              key={note.id}
              className={cn(
                "motion-safe:transition-transform",
                loveNoteTiltClass(index),
              )}
            >
              <LoveNoteCard note={note} compact className="h-full bg-white/80" />
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}

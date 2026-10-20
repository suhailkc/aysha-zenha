import { PaperCard } from "@/components/ui/PaperCard";
import { PrimaryButton } from "@/components/ui/PrimaryButton";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { homeContent } from "@/data/home";
import messages from "@/data/messages.json";
import type { FamilyMessage } from "@/types/content";

const previewMessages = (messages as FamilyMessage[]).slice(0, 3);

const accentBorder: Record<
  NonNullable<FamilyMessage["accent"]>,
  string
> = {
  lavender: "border-l-lavender",
  pink: "border-l-bubblegum",
  mint: "border-l-mint",
  butter: "border-l-butter",
};

export function LoveNotesPreviewSection() {
  const { loveNotes } = homeContent;

  return (
    <section
      aria-labelledby="love-notes-heading"
      className="mx-auto w-full max-w-6xl px-4 py-8 sm:px-6 sm:py-12"
    >
      <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
        <SectionHeading
          as="h2"
          headingId="love-notes-heading"
          title={loveNotes.heading}
          subtitle={loveNotes.subtitle}
        />
        <PrimaryButton href="/messages" className="shrink-0 self-start sm:self-auto">
          {loveNotes.cta}
        </PrimaryButton>
      </div>
      <ul className="mt-8 grid gap-4 md:grid-cols-3">
        {previewMessages.map((note) => {
          const accent = note.accent ?? "lavender";
          return (
            <li key={note.id}>
              <PaperCard
                padding="sm"
                className={`h-full border-l-4 ${accentBorder[accent]} bg-white/80`}
              >
                <p className="font-display text-sm font-semibold text-plum">
                  {note.author}
                </p>
                <p className="mt-2 text-sm leading-relaxed text-secondary">
                  {note.message}
                </p>
              </PaperCard>
            </li>
          );
        })}
      </ul>
    </section>
  );
}

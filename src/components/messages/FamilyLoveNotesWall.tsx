import { LoveNoteCard } from "@/components/messages/LoveNoteCard";
import { LoveNotesEmptyState } from "@/components/messages/LoveNotesEmptyState";
import { messagesPageContent } from "@/data/messages-page";
import { loveNoteTiltClass } from "@/lib/love-note-styles";
import { cn } from "@/lib/cn";
import type { FamilyMessage } from "@/types/content";

type FamilyLoveNotesWallProps = {
  notes: FamilyMessage[];
};

export function FamilyLoveNotesWall({ notes }: FamilyLoveNotesWallProps) {
  if (notes.length === 0) {
    return <LoveNotesEmptyState />;
  }

  return (
    <div className="mt-10 space-y-8">
      <ul className="love-notes-wall grid list-none gap-6 p-0 sm:gap-8 md:grid-cols-2">
        {notes.map((note, index) => (
          <li
            key={note.id}
            className={cn(
              "transition-transform motion-safe:duration-300",
              loveNoteTiltClass(index),
              "motion-safe:hover:rotate-0 motion-safe:hover:scale-[1.01]",
            )}
          >
            <LoveNoteCard note={note} className="h-full shadow-paper-lifted" />
          </li>
        ))}
      </ul>
      <p className="text-center font-display text-sm font-semibold text-plum/65">
        {messagesPageContent.editHint}
      </p>
    </div>
  );
}

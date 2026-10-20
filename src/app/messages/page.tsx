import { FamilyLoveNotesWall } from "@/components/messages/FamilyLoveNotesWall";
import { DecorativeDoodle } from "@/components/ui/DecorativeDoodle";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { messagesPageContent } from "@/data/messages-page";
import { getFamilyLoveNotes } from "@/lib/messages";
import { pageMetadata } from "@/lib/site-metadata";

export const metadata = pageMetadata(
  "Family Love Notes",
  "Curated message cards from the family, styled like a handmade scrapbook page.",
);

export default function MessagesPage() {
  const notes = getFamilyLoveNotes();

  return (
    <main
      id="site-main"
      className="mx-auto flex w-full max-w-6xl flex-1 flex-col px-4 py-10 sm:px-6 sm:py-12"
    >
      <div className="relative max-w-2xl">
        <DecorativeDoodle
          variant="heart"
          size={32}
          className="absolute -left-1 top-1 text-bubblegum"
        />
        <DecorativeDoodle
          variant="star"
          size={28}
          className="absolute -right-2 top-10 text-lavender sm:right-0"
        />
        <SectionHeading
          as="h1"
          title={messagesPageContent.title}
          subtitle={messagesPageContent.subtitle}
          className="relative"
        />
      </div>
      <FamilyLoveNotesWall notes={notes} />
    </main>
  );
}

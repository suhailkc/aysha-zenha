import { TapeDecoration } from "@/components/messages/TapeDecoration";
import { ScrapbookPhotoFrame } from "@/components/scrapbook/ScrapbookPhotoFrame";
import { Sticker } from "@/components/ui/Sticker";
import {
  loveNoteAccentOrDefault,
  loveNoteAccentSurface,
} from "@/lib/love-note-styles";
import { cn } from "@/lib/cn";
import type { ScrapbookMemory } from "@/types/content";

type ScrapbookSpreadCardProps = {
  memory: ScrapbookMemory;
  index: number;
  priorityImage?: boolean;
};

export function ScrapbookSpreadCard({
  memory,
  index,
  priorityImage,
}: ScrapbookSpreadCardProps) {
  const accent = loveNoteAccentOrDefault(memory.accent);
  const imageFirst = index % 2 === 0;

  return (
    <article
      className={cn(
        "scrapbook-spread paper-card relative overflow-hidden border-2 p-5 sm:p-7",
        loveNoteAccentSurface[accent],
      )}
    >
      <TapeDecoration className="scrapbook-spread__tape-top" variant="mint" />
      <TapeDecoration className="scrapbook-spread__tape-bottom" variant="butter" />

      <div
        className={cn(
          "grid gap-6 md:grid-cols-2 md:items-center md:gap-8",
          !imageFirst && "md:[&>*:first-child]:order-2",
        )}
      >
        <ScrapbookPhotoFrame memory={memory} priority={priorityImage} />

        <div className="space-y-3">
          {memory.yearOrCategory ? (
            <Sticker accent={accent === "pink" ? "bubblegum" : accent} tilt="right">
              {memory.yearOrCategory}
            </Sticker>
          ) : null}
          <figure className="m-0">
            <figcaption className="font-display text-xl font-semibold leading-snug text-plum sm:text-2xl">
              {memory.caption}
            </figcaption>
            {memory.src ? (
              <p className="sr-only">{memory.alt}</p>
            ) : null}
          </figure>
          {memory.note ? (
            <p className="text-base leading-relaxed text-secondary">{memory.note}</p>
          ) : null}
          <dl className="scrapbook-details mt-4 grid gap-2 border-t border-plum/10 pt-4 text-sm">
            <div className="grid gap-0.5">
              <dt className="font-display font-semibold text-plum">About this photo</dt>
              <dd className="text-secondary">{memory.alt}</dd>
            </div>
          </dl>
        </div>
      </div>
    </article>
  );
}

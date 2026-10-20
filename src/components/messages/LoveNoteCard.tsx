import { LoveNoteStickerIcon } from "@/components/messages/LoveNoteStickerIcon";
import { TapeDecoration } from "@/components/messages/TapeDecoration";
import { Sticker } from "@/components/ui/Sticker";
import { loveNoteCategoryLabels } from "@/lib/love-note-styles";
import {
  loveNoteAccentOrDefault,
  loveNoteAccentSurface,
} from "@/lib/love-note-styles";
import { cn } from "@/lib/cn";
import type { FamilyMessage } from "@/types/content";

type LoveNoteCardProps = {
  note: FamilyMessage;
  className?: string;
  compact?: boolean;
};

export function LoveNoteCard({ note, className, compact }: LoveNoteCardProps) {
  const accent = loveNoteAccentOrDefault(note.accent);
  const categoryLabel = note.category
    ? loveNoteCategoryLabels[note.category]
    : null;

  return (
    <article
      className={cn(
        "love-note-card paper-card relative border-2",
        loveNoteAccentSurface[accent],
        compact ? "p-4" : "p-5 sm:p-6",
        className,
      )}
    >
      <TapeDecoration
        variant={accent === "mint" ? "mint" : accent === "lavender" ? "lavender" : "butter"}
        className="love-note-card__tape-left"
      />
      <TapeDecoration
        variant="lavender"
        className="love-note-card__tape-right"
      />

      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0 flex-1 space-y-2">
          {categoryLabel ? (
            <Sticker accent={accent === "pink" ? "bubblegum" : accent} tilt="none">
              {categoryLabel}
            </Sticker>
          ) : null}
          {note.author ? (
            <p className="font-display text-sm font-semibold text-plum">
              {note.author}
            </p>
          ) : null}
          <p
            className={cn(
              "leading-relaxed text-plum",
              compact ? "text-sm" : "text-base sm:text-lg",
            )}
          >
            {note.message}
          </p>
        </div>
        <LoveNoteStickerIcon sticker={note.sticker} className="shrink-0" />
      </div>

      <span aria-hidden className="love-note-card__heart love-note-card__heart--1">
        ♥
      </span>
      <span aria-hidden className="love-note-card__heart love-note-card__heart--2">
        ♥
      </span>
    </article>
  );
}

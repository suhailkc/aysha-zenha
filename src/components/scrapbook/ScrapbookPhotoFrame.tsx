import { PhotoWithFallback } from "@/components/ui/PhotoWithFallback";
import { scrapbookPageContent } from "@/data/scrapbook-page";
import { cn } from "@/lib/cn";
import type { ScrapbookMemory } from "@/types/content";

type ScrapbookPhotoFrameProps = {
  memory: ScrapbookMemory;
  className?: string;
  priority?: boolean;
};

export function ScrapbookPhotoFrame({
  memory,
  className,
  priority,
}: ScrapbookPhotoFrameProps) {
  const { photoPendingLabel, photoPendingHint } = scrapbookPageContent;

  return (
    <div
      className={cn(
        "scrapbook-photo-frame photo-frame-scrapbook relative aspect-[4/3] w-full overflow-hidden bg-white/70 p-2 shadow-[var(--shadow-paper-lifted)]",
        className,
      )}
    >
      {memory.src ? (
        <PhotoWithFallback
          src={memory.src}
          alt={memory.alt}
          fill
          sizes="(max-width: 768px) 100vw, 45vw"
          fallbackLabel={scrapbookPageContent.photoLoadError}
          className="object-cover"
          priority={priority}
        />
      ) : (
        <div className="flex h-full flex-col items-center justify-center gap-2 rounded-[inherit] bg-linear-to-br from-lavender/30 via-bubblegum/20 to-mint/30 p-4 text-center">
          <DecorativePlaceholder />
          <p className="font-display text-sm font-semibold text-plum">
            {photoPendingLabel}
          </p>
          <p className="text-xs leading-snug text-secondary">{photoPendingHint}</p>
          <p className="sr-only">{memory.alt}</p>
        </div>
      )}
    </div>
  );
}

function DecorativePlaceholder() {
  return (
    <svg
      width="48"
      height="48"
      viewBox="0 0 48 48"
      fill="none"
      aria-hidden
      className="text-lavender/80"
    >
      <rect
        x="6"
        y="10"
        width="36"
        height="28"
        rx="4"
        stroke="currentColor"
        strokeWidth="2"
        strokeDasharray="4 3"
      />
      <circle cx="18" cy="22" r="4" fill="currentColor" opacity="0.35" />
      <path
        d="M10 34l10-8 8 6 8-10 6 8"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

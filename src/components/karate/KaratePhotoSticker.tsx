import { OrangeBeltIllustration } from "@/components/karate/OrangeBeltIllustration";
import { cn } from "@/lib/cn";

type KaratePhotoStickerProps = {
  className?: string;
};

/** Small belt sticker for karate-tagged gallery photos (corner placement). */
export function KaratePhotoSticker({ className }: KaratePhotoStickerProps) {
  return (
    <div
      aria-hidden
      className={cn(
        "pointer-events-none absolute bottom-2 right-2 z-10 rounded-scrapbook-sm bg-white/90 p-1 shadow-[var(--shadow-sticker)]",
        className,
      )}
    >
      <OrangeBeltIllustration interactive={false} className="w-[2.75rem]" />
    </div>
  );
}

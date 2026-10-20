import { DecorativeDoodle } from "@/components/ui/DecorativeDoodle";
import { cn } from "@/lib/cn";

type GalleryPreviewPlaceholderProps = {
  rotation?: "left" | "right" | "none";
  className?: string;
};

export function GalleryPreviewPlaceholder({
  rotation = "none",
  className,
}: GalleryPreviewPlaceholderProps) {
  const rotationClass =
    rotation === "left"
      ? "-rotate-2"
      : rotation === "right"
        ? "rotate-2"
        : "";

  return (
    <figure
      className={cn("relative flex flex-col gap-2", rotationClass, className)}
    >
      <div
        aria-hidden
        className="photo-frame-scrapbook flex aspect-[3/4] w-full flex-col items-center justify-center gap-2 bg-linear-to-br from-lavender/35 via-bubblegum/25 to-mint/35 p-3 text-center"
      >
        <DecorativeDoodle variant="star" size={22} className="text-plum/25" />
        <span className="font-display text-xs font-semibold text-plum/50">
          Photo slot
        </span>
      </div>
    </figure>
  );
}

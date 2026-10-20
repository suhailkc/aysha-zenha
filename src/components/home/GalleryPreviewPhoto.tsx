import { KaratePhotoSticker } from "@/components/karate/KaratePhotoSticker";
import { PhotoWithFallback } from "@/components/ui/PhotoWithFallback";
import { galleryPageContent } from "@/data/gallery-page";
import { cn } from "@/lib/cn";
import type { GalleryPhoto } from "@/types/content";

type GalleryPreviewPhotoProps = {
  photo: GalleryPhoto;
  rotation?: "left" | "right" | "none";
  className?: string;
};

export function GalleryPreviewPhoto({
  photo,
  rotation = "none",
  className,
}: GalleryPreviewPhotoProps) {
  const rotationClass =
    rotation === "left"
      ? "-rotate-2"
      : rotation === "right"
        ? "rotate-2"
        : "";

  return (
    <figure
      className={cn(
        "photo-card-interactive group relative flex flex-col gap-2",
        rotationClass,
        className,
      )}
    >
      <div
        className={cn(
          "photo-frame-scrapbook gallery-photo-frame relative aspect-[3/4] w-full overflow-hidden bg-linear-to-br from-lavender/35 via-bubblegum/25 to-mint/35",
          photo.tags.includes("karate") && "gallery-photo-frame--karate",
        )}
      >
        <PhotoWithFallback
          unoptimized
          src={photo.src}
          alt={photo.alt}
          width={photo.width}
          height={photo.height}
          loading="lazy"
          sizes="(max-width: 640px) 45vw, 180px"
          fallbackLabel={galleryPageContent.photoLoadError}
          className="absolute inset-0 h-full w-full object-cover transition-transform duration-200 group-hover:scale-[1.015]"
        />
        {photo.tags.includes("karate") ? <KaratePhotoSticker /> : null}
      </div>
      {photo.caption ? (
        <figcaption className="font-display text-xs font-semibold text-plum/75">
          {photo.caption}
        </figcaption>
      ) : null}
    </figure>
  );
}

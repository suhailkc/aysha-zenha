import { DecorativeDoodle } from "@/components/ui/DecorativeDoodle";
import { publicFileExists } from "@/lib/public-asset";
import { cn } from "@/lib/cn";
import type { GalleryPhoto } from "@/types/content";
import Image from "next/image";

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
  const srcPath = photo.src.replace(/^\//, "");
  const hasImage = publicFileExists(srcPath);

  const rotationClass =
    rotation === "left"
      ? "-rotate-2"
      : rotation === "right"
        ? "rotate-2"
        : "";

  return (
    <figure
      className={cn(
        "group relative flex flex-col gap-2",
        rotationClass,
        className,
      )}
    >
      <div className="photo-frame-scrapbook relative aspect-square w-full overflow-hidden bg-linear-to-br from-lavender/35 via-bubblegum/25 to-mint/35">
        {hasImage ? (
          <Image
            src={photo.src}
            alt={photo.alt}
            fill
            sizes="(max-width: 640px) 45vw, 180px"
            className="object-cover transition-transform duration-200 group-hover:scale-[1.03]"
          />
        ) : (
          <div
            aria-hidden
            className="flex h-full w-full flex-col items-center justify-center gap-2 p-3 text-center"
          >
            <DecorativeDoodle variant="star" size={22} className="text-plum/25" />
            <span className="font-display text-xs font-semibold text-plum/50">
              Photo slot
            </span>
          </div>
        )}
      </div>
      {photo.caption ? (
        <figcaption className="font-display text-xs font-semibold text-plum/75">
          {photo.caption}
        </figcaption>
      ) : null}
    </figure>
  );
}

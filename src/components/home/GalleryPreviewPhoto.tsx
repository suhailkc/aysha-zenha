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
      <div className="photo-frame-scrapbook relative w-full overflow-hidden bg-linear-to-br from-lavender/35 via-bubblegum/25 to-mint/35">
        <Image
          unoptimized
          src={photo.src}
          alt={photo.alt}
          width={photo.width}
          height={photo.height}
          loading="lazy"
          sizes="(max-width: 640px) 45vw, 180px"
          className="h-auto w-full object-cover transition-transform duration-200 group-hover:scale-[1.03]"
        />
      </div>
      {photo.caption ? (
        <figcaption className="font-display text-xs font-semibold text-plum/75">
          {photo.caption}
        </figcaption>
      ) : null}
    </figure>
  );
}

import { GalleryPreviewPhoto } from "@/components/home/GalleryPreviewPhoto";
import { GalleryPreviewPlaceholder } from "@/components/home/GalleryPreviewPlaceholder";
import { PrimaryButton } from "@/components/ui/PrimaryButton";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { homeContent } from "@/data/home";
import { galleryPreviewCount, getResolvedGalleryPhotos } from "@/lib/gallery";

const rotations = ["left", "right", "none", "right"] as const;

export function GalleryPreviewSection() {
  const { galleryPreview } = homeContent;
  const preview = getResolvedGalleryPhotos().slice(0, galleryPreviewCount);
  const placeholderCount = Math.max(0, galleryPreviewCount - preview.length);

  return (
    <section
      id="memories-preview"
      aria-labelledby="gallery-preview-heading"
      className="mx-auto w-full max-w-6xl px-4 py-8 sm:px-6 sm:py-10"
    >
      <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
        <SectionHeading
          as="h2"
          headingId="gallery-preview-heading"
          title={galleryPreview.heading}
          subtitle={galleryPreview.subtitle}
        />
        <PrimaryButton href="/gallery" className="shrink-0 self-start sm:self-auto">
          {galleryPreview.cta}
        </PrimaryButton>
      </div>
      <div className="mt-8 grid grid-cols-2 gap-4 sm:gap-6 md:grid-cols-4">
        {preview.map((photo, index) => (
          <GalleryPreviewPhoto
            key={photo.id}
            photo={photo}
            rotation={rotations[index] ?? "none"}
          />
        ))}
        {Array.from({ length: placeholderCount }, (_, i) => (
          <GalleryPreviewPlaceholder
            key={`placeholder-${i}`}
            rotation={rotations[preview.length + i] ?? "none"}
          />
        ))}
      </div>
    </section>
  );
}

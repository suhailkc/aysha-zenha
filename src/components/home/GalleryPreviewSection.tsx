import { GalleryPreviewCarousel } from "@/components/home/GalleryPreviewCarousel";
import { PrimaryButton } from "@/components/ui/PrimaryButton";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { homeContent } from "@/data/home";
import { galleryPreviewCount, getResolvedGalleryPhotos } from "@/lib/gallery";

export function GalleryPreviewSection() {
  const { galleryPreview } = homeContent;
  const photos = getResolvedGalleryPhotos();
  const placeholderCount = Math.max(0, galleryPreviewCount - photos.length);

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
      <GalleryPreviewCarousel
        photos={photos}
        placeholderCount={placeholderCount}
      />
    </section>
  );
}

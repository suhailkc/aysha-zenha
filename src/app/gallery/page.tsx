import { MemoryGallery } from "@/components/gallery/MemoryGallery";
import { DojoRoofDecoration } from "@/components/karate/DojoRoofDecoration";
import { DecorativeDoodle } from "@/components/ui/DecorativeDoodle";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { galleryPageContent } from "@/data/gallery-page";
import { getResolvedGalleryPhotos } from "@/lib/gallery";
import { pageMetadata } from "@/lib/site-metadata";

export const metadata = pageMetadata("Memory gallery");

export default function GalleryPage() {
  const photos = getResolvedGalleryPhotos();

  return (
    <main
      id="site-main"
      className="mx-auto flex w-full max-w-6xl flex-1 flex-col px-4 py-10 sm:px-6 sm:py-12"
    >
      <div className="relative section-reveal">
        <DojoRoofDecoration className="mb-3 text-karate-orange/85" />
        <DecorativeDoodle
          variant="flower"
          size={36}
          className="absolute -left-1 top-2 hidden text-mint sm:block"
        />
        <DecorativeDoodle
          variant="star"
          size={28}
          className="absolute -right-1 top-8 text-lavender"
        />
        <SectionHeading
          as="h1"
          title={galleryPageContent.title}
          className="relative max-w-2xl"
        />
      </div>
      <MemoryGallery photos={photos} />
    </main>
  );
}

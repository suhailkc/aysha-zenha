import { SectionHeading } from "@/components/ui/SectionHeading";

export default function GalleryPage() {
  return (
    <main className="mx-auto flex w-full max-w-3xl flex-1 flex-col px-4 py-12 sm:px-6">
      <SectionHeading
        as="h1"
        title="Memories"
        subtitle="The full photo gallery is coming next. For now, enjoy the scrapbook preview on the home page."
      />
    </main>
  );
}

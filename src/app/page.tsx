import { GalleryPreviewSection } from "@/components/home/GalleryPreviewSection";
import { HeroSection } from "@/components/home/HeroSection";
import { LoveNotesPreviewSection } from "@/components/home/LoveNotesPreviewSection";
import { MiniIntroSection } from "@/components/home/MiniIntroSection";

export default function Home() {
  return (
    <main id="site-main" className="flex flex-1 flex-col">
      <HeroSection />
      <MiniIntroSection />
      <GalleryPreviewSection />
      <LoveNotesPreviewSection />
    </main>
  );
}

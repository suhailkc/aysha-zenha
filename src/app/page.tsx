import { GalleryPreviewSection } from "@/components/home/GalleryPreviewSection";
import { HeroSection } from "@/components/home/HeroSection";
import { LoveNotesPreviewSection } from "@/components/home/LoveNotesPreviewSection";
import { MiniIntroSection } from "@/components/home/MiniIntroSection";
import { KarateCornerSection } from "@/components/karate/KarateCornerSection";

export default function Home() {
  return (
    <main id="site-main" className="flex flex-1 flex-col">
      <HeroSection />
      <KarateCornerSection />
      <MiniIntroSection />
      <GalleryPreviewSection />
      <LoveNotesPreviewSection />
    </main>
  );
}

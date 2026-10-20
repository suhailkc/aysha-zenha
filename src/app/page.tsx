import { GalleryPreviewSection } from "@/components/home/GalleryPreviewSection";
import { HeroSection } from "@/components/home/HeroSection";
import { LoveNotesPreviewSection } from "@/components/home/LoveNotesPreviewSection";
import { KarateCornerSection } from "@/components/karate/KarateCornerSection";
import { KarateRoadmapSection } from "@/components/karate/KarateRoadmapSection";

export default function Home() {
  return (
    <main id="site-main" className="flex flex-1 flex-col">
      <HeroSection />
      <KarateCornerSection />
      <KarateRoadmapSection />
      <GalleryPreviewSection />
      <LoveNotesPreviewSection />
    </main>
  );
}

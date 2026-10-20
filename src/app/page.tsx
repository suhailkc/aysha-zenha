import { FunZonePreviewSection } from "@/components/home/FunZonePreviewSection";
import { GalleryPreviewSection } from "@/components/home/GalleryPreviewSection";
import { HeroSection } from "@/components/home/HeroSection";
import { LoveNotesPreviewSection } from "@/components/home/LoveNotesPreviewSection";
import { MiniIntroSection } from "@/components/home/MiniIntroSection";

export default function Home() {
  return (
    <main className="flex flex-1 flex-col">
      <HeroSection />
      <MiniIntroSection />
      <GalleryPreviewSection />
      <FunZonePreviewSection />
      <LoveNotesPreviewSection />
    </main>
  );
}

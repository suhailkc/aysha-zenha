import { SurprisesExperience } from "@/components/surprises/SurprisesExperience";
import { pageMetadata } from "@/lib/site-metadata";

export const metadata = pageMetadata(
  "Little surprises",
  "Playful buttons, envelope notes, sticker jokes, and a tiny confetti moment.",
);

export default function SurprisesPage() {
  return (
    <main id="site-main" className="flex flex-1 flex-col">
      <SurprisesExperience />
    </main>
  );
}

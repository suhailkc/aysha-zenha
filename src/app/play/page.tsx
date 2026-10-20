import { FunZoneExperience } from "@/components/play/FunZoneExperience";
import { pageMetadata } from "@/lib/site-metadata";

export const metadata = pageMetadata(
  "Fun Zone",
  "Playful quizzes, silly superpowers, and quick giggle challenges in Aysha's Little Universe.",
);

export default function PlayPage() {
  return (
    <main id="site-main" className="flex flex-1 flex-col">
      <FunZoneExperience />
    </main>
  );
}

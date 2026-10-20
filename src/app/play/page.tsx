import { FunZoneExperience } from "@/components/play/FunZoneExperience";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Fun Zone",
  description:
    "Playful quizzes, silly superpowers, and quick giggle challenges in Aysha's Little Universe.",
};

export default function PlayPage() {
  return (
    <main className="flex flex-1 flex-col">
      <FunZoneExperience />
    </main>
  );
}

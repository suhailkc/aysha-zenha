import { SurprisesExperience } from "@/components/surprises/SurprisesExperience";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Little surprises",
  description:
    "Playful buttons, envelope notes, sticker jokes, and a tiny confetti moment.",
};

export default function SurprisesPage() {
  return (
    <main className="flex flex-1 flex-col">
      <SurprisesExperience />
    </main>
  );
}

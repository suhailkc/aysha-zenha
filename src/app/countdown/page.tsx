import { SectionHeading } from "@/components/ui/SectionHeading";

export default function CountdownPage() {
  return (
    <main className="mx-auto flex w-full max-w-3xl flex-1 flex-col px-4 py-12 sm:px-6">
      <SectionHeading
        as="h1"
        title="Birthday"
        subtitle="Countdown and birthday-day magic will live here. Set month and day in site config when the family is ready."
      />
    </main>
  );
}

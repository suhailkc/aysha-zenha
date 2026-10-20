import { SectionHeading } from "@/components/ui/SectionHeading";

export default function PlayPage() {
  return (
    <main className="mx-auto flex w-full max-w-3xl flex-1 flex-col px-4 py-12 sm:px-6">
      <SectionHeading
        as="h1"
        title="Fun Zone"
        subtitle="Games and quizzes will land here soon. The homepage teaser is ready when you are."
      />
    </main>
  );
}

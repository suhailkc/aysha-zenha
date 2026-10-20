import { SectionHeading } from "@/components/ui/SectionHeading";

export default function MessagesPage() {
  return (
    <main className="mx-auto flex w-full max-w-3xl flex-1 flex-col px-4 py-12 sm:px-6">
      <SectionHeading
        as="h1"
        title="Love Notes"
        subtitle="The full message wall is on the way. Edit src/data/messages.json to add real notes from the family."
      />
    </main>
  );
}

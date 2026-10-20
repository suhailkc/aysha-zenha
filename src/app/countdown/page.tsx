import { BirthdayCountdownSection } from "@/components/countdown/BirthdayCountdownSection";

export default function CountdownPage() {
  return (
    <main className="mx-auto flex w-full max-w-3xl flex-1 flex-col px-4 py-12 sm:px-6">
      <BirthdayCountdownSection />
    </main>
  );
}

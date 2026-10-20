import { BirthdayCountdownSection } from "@/components/countdown/BirthdayCountdownSection";
import { pageMetadata } from "@/lib/site-metadata";

export const metadata = pageMetadata(
  "Birthday countdown",
  "Count sleeps until Aysha Day — month and day only, no birth year in the UI.",
);

export default function CountdownPage() {
  return (
    <main
      id="site-main"
      className="mx-auto flex w-full max-w-3xl flex-1 flex-col px-4 py-12 sm:px-6"
    >
      <BirthdayCountdownSection />
    </main>
  );
}

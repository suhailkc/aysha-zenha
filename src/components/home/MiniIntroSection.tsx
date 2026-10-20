import { PaperCard } from "@/components/ui/PaperCard";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Sticker } from "@/components/ui/Sticker";
import { homeContent } from "@/data/home";

export function MiniIntroSection() {
  const { intro } = homeContent;

  return (
    <section
      aria-labelledby="intro-heading"
      className="mx-auto w-full max-w-6xl px-4 py-8 sm:px-6 sm:py-10"
    >
      <SectionHeading
        as="h2"
        headingId="intro-heading"
        title={intro.heading}
        align="center"
        className="mx-auto max-w-2xl"
      />
      <ul className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {intro.labels.map((label) => (
          <li key={label.id}>
            <PaperCard
              elevated
              className="flex h-full flex-col gap-3 overflow-visible"
            >
              <Sticker accent={label.accent} tilt={label.tilt}>
                {label.title}
              </Sticker>
              <p className="text-sm leading-relaxed text-secondary sm:text-base">
                {label.description}
              </p>
            </PaperCard>
          </li>
        ))}
      </ul>
    </section>
  );
}

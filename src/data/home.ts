/** Homepage copy and humorous labels — edit freely; keep labels clearly playful, not factual. */

export type IntroLabel = {
  id: string;
  title: string;
  description: string;
  accent: "lavender" | "bubblegum" | "mint" | "butter" | "orange";
  tilt: "left" | "right" | "none";
};

export const homeContent = {
  hero: {
    headline: "Welcome to my little universe!",
    supporting: "Big dreams. Tiny human. Unlimited giggles.",
    badge: "Officially unofficial headquarters of fun",
    exploreMemoriesLabel: "Explore my memories",
    surpriseLabel: "Surprise me!",
    /** Family-authored alt for hero.webp — no school, address, or full DOB. */
    portraitAlt:
      "Aysha in a scrapbook-style portrait — replace this text in src/data/home.ts when you set the hero photo.",
  },
  intro: {
    heading: "A little person with a LOT of personality",
    labels: [
      {
        id: "giggle-officer",
        title: "Chief Giggle Officer",
        description: "Promoted for excellence in snort-laughs and surprise snuggles.",
        accent: "bubblegum",
        tilt: "right",
      },
      {
        id: "daydreamer",
        title: "Professional Daydreamer",
        description: "Currently accepting applications for imaginary adventures.",
        accent: "lavender",
        tilt: "left",
      },
      {
        id: "big-ideas",
        title: "Collector of Big Ideas",
        description: "Storage method: sticky notes, doodles, and dramatic announcements.",
        accent: "mint",
        tilt: "right",
      },
    ] satisfies IntroLabel[],
  },
  /** Karate Corner on homepage — verified belt fact only; UI ships in a later phase. */
  karateCorner: {
    heading: "Karate Corner",
    badgeTitle: "Orange Belt Champion",
    tagline: "Little warrior. Big determination.",
    values: ["Focus", "Discipline", "Courage"] as const,
    photoAlt:
      "Aysha in karate gear — replace with family-approved alt when a public karate photo is added.",
    ctaLabel: "See my Karate Journey",
    ctaHref: "/karate",
  },
  galleryPreview: {
    heading: "Little moments, BIG memories",
    subtitle:
      "Peek at a few favorite frames from the scrapbook wall — everyday giggles, adventures, and approved karate snapshots when you add them.",
    cta: "Explore all memories",
  },
  loveNotes: {
    heading: "Tiny notes, giant hugs",
    subtitle: "Love letters from the people who cheer the loudest.",
  },
} as const;


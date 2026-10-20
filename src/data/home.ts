/** Homepage copy and humorous labels — edit freely; keep labels clearly playful, not factual. */

export const homeContent = {
  hero: {
    headline: "Welcome to my little universe!",
    supporting: "Big dreams. Tiny human. Unlimited giggles.",
    badge: "Officially unofficial headquarters of fun",
    exploreMemoriesLabel: "Explore my memories",
    /** Family-authored alt for hero.webp — no school, address, or full DOB. */
    portraitAlt:
      "Aysha in a scrapbook-style portrait — replace this text in src/data/home.ts when you set the hero photo.",
  },
  /** Karate Corner on homepage — verified belt fact only. */
  karateCorner: {
    heading: "Welcome to the Dojo of Dreams!",
    supporting: "Focus, courage, practice and a little bit of sparkle.",
    badgeTitle: "Orange Belt Champion",
    tagline: "Little warrior. Big determination.",
    cardBlurb:
      "Aysha loves karate. Her latest belt is Orange Belt, celebrated here with stickers, not scoreboards.",
    values: ["Focus", "Discipline", "Courage"] as const,
    ctaLabel: "Karate Journey",
    ctaHref: "#karate-roadmap",
    memoriesLabel: "Explore my memories",
    memoriesHref: "/gallery",
  },
  heroKarate: {
    editionSticker: "The Little Warrior Edition",
    championLabel: "Orange Belt Champion",
    dojoLinkLabel: "Karate Journey",
    dojoLinkHref: "#karate-roadmap",
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


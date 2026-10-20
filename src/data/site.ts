/** Site-wide copy and config. Replace placeholders with family-authored text only. */

import { ayshaBirthday } from "@/config/birthday";

export type NavItem = {
  href: string;
  label: string;
};

export const siteConfig = {
  projectName: "Aysha's Little Universe",
  displayName: "Aysha Zenha",
  /** Short line for hero; family to fill in later. */
  tagline: "A little corner of the internet, made just for you.",
  nav: [
    { href: "/", label: "Home" },
    { href: "/gallery", label: "Memories" },
    { href: "/surprises", label: "Surprises" },
    { href: "/play", label: "Fun Zone" },
    { href: "/countdown", label: "Birthday" },
    { href: "/messages", label: "Love Notes" },
    { href: "/scrapbook", label: "Scrapbook" },
  ] satisfies NavItem[],
  footerMessage: "Made with extra sprinkles and lots of love.",
  /** Countdown uses month/day only. Source of truth: `@/config/birthday`. */
  birthdayMonth: ayshaBirthday.month,
  birthdayDay: ayshaBirthday.day,
} as const;

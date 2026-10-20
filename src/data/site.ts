/** Site-wide copy and config. Replace placeholders with family-authored text only. */

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
  ] satisfies NavItem[],
  footerMessage: "Made with extra sprinkles and lots of love.",
  /**
   * Countdown uses month/day only (1–12 / 1–31). Do not expose full date of birth in the UI.
   * Set when the family confirms values for countdown and birthday mode.
   */
  birthdayMonth: null as number | null,
  birthdayDay: null as number | null,
} as const;

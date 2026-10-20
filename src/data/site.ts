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
  ] satisfies NavItem[],
  footerMessage: "Made with extra sprinkles and lots of love.",
} as const;

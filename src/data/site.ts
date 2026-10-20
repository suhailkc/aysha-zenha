/** Site-wide copy and config. Replace placeholders with family-authored text only. */

export type SiteNavItem = {
  id: string;
  label: string;
  href: string;
  /** Short label for compact bottom navigation. */
  shortLabel: string;
};

export const siteConfig = {
  displayName: "Aysha Zenha",
  /** Short line for hero; family to fill in later. */
  tagline: "A little corner of the internet, made just for you.",
  footerMessage: "Made with extra sprinkles and lots of love.",
  /**
   * Primary destinations — hash links resolve on `/`; from other routes they
   * open the home page at the right section.
   */
  navigation: [
    { id: "home", label: "Home", shortLabel: "Home", href: "/" },
    {
      id: "karate",
      label: "Karate Journey",
      shortLabel: "Karate",
      href: "/#karate-roadmap",
    },
    {
      id: "memories",
      label: "Memories",
      shortLabel: "Memories",
      href: "/#memories-preview",
    },
    { id: "gallery", label: "Gallery", shortLabel: "Gallery", href: "/gallery" },
  ] as const satisfies readonly SiteNavItem[],
} as const;

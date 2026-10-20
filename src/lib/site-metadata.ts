import type { Metadata } from "next";

const siteDescription =
  "A personal birthday gift site for Aysha Zenha — memories, love notes, and little joys.";

function resolveMetadataBase(): URL {
  const explicit = process.env.NEXT_PUBLIC_SITE_URL;
  if (explicit) {
    return new URL(explicit);
  }
  const vercel = process.env.VERCEL_URL;
  if (vercel) {
    return new URL(`https://${vercel}`);
  }
  return new URL("http://localhost:3000");
}

/** Shared metadata: private site — ask search engines not to index (not access control). */
export const rootSiteMetadata: Metadata = {
  metadataBase: resolveMetadataBase(),
  title: {
    default: "Aysha's Little Universe",
    template: "%s · Aysha's Little Universe",
  },
  description: siteDescription,
  robots: {
    index: false,
    follow: false,
    nocache: true,
    googleBot: {
      index: false,
      follow: false,
      noimageindex: true,
    },
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    title: "Aysha's Little Universe",
    description: siteDescription,
    images: [
      {
        url: "/og-illustration.svg",
        width: 1200,
        height: 630,
        alt: "Scrapbook-style stars and hearts — no photographs",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Aysha's Little Universe",
    description: siteDescription,
    images: ["/og-illustration.svg"],
  },
};

export function pageMetadata(title: string, description?: string): Metadata {
  return {
    title,
    ...(description ? { description } : {}),
  };
}

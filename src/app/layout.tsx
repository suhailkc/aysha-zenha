import { ScrapbookShell } from "@/components/layout/ScrapbookShell";
import { fontVariables } from "@/lib/fonts";
import { rootSiteMetadata } from "@/lib/site-metadata";
import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = rootSiteMetadata;

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  themeColor: "#fff9f0",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${fontVariables} h-full antialiased`}>
      <body className="min-h-full">
        <ScrapbookShell>{children}</ScrapbookShell>
      </body>
    </html>
  );
}

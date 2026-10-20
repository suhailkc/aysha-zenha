import { ScrapbookShell } from "@/components/layout/ScrapbookShell";
import { fontVariables } from "@/lib/fonts";
import { rootSiteMetadata } from "@/lib/site-metadata";
import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = rootSiteMetadata;

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${fontVariables} h-full antialiased`}>
      <body className="min-h-full">
        <ScrapbookShell>{children}</ScrapbookShell>
      </body>
    </html>
  );
}

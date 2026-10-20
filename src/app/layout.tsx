import { ScrapbookShell } from "@/components/layout/ScrapbookShell";
import { fontVariables } from "@/lib/fonts";
import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Aysha's Little Universe",
  description:
    "A personal birthday gift site for Aysha Zenha — gallery, surprises, and little joys.",
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

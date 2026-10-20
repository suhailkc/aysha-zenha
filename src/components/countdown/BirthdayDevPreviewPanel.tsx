"use client";

import { PaperCard } from "@/components/ui/PaperCard";
import { SecondaryButton } from "@/components/ui/SecondaryButton";
import { countdownContent } from "@/data/countdown";
import { birthdayPreviewQuery } from "@/lib/birthday-preview";
import Link from "next/link";

const previewLinks = [
  { label: "Live date", href: "/countdown" },
  { label: "30 sleeps", href: `/countdown${birthdayPreviewQuery(30)}` },
  { label: "1 sleep (eve)", href: `/countdown${birthdayPreviewQuery("eve")}` },
  { label: "Aysha Day", href: `/countdown${birthdayPreviewQuery("birthday")}` },
] as const;

export function BirthdayDevPreviewPanel() {
  if (process.env.NODE_ENV === "production") {
    return null;
  }

  return (
    <PaperCard
      padding="sm"
      className="mt-8 border border-dashed border-plum/20 bg-white/60"
    >
      <p className="font-display text-sm font-semibold text-plum">
        {countdownContent.devPreviewTitle}
      </p>
      <p className="mt-1 text-xs text-secondary">
        {countdownContent.devPreviewHint}
      </p>
      <ul className="mt-3 flex flex-wrap gap-2">
        {previewLinks.map((item) => (
          <li key={item.href}>
            <SecondaryButton href={item.href} className="text-xs">
              {item.label}
            </SecondaryButton>
          </li>
        ))}
      </ul>
      <p className="mt-3 text-xs text-secondary">
        Or add{" "}
        <code className="rounded bg-cream px-1 py-0.5 text-plum">
          ?birthdayPreview=14
        </code>{" "}
        for any sleep count (2–366).{" "}
        <Link href="/countdown" className="font-semibold text-plum underline-offset-2 hover:underline">
          Clear preview
        </Link>
      </p>
    </PaperCard>
  );
}

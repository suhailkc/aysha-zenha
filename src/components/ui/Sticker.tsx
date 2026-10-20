import { cn } from "@/lib/cn";
import type { ReactNode } from "react";

export type StickerAccent = "lavender" | "bubblegum" | "mint" | "butter" | "orange";

type StickerProps = {
  children: ReactNode;
  accent?: StickerAccent;
  tilt?: "left" | "right" | "none";
  className?: string;
};

const accentStyles: Record<StickerAccent, string> = {
  lavender: "bg-lavender text-plum",
  bubblegum: "bg-bubblegum text-plum",
  mint: "bg-mint text-plum",
  butter: "bg-butter text-plum",
  orange: "bg-karate-orange/90 text-plum border-deep-orange/25",
};

const tiltStyles = {
  left: "-rotate-3",
  right: "rotate-2",
  none: "",
} as const;

export function Sticker({
  children,
  accent = "lavender",
  tilt = "left",
  className,
}: StickerProps) {
  return (
    <span
      className={cn(
        "inline-block rounded-scrapbook-sm px-3 py-1 font-display text-sm font-semibold tracking-wide",
        "border border-plum/10 shadow-[var(--shadow-sticker)]",
        accentStyles[accent],
        tiltStyles[tilt],
        className,
      )}
    >
      {children}
    </span>
  );
}

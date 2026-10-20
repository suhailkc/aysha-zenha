import { IconAward, IconShield, IconTarget } from "@/components/karate/KarateIcons";
import { cn } from "@/lib/cn";
import type { ReactNode } from "react";

export type KarateValueId = "Focus" | "Discipline" | "Courage";

const valueIcons: Record<KarateValueId, ReactNode> = {
  Focus: <IconTarget className="text-karate-orange" size={18} />,
  Discipline: <IconShield className="text-deep-orange" size={18} />,
  Courage: <IconAward className="text-karate-orange" size={18} />,
};

type KarateValueBadgeProps = {
  label: KarateValueId;
  className?: string;
};

export function KarateValueBadge({ label, className }: KarateValueBadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex min-h-11 items-center gap-2 rounded-scrapbook-pill",
        "border border-plum/12 bg-white/75 px-4 py-2 font-display text-sm font-semibold text-plum",
        "shadow-[var(--shadow-paper)] transition-[transform,box-shadow] duration-200",
        "hover:-translate-y-0.5 hover:shadow-[var(--shadow-paper-lifted)]",
        className,
      )}
    >
      {valueIcons[label]}
      {label}
    </span>
  );
}

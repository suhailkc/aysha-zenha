import { cn } from "@/lib/cn";
import type { ReactNode } from "react";

type SectionHeadingProps = {
  title: string;
  subtitle?: ReactNode;
  as?: "h1" | "h2" | "h3";
  align?: "left" | "center";
  className?: string;
  /** Applied to the heading element for `aria-labelledby` on sections. */
  headingId?: string;
};

export function SectionHeading({
  title,
  subtitle,
  as: Tag = "h2",
  align = "left",
  className,
  headingId,
}: SectionHeadingProps) {
  return (
    <header
      className={cn(
        "space-y-2",
        align === "center" && "text-center",
        className,
      )}
    >
      <Tag
        id={headingId}
        className={cn(
          "font-display font-semibold tracking-tight text-plum",
          Tag === "h1" &&
            "text-4xl leading-tight text-balance sm:text-5xl md:text-6xl",
          Tag === "h2" && "text-3xl leading-snug sm:text-4xl",
          Tag === "h3" && "text-2xl leading-snug sm:text-3xl",
        )}
      >
        {title}
      </Tag>
      {subtitle ? (
        <p
          className={cn(
            "max-w-prose text-base leading-relaxed text-secondary sm:text-lg",
            align === "center" && "mx-auto",
          )}
        >
          {subtitle}
        </p>
      ) : null}
    </header>
  );
}

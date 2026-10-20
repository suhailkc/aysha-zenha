import { cn } from "@/lib/cn";
import type { ReactNode } from "react";

export type DoodleVariant =
  | "star"
  | "flower"
  | "sparkle"
  | "heart"
  | "planet"
  | "smiley";

type DecorativeDoodleProps = {
  variant: DoodleVariant;
  className?: string;
  size?: number;
};

const paths: Record<DoodleVariant, ReactNode> = {
  star: (
    <path
      fill="currentColor"
      d="M12 2l2.4 7.4H22l-6.2 4.5 2.4 7.4L12 17.8 5.8 21.3l2.4-7.4L2 9.4h7.6L12 2z"
    />
  ),
  heart: (
    <path
      fill="currentColor"
      d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"
    />
  ),
  sparkle: (
    <>
      <path
        fill="currentColor"
        d="M12 0l1.2 4.8L18 6l-4.8 1.2L12 12l-1.2-4.8L6 6l4.8-1.2L12 0z"
      />
      <circle cx="19" cy="17" r="1.5" fill="currentColor" />
      <circle cx="4" cy="14" r="1" fill="currentColor" />
    </>
  ),
  planet: (
    <>
      <circle cx="12" cy="13" r="7" fill="currentColor" opacity="0.9" />
      <ellipse
        cx="12"
        cy="13"
        rx="10"
        ry="3"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        opacity="0.75"
        transform="rotate(-18 12 13)"
      />
      <circle cx="9" cy="10" r="1.2" fill="var(--color-cream)" opacity="0.85" />
    </>
  ),
  smiley: (
    <>
      <circle cx="12" cy="12" r="9" fill="currentColor" />
      <circle cx="9" cy="10" r="1.2" fill="var(--color-plum)" />
      <circle cx="15" cy="10" r="1.2" fill="var(--color-plum)" />
      <path
        d="M8.5 14.5c1.2 1.8 2.8 2.7 3.5 2.7s2.3-.9 3.5-2.7"
        fill="none"
        stroke="var(--color-plum)"
        strokeWidth="1.3"
        strokeLinecap="round"
      />
    </>
  ),
  flower: (
    <>
      <circle cx="12" cy="12" r="3" fill="currentColor" />
      <ellipse
        cx="12"
        cy="6"
        rx="3.5"
        ry="4.5"
        fill="currentColor"
        opacity="0.85"
      />
      <ellipse
        cx="12"
        cy="18"
        rx="3.5"
        ry="4.5"
        fill="currentColor"
        opacity="0.85"
      />
      <ellipse
        cx="6"
        cy="12"
        rx="4.5"
        ry="3.5"
        fill="currentColor"
        opacity="0.85"
      />
      <ellipse
        cx="18"
        cy="12"
        rx="4.5"
        ry="3.5"
        fill="currentColor"
        opacity="0.85"
      />
    </>
  ),
};

export function DecorativeDoodle({
  variant,
  className,
  size = 24,
}: DecorativeDoodleProps) {
  return (
    <svg
      aria-hidden
      width={size}
      height={size}
      viewBox="0 0 24 24"
      className={cn("pointer-events-none shrink-0", className)}
    >
      {paths[variant]}
    </svg>
  );
}

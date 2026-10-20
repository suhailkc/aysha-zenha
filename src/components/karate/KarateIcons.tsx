import { cn } from "@/lib/cn";

type IconProps = {
  className?: string;
  size?: number;
};

/** Decorative inline icons (no lucide dependency). */
export function IconShield({ className, size = 20 }: IconProps) {
  return (
    <svg
      aria-hidden
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      className={cn("shrink-0", className)}
    >
      <path
        d="M12 2.5l7 3v6.5c0 5.2-3.5 9.8-7 11-3.5-1.2-7-5.8-7-11V5.5l7-3z"
        fill="currentColor"
        opacity="0.85"
      />
      <path
        d="M9 12l2 2 4-4"
        stroke="var(--color-cream)"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function IconTarget({ className, size = 20 }: IconProps) {
  return (
    <svg
      aria-hidden
      width={size}
      height={size}
      viewBox="0 0 24 24"
      className={cn("shrink-0", className)}
    >
      <circle cx="12" cy="12" r="9" fill="none" stroke="currentColor" strokeWidth="1.5" />
      <circle cx="12" cy="12" r="5.5" fill="none" stroke="currentColor" strokeWidth="1.5" />
      <circle cx="12" cy="12" r="2" fill="currentColor" />
    </svg>
  );
}

export function IconAward({ className, size = 20 }: IconProps) {
  return (
    <svg
      aria-hidden
      width={size}
      height={size}
      viewBox="0 0 24 24"
      className={cn("shrink-0", className)}
    >
      <circle cx="12" cy="9" r="5.5" fill="currentColor" />
      <path
        d="M8.5 14.5L7 21l5-2.5L17 21l-1.5-6.5"
        fill="currentColor"
        opacity="0.9"
      />
    </svg>
  );
}

export function IconStarBadge({ className, size = 20 }: IconProps) {
  return (
    <svg
      aria-hidden
      width={size}
      height={size}
      viewBox="0 0 24 24"
      className={cn("shrink-0", className)}
    >
      <path
        fill="currentColor"
        d="M12 2l2.4 7.4H22l-6.2 4.5 2.4 7.4L12 17.8 5.8 21.3l2.4-7.4L2 9.4h7.6L12 2z"
      />
    </svg>
  );
}

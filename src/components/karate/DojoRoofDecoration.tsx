import { cn } from "@/lib/cn";

type DojoRoofDecorationProps = {
  className?: string;
};

/** Simple dojo roof silhouette for scrapbook section headers. */
export function DojoRoofDecoration({ className }: DojoRoofDecorationProps) {
  return (
    <svg
      aria-hidden
      viewBox="0 0 140 36"
      className={cn("h-8 w-auto text-karate-orange/90", className)}
    >
      <path
        fill="currentColor"
        d="M70 4L8 28h8l54-18 54 18h8L70 4z"
      />
      <rect x="52" y="26" width="36" height="8" rx="1" fill="var(--color-lavender)" opacity="0.85" />
      <rect x="62" y="28" width="16" height="6" rx="0.5" fill="var(--color-cream)" opacity="0.9" />
    </svg>
  );
}

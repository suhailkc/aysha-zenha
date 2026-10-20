import { cn } from "@/lib/cn";

export type BeltIllustrationProps = {
  beltColor?: string;
  shadowColor?: string;
  className?: string;
  interactive?: boolean;
  /** Accessible name when the belt conveys meaning (omit for purely decorative use) */
  label?: string;
  /** Unique id prefix for SVG defs when multiple belts appear on one page */
  idSuffix?: string;
};

/** Scrapbook-style karate belt with knot — original inline SVG. */
export function BeltIllustration({
  beltColor = "#F28C28",
  shadowColor = "#C96319",
  className,
  interactive = false,
  label,
  idSuffix = "default",
}: BeltIllustrationProps) {
  const gradId = `belt-grad-${idSuffix}`;
  const shadowId = `belt-shadow-${idSuffix}`;
  const fabricId = `belt-fabric-${idSuffix}`;
  const isLightBelt = beltColor.toLowerCase() === "#f5f5f4" || beltColor === "#fff" || beltColor === "#ffffff";

  return (
    <svg
      viewBox="0 0 120 48"
      role={label ? "img" : undefined}
      aria-hidden={label ? undefined : true}
      aria-label={label}
      className={cn(
        "h-auto w-[4.25rem] shrink-0 sm:w-[5rem]",
        interactive && "orange-belt-sway",
        className,
      )}
    >
      <defs>
        <linearGradient id={gradId} x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor={beltColor} />
          <stop offset="45%" stopColor={beltColor} stopOpacity="0.92" />
          <stop offset="100%" stopColor={shadowColor} />
        </linearGradient>
        <linearGradient id={shadowId} x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor={shadowColor} stopOpacity="0.35" />
          <stop offset="100%" stopColor="#382B4A" stopOpacity="0.12" />
        </linearGradient>
        <pattern
          id={fabricId}
          width="4"
          height="4"
          patternUnits="userSpaceOnUse"
          patternTransform="rotate(12)"
        >
          <line x1="0" y1="0" x2="0" y2="4" stroke={shadowColor} strokeWidth="0.35" opacity="0.18" />
        </pattern>
      </defs>
      <path
        d="M4 22h38c2 0 3 1.2 3 3v2c0 1.8-1 3-3 3H8c-3 0-5-2-4-5l2-3z"
        fill={`url(#${gradId})`}
        stroke={shadowColor}
        strokeWidth={isLightBelt ? 1.4 : 1}
      />
      <path
        d="M78 22h38c3 0 5 2 4 5l-2 3c-1 3-3 5-6 5H81c-2 0-3-1.2-3-3v-2c0-1.8 1-3 3-3z"
        fill={`url(#${gradId})`}
        stroke={shadowColor}
        strokeWidth={isLightBelt ? 1.4 : 1}
      />
      <rect
        x="18"
        y="20"
        width="84"
        height="10"
        rx="2"
        fill={`url(#${gradId})`}
        stroke={shadowColor}
        strokeWidth={isLightBelt ? 1.4 : 1}
      />
      <rect x="18" y="20" width="84" height="10" rx="2" fill={`url(#${fabricId})`} opacity="0.55" />
      <ellipse
        cx="60"
        cy="25"
        rx="11"
        ry="9"
        fill={`url(#${gradId})`}
        stroke={shadowColor}
        strokeWidth={isLightBelt ? 1.4 : 1.2}
      />
      <path
        d="M52 25c0-4 3.5-7 8-7s8 3 8 7c0 3-2 5.5-5 6.5l-3 4.5-3-4.5c-3-1-5-3.5-5-6.5z"
        fill={beltColor}
        stroke={shadowColor}
        strokeWidth="0.8"
        opacity="0.95"
      />
      <path
        d="M56 31v6M64 31v5"
        stroke={shadowColor}
        strokeWidth="1.4"
        strokeLinecap="round"
      />
      <path
        d="M54 34l-4 8 3 1 5-7M66 34l4 8-3 1-5-7"
        fill={`url(#${gradId})`}
        stroke={shadowColor}
        strokeWidth="0.9"
        strokeLinejoin="round"
      />
      <rect x="20" y="29" width="80" height="3" rx="1" fill={`url(#${shadowId})`} opacity="0.5" />
    </svg>
  );
}

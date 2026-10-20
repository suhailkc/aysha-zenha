import { cn } from "@/lib/cn";

type OrangeBeltIllustrationProps = {
  className?: string;
  /** Enable subtle ribbon sway on hover/focus-within of parent group */
  interactive?: boolean;
};

/** Original sticker-style orange karate belt with a recognizable knot. */
export function OrangeBeltIllustration({
  className,
  interactive = true,
}: OrangeBeltIllustrationProps) {
  return (
    <svg
      aria-hidden
      viewBox="0 0 120 48"
      className={cn(
        "h-auto w-[5.5rem] sm:w-[6.25rem]",
        interactive && "orange-belt-sway",
        className,
      )}
    >
      <defs>
        <linearGradient id="belt-orange" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#F28C28" />
          <stop offset="45%" stopColor="#FFB347" />
          <stop offset="100%" stopColor="#C96319" />
        </linearGradient>
        <linearGradient id="belt-shadow" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#C96319" stopOpacity="0.35" />
          <stop offset="100%" stopColor="#382B4A" stopOpacity="0.12" />
        </linearGradient>
      </defs>
      {/* Belt tail left */}
      <path
        d="M4 22h38c2 0 3 1.2 3 3v2c0 1.8-1 3-3 3H8c-3 0-5-2-4-5l2-3z"
        fill="url(#belt-orange)"
        stroke="#C96319"
        strokeWidth="1"
      />
      {/* Belt tail right */}
      <path
        d="M78 22h38c3 0 5 2 4 5l-2 3c-1 3-3 5-6 5H81c-2 0-3-1.2-3-3v-2c0-1.8 1-3 3-3z"
        fill="url(#belt-orange)"
        stroke="#C96319"
        strokeWidth="1"
      />
      {/* Main band */}
      <rect
        x="18"
        y="20"
        width="84"
        height="10"
        rx="2"
        fill="url(#belt-orange)"
        stroke="#C96319"
        strokeWidth="1"
      />
      {/* Knot center */}
      <ellipse cx="60" cy="25" rx="11" ry="9" fill="url(#belt-orange)" stroke="#C96319" strokeWidth="1.2" />
      <path
        d="M52 25c0-4 3.5-7 8-7s8 3 8 7c0 3-2 5.5-5 6.5l-3 4.5-3-4.5c-3-1-5-3.5-5-6.5z"
        fill="#E67E22"
        stroke="#C96319"
        strokeWidth="0.8"
      />
      <path
        d="M56 31v6M64 31v5"
        stroke="#C96319"
        strokeWidth="1.4"
        strokeLinecap="round"
      />
      {/* Hanging ends from knot */}
      <path
        d="M54 34l-4 8 3 1 5-7M66 34l4 8-3 1-5-7"
        fill="url(#belt-orange)"
        stroke="#C96319"
        strokeWidth="0.9"
        strokeLinejoin="round"
      />
      <rect x="20" y="29" width="80" height="3" rx="1" fill="url(#belt-shadow)" opacity="0.5" />
    </svg>
  );
}

import type { BeltIllustrationTheme } from "@/data/karate-roadmap";
import { cn } from "@/lib/cn";

type BeltStageSceneProps = {
  theme: BeltIllustrationTheme;
  className?: string;
};

/** Small thematic doodles beside each belt marker — decorative only. */
export function BeltStageScene({ theme, className }: BeltStageSceneProps) {
  return (
    <svg
      aria-hidden
      viewBox="0 0 56 56"
      className={cn("h-11 w-11 shrink-0 opacity-90 sm:h-12 sm:w-12", className)}
    >
      {theme === "white-start" && (
        <>
          <rect x="8" y="36" width="12" height="14" rx="2" fill="#FFF9F0" stroke="#382B4A" strokeWidth="1" />
          <polygon points="14,28 20,22 26,28" fill="#F28C28" opacity="0.85" />
          <line x1="14" y1="40" x2="14" y2="32" stroke="#C96319" strokeWidth="1.2" />
          <path d="M14 32 L18 30 L14 28 Z" fill="#FFE69A" />
        </>
      )}
      {theme === "yellow-sunshine" && (
        <>
          <circle cx="28" cy="26" r="12" fill="#FFE69A" opacity="0.85" />
          <circle cx="28" cy="26" r="7" fill="#FACC15" />
          {[0, 45, 90, 135].map((deg) => (
            <line
              key={deg}
              x1="28"
              y1="26"
              x2={28 + 16 * Math.cos((deg * Math.PI) / 180)}
              y2={26 + 16 * Math.sin((deg * Math.PI) / 180)}
              stroke="#FACC15"
              strokeWidth="2"
              strokeLinecap="round"
            />
          ))}
          <circle cx="42" cy="42" r="4" fill="#FFB6D5" />
        </>
      )}
      {theme === "orange-victory" && (
        <>
          <circle cx="28" cy="30" r="14" fill="#F28C28" opacity="0.2" />
          <polygon
            points="28,14 32,24 42,24 34,30 37,40 28,34 19,40 22,30 14,24 24,24"
            fill="#FFE69A"
            stroke="#C96319"
            strokeWidth="0.8"
          />
          <text x="28" y="32" textAnchor="middle" fontSize="7" fill="#382B4A" fontWeight="700">
            ★
          </text>
        </>
      )}
      {theme === "green-garden" && (
        <>
          <ellipse cx="28" cy="44" rx="20" ry="6" fill="#B8EBD2" opacity="0.6" />
          <path d="M28 44 C28 32 20 28 18 36 C22 30 28 32 28 44" fill="#22C55E" />
          <path d="M28 44 C28 30 36 26 38 34 C34 28 28 30 28 44" fill="#15803D" />
          <circle cx="40" cy="38" r="3" fill="#FFB6D5" />
        </>
      )}
      {theme === "blue-sky" && (
        <>
          <ellipse cx="20" cy="22" rx="14" ry="6" fill="#fff" opacity="0.9" />
          <ellipse cx="36" cy="18" rx="10" ry="5" fill="#fff" opacity="0.75" />
          <path
            d="M12 38 Q20 32 28 38 T44 36"
            fill="none"
            stroke="#3B82F6"
            strokeWidth="1.5"
            opacity="0.5"
          />
          <path d="M38 34 L42 36 L38 38 Z" fill="#3B82F6" opacity="0.7" />
        </>
      )}
      {theme === "brown-peak" && (
        <>
          <path d="M8 44 L28 18 L48 44 Z" fill="#92400E" opacity="0.35" />
          <path d="M18 44 L28 28 L38 44 Z" fill="#78350F" opacity="0.5" />
          <line x1="28" y1="18" x2="28" y2="10" stroke="#382B4A" strokeWidth="1.2" />
          <path d="M28 10 L34 14 L28 18 Z" fill="#FFE69A" />
        </>
      )}
      {theme === "black-summit" && (
        <>
          <ellipse cx="28" cy="46" rx="22" ry="7" fill="#FFE69A" opacity="0.45" />
          <polygon points="28,12 10,44 46,44" fill="#CDB8FF" stroke="#382B4A" strokeWidth="1" />
          <polygon points="28,24 18,44 38,44" fill="#1a1a1a" opacity="0.75" />
          <circle cx="40" cy="16" r="1.5" fill="#FFE69A" className="roadmap-summit-star" />
          <circle cx="46" cy="22" r="1.2" fill="#fff" className="roadmap-summit-star roadmap-summit-star--delay" />
        </>
      )}
    </svg>
  );
}

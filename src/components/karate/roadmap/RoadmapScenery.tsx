import { cn } from "@/lib/cn";

type RoadmapSceneryProps = {
  className?: string;
  variant?: "desktop" | "mobile";
};

/** Pastel hills, clouds, dojo, and summit art for the adventure map. */
export function RoadmapScenery({ className, variant = "desktop" }: RoadmapSceneryProps) {
  const isMobile = variant === "mobile";

  return (
    <svg
      aria-hidden
      className={cn("pointer-events-none absolute inset-0 h-full w-full", className)}
      preserveAspectRatio="none"
      viewBox={isMobile ? "0 0 320 980" : "0 0 1200 420"}
    >
      <defs>
        <linearGradient id="roadmap-sky" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#FFF9F0" />
          <stop offset="55%" stopColor="#CDB8FF" stopOpacity="0.22" />
          <stop offset="100%" stopColor="#B8EBD2" stopOpacity="0.35" />
        </linearGradient>
        <linearGradient id="summit-sunrise" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#FFE69A" stopOpacity="0.85" />
          <stop offset="100%" stopColor="#FFB6D5" stopOpacity="0.15" />
        </linearGradient>
      </defs>
      <rect width="100%" height="100%" fill="url(#roadmap-sky)" />

      <g fill="#fff" opacity="0.75">
        <ellipse cx={isMobile ? 70 : 180} cy={isMobile ? 48 : 52} rx="42" ry="16" />
        <ellipse cx={isMobile ? 95 : 210} cy={isMobile ? 44 : 48} rx="28" ry="12" />
        <ellipse cx={isMobile ? 250 : 920} cy={isMobile ? 72 : 64} rx="50" ry="18" />
        <ellipse cx={isMobile ? 285 : 960} cy={isMobile ? 66 : 58} rx="32" ry="14" />
      </g>

      <path
        d={
          isMobile
            ? "M0 780 Q80 740 160 770 T320 760 L320 980 L0 980 Z"
            : "M0 320 Q200 260 400 300 T800 280 L1200 310 L1200 420 L0 420 Z"
        }
        fill="#B8EBD2"
        opacity="0.55"
      />
      <path
        d={
          isMobile
            ? "M0 820 Q120 790 220 815 T320 800 L320 980 L0 980 Z"
            : "M0 350 Q280 300 560 340 T1200 330 L1200 420 L0 420 Z"
        }
        fill="#FFB6D5"
        opacity="0.35"
      />

      <g transform={isMobile ? "translate(24, 100) scale(0.85)" : "translate(28, 198)"}>
        <polygon points="0,28 44,0 88,28" fill="#F28C28" opacity="0.9" />
        <rect
          x="12"
          y="28"
          width="64"
          height="44"
          rx="4"
          fill="#FFF9F0"
          stroke="#382B4A"
          strokeWidth="1.2"
          opacity="0.95"
        />
        <rect x="36" y="48" width="16" height="24" rx="2" fill="#CDB8FF" opacity="0.7" />
        <line x1="44" y1="0" x2="44" y2="-8" stroke="#C96319" strokeWidth="2" />
        <polygon points="40,-8 44,-16 48,-8" fill="#FFE69A" />
      </g>

      <g
        className="roadmap-summit-glow"
        transform={isMobile ? "translate(200, 48)" : "translate(1040, 108)"}
      >
        <ellipse cx="40" cy="88" rx="56" ry="28" fill="url(#summit-sunrise)" opacity="0.65" />
        <polygon
          points={isMobile ? "40,20 8,95 72,95" : "40,10 0,100 80,100"}
          fill="#CDB8FF"
          stroke="#382B4A"
          strokeWidth="1.2"
          opacity="0.85"
        />
        <polygon
          points={isMobile ? "40,38 22,95 58,95" : "40,32 18,100 62,100"}
          fill="#382B4A"
          opacity="0.75"
        />
        <line x1="40" y1="10" x2="40" y2="-6" stroke="#382B4A" strokeWidth="1.5" />
        <path d="M40,-6 L58,-2 L40,2 Z" fill="#1a1a1a" />
        <rect x="46" y="-4" width="14" height="3" rx="1" fill="#1a1a1a" />
        <circle cx="52" cy="-2" r="2.5" fill="#333" />
        <circle cx="18" cy="20" r="1.5" fill="#FFE69A" className="roadmap-summit-star" />
        <circle cx="62" cy="28" r="1.2" fill="#fff" className="roadmap-summit-star roadmap-summit-star--delay" />
        <circle cx="8" cy="36" r="1" fill="#FFB6D5" className="roadmap-summit-star roadmap-summit-star--delay2" />
      </g>

      <g opacity="0.7">
        <circle cx={isMobile ? 280 : 640} cy={isMobile ? 720 : 360} r="3" fill="#FFB6D5" />
        <circle cx={isMobile ? 40 : 520} cy={isMobile ? 680 : 340} r="2.5" fill="#FFE69A" />
        <circle cx={isMobile ? 160 : 760} cy={isMobile ? 760 : 355} r="2.5" fill="#CDB8FF" />
      </g>
    </svg>
  );
}

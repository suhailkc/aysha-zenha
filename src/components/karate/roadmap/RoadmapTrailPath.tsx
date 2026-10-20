import { cn } from "@/lib/cn";

type RoadmapTrailPathProps = {
  variant: "desktop" | "mobile";
  className?: string;
  /** Brief sparkle animation along the path */
  sparkActive?: boolean;
  /** Play the draw-in animation when the map enters view */
  drawActive?: boolean;
};

/** Dotted adventure trail connecting all seven belt milestones. */
export function RoadmapTrailPath({
  variant,
  className,
  sparkActive = false,
  drawActive = false,
}: RoadmapTrailPathProps) {
  const isMobile = variant === "mobile";

  const pathD = isMobile
    ? "M160 56 C148 130, 172 210, 160 290 S148 430, 160 510 S172 650, 160 730 S148 870, 160 940"
    : "M40 215 C110 185, 195 235, 275 195 S430 155, 510 215 S665 265, 745 205 S905 165, 985 195 S1080 175, 1160 190";

  const stones = isMobile
    ? [
        [160, 56],
        [160, 210],
        [160, 360],
        [160, 510],
        [160, 660],
        [160, 810],
        [160, 940],
      ]
    : [
        [40, 215],
        [195, 208],
        [350, 198],
        [505, 218],
        [660, 248],
        [815, 208],
        [985, 195],
        [1155, 188],
      ];

  return (
    <svg
      aria-hidden
      className={cn(
        "pointer-events-none absolute inset-0 h-full w-full overflow-visible",
        sparkActive && "roadmap-trail-sparkle",
        className,
      )}
      preserveAspectRatio="none"
      viewBox={isMobile ? "0 0 320 980" : "0 0 1200 420"}
    >
      <path
        d={pathD}
        fill="none"
        stroke="#382B4A"
        strokeWidth={isMobile ? 3 : 4}
        strokeDasharray={isMobile ? "8 10" : "10 14"}
        strokeLinecap="round"
        opacity="0.28"
        pathLength={1}
        className={cn(drawActive && "roadmap-trail-draw roadmap-trail-draw--shadow")}
      />
      <path
        d={pathD}
        fill="none"
        stroke="#F28C28"
        strokeWidth={isMobile ? 2 : 2.5}
        strokeDasharray={isMobile ? "8 10" : "10 14"}
        strokeLinecap="round"
        opacity="0.45"
        pathLength={1}
        className={cn(
          "roadmap-trail-accent",
          drawActive && "roadmap-trail-draw roadmap-trail-draw--accent",
        )}
      />
      {stones.map(([cx, cy], i) => (
        <ellipse
          key={i}
          cx={cx}
          cy={cy}
          rx={isMobile ? 10 : 12}
          ry={isMobile ? 6 : 7}
          fill="#FFF9F0"
          stroke="#CDB8FF"
          strokeWidth="1.5"
          opacity="0.9"
        />
      ))}
    </svg>
  );
}

"use client";

import { BeltIllustration } from "@/components/karate/roadmap/BeltIllustration";
import {
  IconAward,
  IconBeltKnot,
  IconKarateStance,
  IconShield,
  IconStarBadge,
  IconTarget,
} from "@/components/karate/KarateIcons";
import { Sticker } from "@/components/ui/Sticker";
import type {
  KarateBeltStage,
  KarateRoadmapDecorativeAccent,
} from "@/data/karate-roadmap";
import { cn } from "@/lib/cn";
import { useEffect, useMemo, useRef, useState, type CSSProperties } from "react";

type KarateRoadmapJourneyProps = {
  milestones: KarateBeltStage[];
};

const accentSticker: Record<
  KarateRoadmapDecorativeAccent,
  "orange" | "lavender" | "mint" | "bubblegum" | "butter"
> = {
  orange: "orange",
  lavender: "lavender",
  mint: "mint",
  bubblegum: "bubblegum",
  butter: "butter",
  plum: "lavender",
};

function MilestoneStatusIcon({
  stage,
  className,
}: {
  stage: KarateBeltStage;
  className?: string;
}) {
  const props = { className, size: 20 as const };
  switch (stage.status) {
    case "previous-stage":
      return <IconShield {...props} />;
    case "current-achievement":
      return <IconAward {...props} />;
    case "long-term-goal":
      return <IconStarBadge {...props} />;
    default:
      return <IconTarget {...props} />;
  }
}

function InfographicLegend() {
  const items = [
    { label: "Steps behind", icon: IconShield, tone: "text-mint" },
    { label: "Today's milestone", icon: IconAward, tone: "text-karate-orange" },
    { label: "Still ahead", icon: IconTarget, tone: "text-lavender" },
    { label: "Big dream", icon: IconStarBadge, tone: "text-butter" },
  ] as const;

  return (
    <div
      className="mb-5 flex flex-wrap items-center justify-center gap-x-4 gap-y-2 rounded-scrapbook-xl border border-lavender/25 bg-white/60 px-3 py-2.5 sm:gap-x-6 sm:px-4"
      aria-hidden
    >
      {items.map(({ label, icon: Icon, tone }, i) => (
        <span
          key={label}
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-plum/75 sm:text-sm"
          style={{ "--infographic-delay": `${i * 0.35}s` } as CSSProperties}
        >
          <span className="infographic-legend-icon inline-flex">
            <Icon className={cn("h-4 w-4", tone)} size={16} />
          </span>
          {label}
        </span>
      ))}
    </div>
  );
}

function MilestoneProgressRail({
  milestones,
  currentIndex,
  drawActive,
}: {
  milestones: KarateBeltStage[];
  currentIndex: number;
  drawActive: boolean;
}) {
  const fillPct =
    milestones.length <= 1
      ? 0
      : currentIndex >= 0
        ? (currentIndex / (milestones.length - 1)) * 100
        : 0;

  return (
    <div className="relative mb-6 hidden px-1 lg:block" aria-hidden>
      <div className="relative h-3 overflow-hidden rounded-pill bg-lavender/25 shadow-inner">
        <div
          className={cn(
            "infographic-rail-fill absolute inset-y-0 left-0 rounded-pill",
            drawActive && "infographic-rail-fill--active",
          )}
          style={{ "--infographic-fill": `${fillPct}%` } as CSSProperties}
        >
          <div className="infographic-rail-gradient absolute inset-0" />
          <span className="infographic-rail-shimmer" aria-hidden />
        </div>
      </div>
      <ol className="relative m-0 mt-3 grid list-none grid-cols-7 gap-1 p-0">
        {milestones.map((stage, i) => {
          const isCurrent = stage.status === "current-achievement";
          const isPast =
            stage.status === "previous-stage" || i < currentIndex;
          const isSummit = stage.status === "long-term-goal";
          return (
            <li key={stage.id} className="flex flex-col items-center gap-1">
              <span
                className={cn(
                  "infographic-rail-node flex h-9 w-9 items-center justify-center rounded-full border-2 bg-white shadow-[var(--shadow-sticker)]",
                  isPast && "border-mint/50",
                  isCurrent && "infographic-current-node border-karate-orange/60",
                  stage.status === "future-milestone" &&
                    "infographic-rail-node--future border-dashed border-lavender/45",
                  isSummit && "border-plum/35 bg-gradient-to-br from-lavender/30 to-butter/25",
                )}
                style={
                  {
                    "--infographic-delay": `${i * 0.22}s`,
                  } as CSSProperties
                }
              >
                <span
                  className={cn(
                    "infographic-belt-dot h-3.5 w-3.5 rounded-full border border-plum/15",
                    isCurrent && "infographic-belt-dot--current",
                  )}
                  style={{
                    background: stage.beltColor,
                    "--infographic-delay": `${i * 0.22}s`,
                  } as CSSProperties}
                />
              </span>
              <span className="font-display text-[0.62rem] font-bold leading-tight text-plum/70 xl:text-xs">
                {String(i + 1).padStart(2, "0")}
              </span>
            </li>
          );
        })}
      </ol>
    </div>
  );
}

function MilestoneInfographicCard({
  stage,
  index,
  layout,
  revealIndex,
  isLast,
  currentIndex,
}: {
  stage: KarateBeltStage;
  index: number;
  layout: "grid" | "timeline";
  revealIndex: number;
  isLast: boolean;
  currentIndex: number;
}) {
  const isCurrent = stage.status === "current-achievement";
  const isFuture =
    stage.status === "future-milestone" || stage.status === "long-term-goal";
  const isSummit = stage.status === "long-term-goal";
  const isPast = stage.status === "previous-stage";

  const node = (
    <span
      className={cn(
        "relative flex shrink-0 items-center justify-center rounded-full border-2 bg-white shadow-[var(--shadow-sticker)]",
        layout === "timeline" ? "h-11 w-11" : "mx-auto h-10 w-10",
        isPast && "border-mint/45",
        isCurrent && "infographic-current-node h-12 w-12 border-karate-orange/55",
        isFuture && !isSummit && "border-dashed border-lavender/40",
        isSummit && "h-12 w-12 border-plum/30 bg-gradient-to-br from-lavender/25 to-butter/20",
      )}
    >
      <span className={cn("inline-flex", isSummit && "infographic-summit-icon")}>
        <MilestoneStatusIcon
          stage={stage}
          className={cn(
            "h-5 w-5",
            isPast && "text-mint",
            isCurrent && "text-karate-orange",
            isFuture && !isSummit && "text-lavender",
            isSummit && "text-plum/80",
          )}
        />
      </span>
    </span>
  );

  const cardBody = (
    <article
      className={cn(
        "infographic-milestone-card group relative w-full rounded-scrapbook-xl border-2 bg-white/94 p-3 text-left shadow-[var(--shadow-paper)]",
        layout === "grid" && "flex min-h-[15.5rem] flex-col xl:min-h-[16.5rem]",
        isCurrent &&
          "infographic-current-card z-[1] border-karate-orange/50 bg-gradient-to-br from-white via-karate-orange/10 to-butter/15 lg:scale-[1.03]",
        isFuture &&
          !isSummit &&
          "infographic-future-float infographic-future-card border-lavender/30 opacity-[0.92]",
        isSummit &&
          "infographic-summit-float border-plum/30 bg-gradient-to-br from-lavender/12 via-white to-butter/15",
      )}
      style={
        isFuture
          ? ({ "--infographic-delay": `${index * 0.28}s` } as CSSProperties)
          : undefined
      }
    >
      {isCurrent ? (
        <>
          <span
            aria-hidden
            className="infographic-current-halo pointer-events-none absolute -inset-0.5 rounded-scrapbook-xl bg-karate-orange/20 blur-md"
          />
          <span className="infographic-sparkle infographic-sparkle--a" aria-hidden>
            ✦
          </span>
          <span className="infographic-sparkle infographic-sparkle--b" aria-hidden>
            ✦
          </span>
          <span className="infographic-sparkle infographic-sparkle--c" aria-hidden>
            ★
          </span>
        </>
      ) : null}

      <div className="relative flex flex-col items-center gap-2 sm:gap-2.5">
        {layout === "grid" ? node : null}
        <div
          className="flex w-full items-center justify-between gap-2"
          style={{ borderTop: `3px solid ${stage.beltColor}` }}
        >
          <span className="font-display text-[0.65rem] font-bold uppercase tracking-wide text-plum/55">
            Step {String(index + 1).padStart(2, "0")}
          </span>
          <span
            className="infographic-knot inline-flex"
            style={{ "--infographic-delay": `${index * 0.2}s` } as CSSProperties}
          >
            <IconBeltKnot className="h-4 w-4 text-plum/35" size={16} />
          </span>
        </div>

        <span
          className={cn(
            "infographic-belt-loop",
            isCurrent && "infographic-belt-loop--current",
          )}
          style={{ "--infographic-delay": `${index * 0.32}s` } as CSSProperties}
        >
          <BeltIllustration
            beltColor={stage.beltColor}
            shadowColor={stage.shadowColor}
            idSuffix={`infographic-${layout}-${stage.id}`}
            label={stage.beltName}
            interactive={isCurrent}
            className={cn(isCurrent && "orange-belt-sway")}
          />
        </span>

        <Sticker
          accent={accentSticker[stage.decorativeAccent]}
          tilt={index % 2 === 0 ? "right" : "left"}
          className="max-w-full text-center text-[0.58rem] leading-tight sm:text-[0.65rem]"
        >
          {stage.statusLabel}
        </Sticker>

        <p className="font-display text-center text-sm font-bold leading-snug text-plum sm:text-base">
          {stage.beltName}
        </p>
        <p className="font-display text-center text-xs font-semibold text-deep-orange/90 sm:text-sm">
          {stage.stageTitle}
        </p>
      </div>

      {isCurrent && stage.celebrationLine ? (
        <div className="relative mt-3 rounded-scrapbook-lg border border-karate-orange/25 bg-karate-orange/8 px-2.5 py-2 text-center">
          <span className="infographic-achieved-bob mb-1 inline-block">
            <Sticker accent="orange" tilt="right" className="text-[0.6rem]">
              Achieved!
            </Sticker>
          </span>
          <p className="font-display text-xs font-semibold text-plum sm:text-sm">
            {stage.celebrationLine}
          </p>
        </div>
      ) : null}
    </article>
  );

  if (layout === "grid") {
    return (
      <li
        className="infographic-belt-reveal list-none"
        style={{ animationDelay: `${revealIndex * 0.06}s` }}
      >
        {cardBody}
      </li>
    );
  }

  const spinePast = index <= currentIndex;

  return (
    <li
      className="infographic-belt-reveal relative list-none pl-14 sm:pl-16"
      style={{ animationDelay: `${revealIndex * 0.07}s` }}
    >
      <div className="absolute left-[1.35rem] top-0 flex flex-col items-center sm:left-[1.6rem]">
        {node}
        {!isLast ? (
          <span
            aria-hidden
            className={cn(
              "relative mt-1 w-1 min-h-[2.5rem] flex-1 overflow-hidden rounded-pill",
              spinePast ? "bg-gradient-to-b from-mint/70 to-karate-orange/50" : "bg-lavender/25",
              index === currentIndex && "from-karate-orange/80 to-lavender/30",
            )}
          >
            {spinePast ? <span className="infographic-spine-sheen" /> : null}
          </span>
        ) : null}
      </div>
      <div className="pb-8">{cardBody}</div>
    </li>
  );
}

function MilestoneTimelineCompactRow({
  stage,
  index,
}: {
  stage: KarateBeltStage;
  index: number;
}) {
  const isPast = stage.status === "previous-stage";
  const isSummit = stage.status === "long-term-goal";

  return (
    <li className="list-none">
      <article
        className={cn(
          "flex items-center gap-3 rounded-scrapbook-lg border border-plum/10 bg-white/85 px-3 py-2.5 shadow-[var(--shadow-paper)]",
          isSummit && "border-plum/20 bg-gradient-to-r from-lavender/15 to-butter/10",
        )}
      >
        <span
          aria-hidden
          className="h-9 w-1.5 shrink-0 rounded-pill"
          style={{ background: stage.beltColor }}
        />
        <div className="min-w-0 flex-1">
          <p className="font-display text-sm font-bold leading-snug text-plum">
            {stage.beltName}
          </p>
          <p className="truncate text-xs font-medium text-secondary">
            {stage.stageTitle}
          </p>
        </div>
        <span
          className={cn(
            "shrink-0 text-right font-display text-[0.62rem] font-bold uppercase leading-tight tracking-wide",
            isPast ? "text-mint" : "text-lavender",
          )}
        >
          {isPast ? "Behind" : isSummit ? "Dream" : "Ahead"}
        </span>
      </article>
      <span className="sr-only">
        Step {String(index + 1).padStart(2, "0")}: {stage.statusLabel}
      </span>
    </li>
  );
}

function MobileBeltTimeline({
  milestones,
  currentIndex,
}: {
  milestones: KarateBeltStage[];
  currentIndex: number;
}) {
  if (currentIndex < 0) {
    return (
      <ol className="relative m-0 list-none p-0">
        {milestones.map((stage, i) => (
          <MilestoneInfographicCard
            key={stage.id}
            stage={stage}
            index={i}
            layout="timeline"
            revealIndex={i}
            isLast={i === milestones.length - 1}
            currentIndex={currentIndex}
          />
        ))}
      </ol>
    );
  }

  const pastStages =
    currentIndex > 0 ? milestones.slice(0, currentIndex) : [];
  const currentStage = milestones[currentIndex];
  const futureStages = milestones.slice(currentIndex + 1);

  const detailsSummaryClass =
    "flex min-h-11 cursor-pointer list-none items-center justify-between gap-2 rounded-scrapbook-lg border border-lavender/30 bg-white/70 px-3 py-2 font-display text-sm font-semibold text-plum marker:content-none [&::-webkit-details-marker]:hidden";

  return (
    <ol className="relative m-0 list-none space-y-3 p-0">
      {pastStages.length > 0 ? (
        <li className="list-none">
          <details className="group rounded-scrapbook-xl border border-mint/25 bg-mint/10 p-2">
            <summary className={detailsSummaryClass}>
              <span>Steps behind</span>
              <span className="rounded-scrapbook-pill bg-white/80 px-2 py-0.5 text-xs font-bold text-plum/75">
                {pastStages.length}
              </span>
            </summary>
            <ul className="mt-2 space-y-2">
              {pastStages.map((stage, i) => (
                <MilestoneTimelineCompactRow
                  key={stage.id}
                  stage={stage}
                  index={i}
                />
              ))}
            </ul>
          </details>
        </li>
      ) : null}

      {currentStage ? (
        <MilestoneInfographicCard
          stage={currentStage}
          index={currentIndex}
          layout="timeline"
          revealIndex={currentIndex}
          isLast={currentIndex === milestones.length - 1}
          currentIndex={currentIndex}
        />
      ) : null}

      {futureStages.length > 0 ? (
        <li className="list-none">
          <details className="group rounded-scrapbook-xl border border-lavender/25 bg-lavender/10 p-2">
            <summary className={detailsSummaryClass}>
              <span>Belts still ahead</span>
              <span className="rounded-scrapbook-pill bg-white/80 px-2 py-0.5 text-xs font-bold text-plum/75">
                {futureStages.length}
              </span>
            </summary>
            <ul className="mt-2 space-y-2">
              {futureStages.map((stage, i) => (
                <MilestoneTimelineCompactRow
                  key={stage.id}
                  stage={stage}
                  index={currentIndex + 1 + i}
                />
              ))}
            </ul>
          </details>
        </li>
      ) : null}
    </ol>
  );
}

export function KarateRoadmapJourney({ milestones }: KarateRoadmapJourneyProps) {
  const [drawActive, setDrawActive] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);

  const currentIndex = useMemo(
    () => milestones.findIndex((m) => m.status === "current-achievement"),
    [milestones],
  );

  useEffect(() => {
    const el = rootRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          setDrawActive(true);
          observer.disconnect();
        }
      },
      { threshold: 0.15 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div className="mt-8" ref={rootRef}>
      <div
        className="relative overflow-hidden rounded-scrapbook-2xl border-2 border-lavender/30 bg-gradient-to-br from-white/92 via-cream/95 to-lavender/10 p-4 shadow-[var(--shadow-paper)] sm:p-6 lg:p-8"
        aria-label="Karate belt milestone infographic"
      >
        <span className="infographic-decor-float pointer-events-none absolute -right-2 -top-1" aria-hidden>
          <IconKarateStance className="h-16 w-16 text-karate-orange/10 sm:h-20 sm:w-20" size={80} />
        </span>
        <span
          className="infographic-decor-float infographic-decor-float--delay pointer-events-none absolute -bottom-3 -left-3"
          aria-hidden
        >
          <IconKarateStance className="h-14 w-14 rotate-12 text-lavender/15" size={56} />
        </span>

        <InfographicLegend />

        <MilestoneProgressRail
          milestones={milestones}
          currentIndex={currentIndex}
          drawActive={drawActive}
        />

        <ol className="relative m-0 hidden list-none grid-cols-7 gap-2 p-0 lg:grid xl:gap-3">
          {milestones.map((stage, i) => (
            <MilestoneInfographicCard
              key={stage.id}
              stage={stage}
              index={i}
              layout="grid"
              revealIndex={i}
              isLast={i === milestones.length - 1}
              currentIndex={currentIndex}
            />
          ))}
        </ol>

        <div className="lg:hidden">
          <MobileBeltTimeline
            milestones={milestones}
            currentIndex={currentIndex}
          />
        </div>
      </div>

      <p className="mt-5 text-center text-sm text-secondary">
        Orange Belt is Aysha&apos;s verified achievement today; the rest are encouragement on the
        path ahead.
      </p>
    </div>
  );
}

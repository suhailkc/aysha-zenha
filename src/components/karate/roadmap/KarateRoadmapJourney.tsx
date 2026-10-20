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
      {items.map(({ label, icon: Icon, tone }) => (
        <span key={label} className="inline-flex items-center gap-1.5 text-xs font-semibold text-plum/75 sm:text-sm">
          <Icon className={cn("h-4 w-4", tone)} size={16} />
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
            "infographic-rail-fill absolute inset-y-0 left-0 rounded-pill bg-gradient-to-r from-mint/80 via-karate-orange/90 to-butter/70",
            drawActive && "infographic-rail-fill--active",
          )}
          style={{ "--infographic-fill": `${fillPct}%` } as CSSProperties}
        />
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
                  isCurrent && "infographic-current-node border-karate-orange/60 scale-110",
                  stage.status === "future-milestone" && "border-dashed border-lavender/45 opacity-90",
                  isSummit && "border-plum/35 bg-gradient-to-br from-lavender/30 to-butter/25",
                )}
                style={{
                  boxShadow: isCurrent
                    ? "0 0 0 3px rgba(242, 140, 40, 0.2), var(--shadow-sticker)"
                    : undefined,
                }}
              >
                <span
                  className="h-3.5 w-3.5 rounded-full border border-plum/15"
                  style={{ background: stage.beltColor }}
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
  );

  const cardBody = (
    <article
      className={cn(
        "infographic-milestone-card group relative w-full rounded-scrapbook-xl border-2 bg-white/94 p-3 text-left shadow-[var(--shadow-paper)]",
        layout === "grid" && "flex min-h-[15.5rem] flex-col xl:min-h-[16.5rem]",
        isCurrent &&
          "z-[1] border-karate-orange/50 bg-gradient-to-br from-white via-karate-orange/10 to-butter/15 shadow-[0_0_0_1px_rgba(242,140,40,0.12),var(--shadow-paper-lifted)] lg:scale-[1.03]",
        isFuture && "infographic-future-card border-lavender/30 opacity-[0.92]",
        isSummit &&
          "border-plum/30 bg-gradient-to-br from-lavender/12 via-white to-butter/15",
      )}
    >
      {isCurrent ? (
        <span
          aria-hidden
          className="pointer-events-none absolute -inset-0.5 rounded-scrapbook-xl bg-karate-orange/12 opacity-60 blur-md"
        />
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
          <IconBeltKnot className="h-4 w-4 text-plum/35" size={16} />
        </div>

        <BeltIllustration
          beltColor={stage.beltColor}
          shadowColor={stage.shadowColor}
          idSuffix={`infographic-${stage.id}`}
          label={stage.beltName}
          interactive={isCurrent}
          className={cn(isCurrent && "orange-belt-sway")}
        />

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
        <p className="text-center text-[0.7rem] leading-snug text-secondary sm:text-xs">
          {stage.motivationalMessage}
        </p>
      </div>

      {isCurrent && stage.celebrationLine ? (
        <div className="relative mt-3 rounded-scrapbook-lg border border-karate-orange/25 bg-karate-orange/8 px-2.5 py-2 text-center">
          <Sticker accent="orange" tilt="right" className="mb-1 text-[0.6rem]">
            Achieved!
          </Sticker>
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
              "mt-1 w-1 flex-1 min-h-[2.5rem] rounded-pill",
              spinePast ? "bg-gradient-to-b from-mint/70 to-karate-orange/50" : "bg-lavender/25",
              index === currentIndex && "from-karate-orange/80 to-lavender/30",
            )}
          />
        ) : null}
      </div>
      <div className="pb-8">{cardBody}</div>
    </li>
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
        <IconKarateStance
          className="pointer-events-none absolute -right-2 -top-1 h-16 w-16 text-karate-orange/10 sm:h-20 sm:w-20"
          size={80}
        />
        <IconKarateStance
          className="pointer-events-none absolute -bottom-3 -left-3 h-14 w-14 rotate-12 text-lavender/15"
          size={56}
        />

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

        <ol className="relative m-0 list-none p-0 lg:hidden">
          <span
            aria-hidden
            className="absolute bottom-4 left-[1.35rem] top-4 w-1 rounded-pill bg-lavender/20 sm:left-[1.6rem]"
          />
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
      </div>

      <p className="mt-5 text-center text-sm text-secondary">
        Orange Belt is Aysha&apos;s verified achievement today; the rest are encouragement on the
        path ahead.
      </p>
    </div>
  );
}

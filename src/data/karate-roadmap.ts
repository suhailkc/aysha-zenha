/**
 * Karate Belt Roadmap — editable journey data
 *
 * Belt order follows the family's reference progression (White through Black).
 * Styles and schools differ; this file is the configurable visual roadmap only.
 *
 * HOW TO UPDATE WHEN AYSHA EARNS ANOTHER BELT
 * --------------------------------------------
 * 1. Move the newly earned belt to `status: "current-achievement"` with the correct
 *    `statusLabel` (e.g. "GREEN BELT ACHIEVED!").
 * 2. Change the former current belt to `status: "previous-stage"` and a neutral label
 *    (do not use "ACHIEVED" unless the family wants that wording on earlier belts).
 * 3. Leave belts not yet earned as `future-milestone` or `long-term-goal` for Black Belt.
 * 4. Add `achievementDate` only if the family explicitly provides a date string.
 * 5. Optional: set `photoFile` (under `public/images/karate/`) and `photoAlt` after privacy review.
 * 6. Update `karateRoadmapContent.progress.currentLabel` to name her latest verified belt.
 *
 * Do not invent exam dates, dojo names, instructors, or competition results.
 */

export type KarateBeltStageStatus =
  | "previous-stage"
  | "current-achievement"
  | "future-milestone"
  | "long-term-goal";

export type KarateBeltId =
  | "white-belt"
  | "yellow-belt"
  | "orange-belt"
  | "green-belt"
  | "blue-belt"
  | "brown-belt"
  | "black-belt";

export type BeltIllustrationTheme =
  | "white-start"
  | "yellow-sunshine"
  | "orange-victory"
  | "green-garden"
  | "blue-sky"
  | "brown-peak"
  | "black-summit";

export type KarateRoadmapDecorativeAccent =
  | "orange"
  | "lavender"
  | "mint"
  | "bubblegum"
  | "butter"
  | "plum";

export type KarateBeltStage = {
  id: KarateBeltId;
  /** Full belt name shown on the map */
  beltName: string;
  displayOrder: number;
  beltColor: string;
  shadowColor: string;
  status: KarateBeltStageStatus;
  statusLabel: string;
  /** Storybook chapter title, e.g. "The Brave Beginning" */
  stageTitle: string;
  motivationalMessage: string;
  illustrationTheme: BeltIllustrationTheme;
  decorativeAccent: KarateRoadmapDecorativeAccent;
  /** Extra copy when the visitor opens this milestone */
  detailNote?: string;
  /** Shown on the current belt celebration card only */
  celebrationLine?: string;
  /** Path relative to `public/` (e.g. `images/karate/moment.webp`) */
  photoFile?: string;
  photoAlt?: string;
  /** Only when the family explicitly provides a date string */
  achievementDate?: string;
};

/** @deprecated Use KarateBeltStage — kept for transitional imports during refactors */
export type KarateRoadmapMilestone = KarateBeltStage;

export const karateRoadmapContent = {
  editionLabel: "AYSHA'S LITTLE WARRIOR JOURNEY",
  heading: "Every Belt Tells a Story!",
  supporting: "One little step at a time. One big dream at a time.",
  encouragement:
    "You don't have to be the strongest today. Just keep learning, keep trying and keep growing!",
  progress: {
    currentLabel: "Current milestone: Orange Belt",
    dreamLabel: "Long-term dream: Black Belt",
  },
} as const;

export const karateBeltStages: KarateBeltStage[] = [
  {
    id: "white-belt",
    beltName: "White Belt",
    displayOrder: 1,
    beltColor: "#F5F5F4",
    shadowColor: "#A8A29E",
    status: "previous-stage",
    statusLabel: "WHERE IT BEGAN",
    stageTitle: "The Brave Beginning",
    motivationalMessage: "Every great journey starts with one little step.",
    illustrationTheme: "white-start",
    decorativeAccent: "lavender",
    detailNote:
      "The first belt on this illustrated map — a cheerful starting point, not a claim about any particular dojo exam.",
  },
  {
    id: "yellow-belt",
    beltName: "Yellow Belt",
    displayOrder: 2,
    beltColor: "#FACC15",
    shadowColor: "#CA8A04",
    status: "previous-stage",
    statusLabel: "SUNSHINE STAGE",
    stageTitle: "The Sunshine Stage",
    motivationalMessage:
      "Curiosity helps confidence grow. Keep asking, learning and trying!",
    illustrationTheme: "yellow-sunshine",
    decorativeAccent: "butter",
    detailNote:
      "An earlier step on the reference belt path — celebrated with encouragement, not scoreboards.",
  },
  {
    id: "orange-belt",
    beltName: "Orange Belt",
    displayOrder: 3,
    beltColor: "#F28C28",
    shadowColor: "#C96319",
    status: "current-achievement",
    statusLabel: "ORANGE BELT ACHIEVED!",
    stageTitle: "The Little Warrior's Victory",
    motivationalMessage:
      "Look how far you've come! Every practice is another reason to be proud.",
    celebrationLine: "Your hard work deserves a high-five!",
    illustrationTheme: "orange-victory",
    decorativeAccent: "orange",
    detailNote:
      "Aysha's latest verified belt — the brightest sticker on this map. No invented dates or tournament stats here.",
  },
  {
    id: "green-belt",
    beltName: "Green Belt",
    displayOrder: 4,
    beltColor: "#22C55E",
    shadowColor: "#15803D",
    status: "future-milestone",
    statusLabel: "FUTURE MILESTONE",
    stageTitle: "Growing Stronger",
    motivationalMessage:
      "Keep planting the seeds of focus, patience and practice.",
    illustrationTheme: "green-garden",
    decorativeAccent: "mint",
    detailNote:
      "A future chapter on the map — motivation to keep practicing, not a promise of when the next belt arrives.",
  },
  {
    id: "blue-belt",
    beltName: "Blue Belt",
    displayOrder: 5,
    beltColor: "#3B82F6",
    shadowColor: "#1D4ED8",
    status: "future-milestone",
    statusLabel: "FUTURE MILESTONE",
    stageTitle: "The Sky Is the Limit",
    motivationalMessage:
      "Little by little, your skills and confidence can reach new heights.",
    illustrationTheme: "blue-sky",
    decorativeAccent: "lavender",
    detailNote:
      "Dream big and keep learning — this milestone stays a future goal until the family updates this file.",
  },
  {
    id: "brown-belt",
    beltName: "Brown Belt",
    displayOrder: 6,
    beltColor: "#92400E",
    shadowColor: "#78350F",
    status: "future-milestone",
    statusLabel: "FUTURE MILESTONE",
    stageTitle: "The Persistence Peak",
    motivationalMessage:
      "Big dreams grow through patience, effort and trying again.",
    illustrationTheme: "brown-peak",
    decorativeAccent: "plum",
    detailNote:
      "A winding hill on the adventure map — patience and practice, not an official testing checklist.",
  },
  {
    id: "black-belt",
    beltName: "Black Belt",
    displayOrder: 7,
    beltColor: "#1a1a1a",
    shadowColor: "#382B4A",
    status: "long-term-goal",
    statusLabel: "LONG-TERM GOAL",
    stageTitle: "The Big Dream",
    motivationalMessage:
      "A Black Belt is not the end of learning. It's another beginning.",
    illustrationTheme: "black-summit",
    decorativeAccent: "plum",
    detailNote:
      "The summit of this illustrated quest — inspirational and gentle, never a deadline or a guarantee.",
  },
];

/** @deprecated Use karateBeltStages */
export const karateRoadmapMilestones = karateBeltStages;

export function getOrderedKarateBeltStages(): KarateBeltStage[] {
  return [...karateBeltStages].sort((a, b) => a.displayOrder - b.displayOrder);
}

/** @deprecated Use getOrderedKarateBeltStages */
export function getOrderedKarateRoadmapMilestones(): KarateBeltStage[] {
  return getOrderedKarateBeltStages();
}

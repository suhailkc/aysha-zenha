# Aysha's Little Universe — implementation plan

This document tracks how we will build the gift site in phases. The repo scaffold is Next.js 16 (App Router), TypeScript, Tailwind CSS 4, ESLint, and npm with `src/` and `@/*` paths.

## Design system (phase 0, before major UI)

| Token / element | Direction |
|-----------------|-----------|
| Colors | Lavender `#C4B5FD`, bubblegum `#F9A8D4`, mint `#A7F3D0`, butter `#FDE68A`, cream `#FFFBEB`, ink `#3D2C4B` |
| Orange accent | Belt orange `#FB923C` (or similar warm orange) for Karate Corner badges, belt ribbons, and milestone stickers; pair with cream/ink for contrast (WCAG AA on body copy) |
| Surfaces | Rounded `2xl` cards, soft shadows, optional paper grain (CSS background or subtle SVG) |
| Decor | Stars, doodle borders, sticker-like badges (SVG or CSS, no heavy animation libraries); optional karate doodles (belt, gi outline) kept playful, not martial-arts clipart-heavy |
| Typography | Display: rounded/playful Google font (e.g. Nunito, Quicksand, or Baloo 2); body: readable sans (e.g. Nunito Sans). Load via `next/font`. |
| Motion | Respect `prefers-reduced-motion`; keep surprises gentle |

Deliverables:

- `src/app/globals.css` — CSS variables for palette (including `--color-belt-orange` or theme token), scrapbook utilities
- `src/components/ui/` — `ScrapbookCard`, `StickerBadge`, `StarField` (static or lightweight); optional `OrangeBeltBadge` for Karate Corner
- `src/components/layout/` — `SiteHeader`, `SiteFooter`, optional `PaperBackground` wrapper

## Information architecture

| Route | Purpose | Default RSC |
|-------|---------|-------------|
| `/` | Landing: welcome, **Karate Corner** (planned), hero “Surprise me”, gallery and love-notes previews | Server + small client islands |
| `/gallery` | Photo grid/lightbox, 20+ images; optional filter for approved karate moments | Server shell + client lightbox |
| `/karate` | **Karate Journey**: approved karate photos + milestone cards (Orange Belt verified) | Server |

Optional: single-page sections with hash links from landing first; split routes when content grows. Home **Karate Corner** links to `/karate`.

## Component map

### Landing (`/`)

- `HeroWelcome` — title “Aysha’s Little Universe”, short family-written tagline (from data file)
- **`KarateCorner`** — scrapbook card block:
  - `OrangeBeltBadge` — “Orange Belt Champion” achievement sticker (orange accent on cream/lavender card)
  - Photo slot: approved karate image via `next/image` when file exists, else playful SVG/placeholder (no stock photos of strangers)
  - Copy: “Little warrior. Big determination.” (from `src/data/home.ts`)
  - Value chips: Focus, Discipline, Courage (labels only; family may expand notes elsewhere, not invented by agents)
  - CTA link to `/karate` (“See my Karate Journey” or similar from data)
- `UniverseNav` — illustrated links to gallery and karate journey (header nav: Home, Memories)
- `FloatingDecor` — stars/doodles (CSS or inline SVG, low DOM cost)

### Gallery (`/gallery`)

- `GalleryGrid` — responsive masonry or uniform grid
- `PhotoLightbox` — client: open/close, keyboard, focus trap
- Data: `src/data/gallery-entries.json` + manifest (resolved via `src/lib/gallery.ts`) listing `id`, `src`, `alt`, optional `caption`, optional `tags` (no PII in alt/caption)
- **Karate photos:** family may tag approved public karate snapshots with a `karate` (or `karate-moments`) tag when that tag is added to `GalleryTagId`; never require dojo/school names in captions

### Karate Journey (`/karate`)

- `KarateJourneyHero` — warm intro; states passion for karate without inventing training history
- `KarateMilestoneCard` — editable spread: achievement title, caption, optional `date` (only if family provided), optional photo
- `CurrentBeltHighlight` — displays verified **Orange Belt** as current achievement; do **not** render a full belt ladder with checked-off future belts
- `KaratePhotoGrid` or reuse `ScrapbookPhotoFrame` patterns for approved images under `public/images/karate/`
- Empty/placeholder states when no extra milestones or photos yet (Orange Belt card still shown from verified site copy)

**Content rules:**

- One verified milestone out of the box: **Orange Belt** (latest achieved belt per family).
- Additional milestones and dates come only from `src/data/karate-journey.json` (family-authored).
- No fabricated tournament wins, instructor names, or dojo branding.

### Home love notes preview

- `LoveNoteCard` — up to three cards from `src/data/messages.json` (author display name only, no contact info)

### Hero surprise

- `SurpriseMeControl` — client dialog with random messages from `src/data/surprises.ts`

## Data files

| File | Contents |
|------|----------|
| `src/data/site.ts` | Site title, nav labels (include Karate Journey when route ships) |
| `src/data/home.ts` | Hero copy, intro labels, **`karateCorner`** block (badge title, tagline, value labels, CTA, portrait/karate photo alt) |
| `src/data/gallery-entries.json` | Gallery entries + manifest merge |
| `src/data/messages.json` | `{ id, author, message, accent? }[]` for home preview |
| `src/data/surprises.ts` | Hero “Surprise me” copy and message pool |
| `src/data/karate-journey.json` | Milestones: `{ id, title, caption, optional date, optional file under public/images/karate/ }[]`; seed with Orange Belt entry only until family adds more |
| `src/data/karate-page.ts` | Page title, subtitle, empty hints for `/karate` |

Types live in `src/types/content.ts` (extend with `KarateMilestone`, optional gallery tag).

**Rule:** All copy and facts are authored by the family in these files. Agents must not fabricate memories, belt history, or dojo details.

## Photo workflow

1. **Source:** Family provides originals outside git (cloud folder, USB, etc.).
2. **Prepare:** Resize/compress for web (e.g. max 1600px long edge, JPEG/WebP). Strip EXIF if it contains location or device identifiers.
3. **Review:** Crop or blur anything identifying (license plates, school signs, house numbers, **dojo name on wall or uniform**, full names of other children if desired).
4. **Place locally:**
   - Gallery: `public/photos/` via `npm run photos:prepare` (see `docs/photo-workflow.md`)
   - Karate (when live): `public/images/karate/`
   - **Karate Journey:** `public/images/karate/` (same privacy review; gitignore binaries like other photo folders if policy matches gallery)
5. **Register:** Add entries in the appropriate data file with thoughtful `alt` text (describe the moment, not private details).
6. **Git:** Gallery binaries are **gitignored** by default. For Vercel deploy, either:
   - build/deploy from a machine that has photos in `public/`, or
   - use a private deploy pipeline that injects assets (still treat deployed URLs as public).

See `public/images/gallery/README.md`, `docs/photo-workflow.md`, and (when added) `public/images/karate/README.md`.

## Client vs server split

| Need | Use |
|------|-----|
| Static copy, metadata, grids without interaction | Server Component |
| Countdown, lightbox, quiz state, reveal animations, `localStorage` birthday flags | `"use client"` |
| Shared date helpers | `src/lib/dates.ts` (pure functions; testable) |
| Birthday mode | `src/lib/birthday-mode.ts` + client hook |

No Route Handlers or external fetch for core features.

## Accessibility checklist

- One `h1` per page; logical heading order
- Visible focus styles matching scrapbook theme
- `aria-expanded` / `aria-controls` on reveals and lightbox
- Images: non-empty `alt`; decorative SVGs `aria-hidden`
- Color contrast at least WCAG AA for body text on cream/pastel backgrounds; verify orange accent text on cream

## Validation steps (run before each deploy)

1. `npm run lint` — zero errors
2. `npm run build` — static generation succeeds
3. Manual pass: mobile (375px), tablet, desktop
4. Privacy pass: follow **`docs/privacy-and-launch-checklist.md`** (search for school, address, full DOB, **dojo**, **training location/schedule**, etc.)
5. Confirm no `.env` required; no network calls to third-party analytics
6. Spot-check all gallery alts, karate milestones, and message content with a family reviewer
7. Karate Journey: confirm only family-listed belts/milestones appear; Orange Belt matches verified fact; no unearned belt checklist UI

## Suggested build order

1. **Phase A:** Design tokens (including orange accent), layout shell, landing placeholder with real title/metadata
2. **Phase B:** Gallery data model + grid + lightbox (with sample placeholder SVGs until photos added); optional karate gallery tag
3. **Phase B2:** Karate Journey data model + `/karate` page shell + home **Karate Corner** (badge, placeholder art, link)
4. **Phase C:** Countdown + birthday mode
5. **Phase D:** Surprises and message wall
6. **Phase E:** Games/quizzes + **Little Warrior Challenge**
7. **Phase F:** Scrapbook polish, karate photo assets, performance pass, deploy to Vercel Hobby

## Vercel deploy notes

- Framework preset: Next.js
- No environment variables required for v1
- `next.config.ts`: keep default image domains local only
- After first deploy, share URL only with intended recipients; remind family that photos are public once deployed

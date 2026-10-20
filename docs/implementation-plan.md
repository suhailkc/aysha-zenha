# Aysha's Little Universe — implementation plan

This document tracks how we will build the gift site in phases. The repo scaffold is Next.js 16 (App Router), TypeScript, Tailwind CSS 4, ESLint, and npm with `src/` and `@/*` paths.

## Design system (phase 0, before major UI)

| Token / element | Direction |
|-----------------|-----------|
| Colors | Lavender `#C4B5FD`, bubblegum `#F9A8D4`, mint `#A7F3D0`, butter `#FDE68A`, cream `#FFFBEB`, ink `#3D2C4B` |
| Surfaces | Rounded `2xl` cards, soft shadows, optional paper grain (CSS background or subtle SVG) |
| Decor | Stars, doodle borders, sticker-like badges (SVG or CSS, no heavy animation libraries) |
| Typography | Display: rounded/playful Google font (e.g. Nunito, Quicksand, or Baloo 2); body: readable sans (e.g. Nunito Sans). Load via `next/font`. |
| Motion | Respect `prefers-reduced-motion`; keep surprises gentle |

Deliverables:

- `src/app/globals.css` — CSS variables for palette and scrapbook utilities
- `src/components/ui/` — `ScrapbookCard`, `StickerBadge`, `StarField` (static or lightweight)
- `src/components/layout/` — `SiteHeader`, `SiteFooter`, optional `PaperBackground` wrapper

## Information architecture

| Route | Purpose | Default RSC |
|-------|---------|-------------|
| `/` | Landing: welcome, navigation to surprises, hero tone | Server |
| `/gallery` | Photo grid/lightbox, 20+ images | Server shell + client lightbox |
| `/surprises` | Buttons, reveal cards, easter eggs | Mixed |
| `/countdown` | Days until birthday; birthday-day mode | Client (date logic in browser) |
| `/play` | Games and quizzes hub | Mixed |
| `/messages` | Family message wall (static JSON) | Server |
| `/scrapbook` | Curated spreads / timeline | Server |

Optional: single-page sections with hash links from landing first; split routes when content grows.

## Component map

### Landing (`/`)

- `HeroWelcome` — title “Aysha’s Little Universe”, short family-written tagline (from data file)
- `UniverseNav` — illustrated links to gallery, surprises, play, messages
- `FloatingDecor` — stars/doodles (CSS or inline SVG, low DOM cost)

### Gallery (`/gallery`)

- `GalleryGrid` — responsive masonry or uniform grid
- `PhotoLightbox` — client: open/close, keyboard, focus trap
- Data: `src/data/gallery.ts` listing `id`, `src`, `alt`, optional `caption` (no PII in alt/caption)

### Surprises (`/surprises`)

- `RevealCard` — client: flip or peel animation
- `SurpriseButton` — client: confetti-like CSS or sticker pop (no canvas libraries unless justified)

### Countdown (`/countdown`)

- `BirthdayCountdown` — client: target month/day only (year optional, stored in local config—not full DOB in UI)
- `BirthdayModeBanner` — client: detects “today is birthday” and switches theme/copy

### Play (`/play`)

- `GameCard` — links to mini-games
- `QuizRunner` — client: multiple choice from `src/data/quizzes/*.json`
- Games (examples): memory match, “find the star”, simple trivia—all static, no scores sent anywhere

### Messages & scrapbook

- `MessageWall` — cards from `src/data/messages.json` (author display name only, no contact info)
- `ScrapbookSpread` — paired photo + text blocks from `src/data/scrapbook.json`

## Data files

| File | Contents |
|------|----------|
| `src/data/site.ts` | Site title, optional birthday month/day for countdown (no full DOB), nav labels |
| `src/data/gallery.ts` | Array of gallery entries pointing to `/images/gallery/...` |
| `src/data/messages.json` | `{ id, author, message, accent? }[]` |
| `src/data/scrapbook.json` | Spreads: `{ id, title?, image?, body? }[]` |
| `src/data/quizzes/*.json` | Questions, options, correct index, fun wrong messages |

Types live in `src/types/content.ts` (shared interfaces for gallery, messages, quizzes).

**Rule:** All copy and facts are authored by the family in these files. Agents must not fabricate memories.

## Photo workflow

1. **Source:** Family provides originals outside git (cloud folder, USB, etc.).
2. **Prepare:** Resize/compress for web (e.g. max 1600px long edge, JPEG/WebP). Strip EXIF if it contains location or device identifiers.
3. **Review:** Crop or blur anything identifying (license plates, school signs, house numbers, full names of other children if desired).
4. **Place locally:** Copy into `public/images/gallery/` as `01-slug.webp`, `02-slug.webp`, …
5. **Register:** Add entries in `src/data/gallery.ts` with thoughtful `alt` text (describe the moment, not private details).
6. **Git:** Gallery binaries are **gitignored** by default. For Vercel deploy, either:
   - build/deploy from a machine that has photos in `public/images/gallery/`, or
   - use a private deploy pipeline that injects assets (still treat deployed URLs as public).

See `public/images/gallery/README.md`.

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
- Color contrast at least WCAG AA for body text on cream/pastel backgrounds

## Validation steps (run before each deploy)

1. `npm run lint` — zero errors
2. `npm run build` — static generation succeeds
3. Manual pass: mobile (375px), tablet, desktop
4. Privacy pass: search codebase for address patterns, school keywords, full DOB strings, plate numbers
5. Confirm no `.env` required; no network calls to third-party analytics
6. Spot-check all gallery alts and message content with a family reviewer

## Suggested build order

1. **Phase A:** Design tokens, layout shell, landing placeholder with real title/metadata
2. **Phase B:** Gallery data model + grid + lightbox (with sample placeholder SVGs until photos added)
3. **Phase C:** Countdown + birthday mode
4. **Phase D:** Surprises and message wall
5. **Phase E:** Games/quizzes
6. **Phase F:** Scrapbook polish, performance pass, deploy to Vercel Hobby

## Vercel deploy notes

- Framework preset: Next.js
- No environment variables required for v1
- `next.config.ts`: keep default image domains local only
- After first deploy, share URL only with intended recipients; remind family that photos are public once deployed

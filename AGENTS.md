<!-- BEGIN:nextjs-agent-rules -->

## This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

# Aysha's Little Universe — agent rules

Personal birthday gift website for **Aysha Zenha**. Not a business site or generic birthday landing page.

## Project purpose

Build a loving, art-directed, highly personalized experience. Every design and copy choice should feel specific to Aysha, not template-like.

## Design direction

Scrapbook aesthetic: lavender, bubblegum pink, mint green, butter yellow, warm cream; rounded cards; paper textures; stars; hand-drawn doodles; sticker decorations; lively but readable typography.

Avoid: generic startup dashboards, template hero sections, excessive gradients, childish clutter.

## Technical constraints

- **Hosting:** Vercel Hobby, personal non-commercial use.
- **Data:** Prefer static content and browser-side interactions only.
- **Do not add:** database, authentication, external APIs, paid services, analytics, third-party tracking.
- **Env vars:** Not required for basic functionality.
- **React:** TypeScript with clear types; Server Components by default; Client Components only when interactivity requires them.
- **Dependencies:** Keep minimal; justify any new package.
- **Images:** Local assets only; no hotlinked URLs. Use `next/image` where appropriate.
- **Quality:** Responsive layout, semantic HTML, keyboard focus, sufficient color contrast, meaningful `alt` text.

## Planned features (implement incrementally)

1. Distinctive landing page
2. Gallery (20+ locally stored photos)
3. Interactive surprise buttons and reveal cards
4. Birthday countdown and automatic birthday mode
5. Small browser games and funny quizzes
6. Curated family message wall and digital scrapbook

See `docs/implementation-plan.md` for structure and validation steps.

## Child privacy

- **Never display:** school name, home address, full date of birth, GPS/location, license plates, or other identifying details in UI or metadata.
- **Never invent:** personal facts, family relationships, memories, or quotes. Use only content supplied by the family in repo data files.
- **No collection:** no public forms, submissions, or user data storage.
- **Public assets:** treat all deployed photos and static files as publicly accessible; an unlisted URL is not security.
- **Git:** never commit original photographs, `.env` files, or secrets. Follow `public/images/gallery/README.md` for the photo workflow.

## Code conventions

- Use `src/` and `@/*` import alias (`@/components/...`, `@/lib/...`).
- Colocate feature components under `src/components/`; shared types in `src/types/`; static JSON in `src/data/`.
- Prefer CSS variables and Tailwind theme tokens for the scrapbook palette (define in `globals.css` when theming begins).

## Commands

```bash
npm run dev    # development server
npm run build  # production build
npm run lint   # ESLint
```

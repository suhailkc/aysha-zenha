# Aysha's Little Universe

Personal birthday gift website for Aysha Zenha. Built with Next.js (App Router), TypeScript, and Tailwind CSS.

## Getting started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000). Edit `src/app/page.tsx` to begin the landing page.

## Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Production build |
| `npm run start` | Serve production build |
| `npm run lint` | Run ESLint |

## Project docs

- **`AGENTS.md`** — rules for Cursor and contributors (privacy, stack, design)
- **`docs/implementation-plan.md`** — phased features, components, data, and photo workflow
- **`docs/privacy-and-launch-checklist.md`** — what to verify before publishing (required reading)

## Photos

Prepared WebP files go in `public/photos/` (gitignored). Originals stay in `private-photo-input/`. See **`docs/photo-workflow.md`**.

## Privacy note

The site sets **`noindex`** metadata and a restrictive **`robots.txt`** to discourage search indexing. That is **not** access control: anyone with the public URL can still open pages and download files under `public/`, including photos.

## Deploy

Deploy to [Vercel](https://vercel.com) (Hobby tier is fine for personal use). No environment variables are required for the planned static experience. Run `npm run photos:prepare` on the build machine before deploy if the gallery should show real photos.

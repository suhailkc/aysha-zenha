# Launch checklist — Aysha's Little Universe

Use this before the first deploy and whenever you add photos, messages, or pages. For deeper privacy context, also read **`docs/privacy-and-launch-checklist.md`**.

## Run the site locally

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000). Production-like check:

```bash
npm run lint
npm run build
npm run start
```

No environment variables are required for core features. Optional: set `NEXT_PUBLIC_SITE_URL` to your production URL so Open Graph links resolve correctly in chat previews.

## Prepare and add photos

1. Put **originals only** in `private-photo-input/` (gitignored). Never commit originals.
2. Review each photo for identifying background details (signs, house numbers, license plates). Crop or blur before prepare.
3. On the machine that will **build or deploy**, run:

   ```bash
   npm run photos:prepare
   ```

   This writes WebP files to `public/photos/` and updates `src/data/gallery-manifest.json` with sizes and paths.

4. Edit **`src/data/gallery-entries.json`**: `alt`, optional `caption`, and `tags` for each photo (`everyday`, `celebrations`, `adventures`, `goofy-moments`).
5. Add **`public/photos/hero.webp`** for the home portrait (same prepare script can include `hero.webp` per `private-photo-input/prepare.config.json`).
6. Scrapbook spreads use **`public/images/scrapbook/`** and **`src/data/scrapbook.json`** (see `docs/content-editing.md`).

The gallery only shows photos that exist on disk at build time, even if the manifest lists them. Deploy from a machine that has prepared files if you want a full gallery on Vercel.

Full steps: **`docs/photo-workflow.md`**.

## Edit captions and family notes

| Content | File |
|---------|------|
| Home hero copy and portrait alt | `src/data/home.ts` |
| Gallery alts, captions, tags | `src/data/gallery-entries.json` |
| Love notes wall | `src/data/messages.json` |
| Scrapbook spreads | `src/data/scrapbook.json` |
| Page titles and empty-state copy | `src/data/*-page.ts`, `src/data/site.ts` |

Replace all scaffold placeholder text before sharing the site with Aysha. Do not invent memories or quotes.

Guide: **`docs/content-editing.md`**.

## Birthday mode

- Birthday **month and day** live in **`src/config/birthday.ts`** (default November 1). The UI never shows birth year or age.
- **`/countdown`** shows sleeps until the next birthday, or celebration copy on the birthday.
- On Aysha Day, a gentle confetti burst runs **once per browser tab** (session storage). Manual “Celebrate” respects `prefers-reduced-motion`.
- The countdown refreshes when the tab becomes visible again and at **local midnight** so an overnight open does not stick on the wrong day.
- In **development only**, use the preview panel on `/countdown` or `?birthdayPreview=birthday` / `?birthdayPreview=1` (eve). Preview query params are ignored in production builds.

## Deploy and update

1. Complete the privacy section below on a family-reviewed copy of the site.
2. Run `npm run photos:prepare` on the deploy machine if the gallery should include real photos (`public/photos/` is gitignored).
3. Push to your Git host and deploy with **Vercel** (Next.js preset, Hobby tier is fine).
4. Optional: set **`NEXT_PUBLIC_SITE_URL`** in Vercel to your canonical URL.
5. After deploy, click through every route on phone and desktop widths.
6. To update later: edit data or photos locally, re-run prepare if needed, commit code changes (not photos unless you use a private asset pipeline), and redeploy.

There are no API routes, databases, or third-party analytics in this project.

## Privacy checks before publishing

Treat the live URL as **public**: anyone with the link can read pages and download files under `public/`, including photos.

- [ ] Search `src/data/` for school names, addresses, full DOB, birth year, city, or other identifying details.
- [ ] Replace placeholder gallery alts, captions, love notes, and scrapbook copy with family-authored text.
- [ ] Set `hero.portraitAlt` in `src/data/home.ts` to match the hero photo without private details.
- [ ] Confirm `git status` does not include `.env`, originals under `private-photo-input/`, or unprepared photos you meant to keep local.
- [ ] Spot-check prepared WebP for stripped EXIF / GPS (see `docs/photo-workflow.md`).
- [ ] Share the URL only with people you trust; remind them photos are public once deployed.
- [ ] Remember: `noindex` and `robots.txt` discourage search engines but **do not** password-protect the site.

## Quick technical smoke test

- [ ] `npm run lint` — zero errors
- [ ] `npm run build` — succeeds
- [ ] Nav: Home, Memories, Surprises, Fun Zone, Birthday, Love Notes, Scrapbook
- [ ] Gallery: filters, lightbox (Close, Previous, Next, Escape)
- [ ] Fun Zone: quiz, superpower picker, giggle challenge — restart works
- [ ] Surprises: surprise me dialog, envelope, stickers, mini celebration
- [ ] Keyboard focus visible on buttons and links; skip link jumps to main content

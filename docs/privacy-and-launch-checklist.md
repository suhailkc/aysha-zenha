# Privacy and launch checklist

This site is a **public** birthday gift for a child. Treat every deploy as world-readable, even when you share the URL only with family.

## What no-index and robots.txt do **not** do

- **`robots` meta tags** (`noindex`, `nofollow`) ask well-behaved search engines not to list the site. They do **not** password-protect pages or hide photos.
- **`public/robots.txt`** discourages crawling. It is **not** access control. Malicious bots and direct links ignore it.
- An **unguessable URL** is not security. Anyone who receives the link can forward it, screenshot it, or save images.

Anyone with the live URL can open HTML pages and fetch anything under `public/` (including `/photos/*.webp` and scrapbook images once added).

## Limitations of a public child-focused website

- Deployed photos and captions are **public assets**, even if the site is unlisted.
- Link previews (messages, social apps) may fetch Open Graph metadata and the illustration at `/og-illustration.svg` (no child photo by design).
- Fonts are self-hosted via Next.js (`next/font`); there are no analytics or third-party trackers in this repo.
- Browser games and surprises use **session-only** storage for small UX flags (for example birthday confetti once per tab). Nothing is sent to a server.

## Before you publish — family review

### Content and privacy

- [ ] Search `src/data/` and JSON copy for **school names**, **home address**, **full date of birth**, **birth year**, **city**, **license plates**, or other identifying details. Remove or rewrite before deploy.
- [ ] Review every gallery **alt text**, **caption**, scrapbook **note**, and love note **message** in `src/data/`.
- [ ] Confirm hero portrait alt text in `src/data/home.ts` (`hero.portraitAlt`) matches the photo without private details.
- [ ] Crop or blur identifying background details in source photos (signs, uniforms, house numbers) **before** running `npm run photos:prepare`.
- [ ] Use generic output names in `prepare.config.json` (for example `photo-01.webp`), not real filenames, in case manifests are shared.

### Photos and Git

- [ ] Originals stay in `private-photo-input/` only (gitignored).
- [ ] Prepared WebP files live in `public/photos/` (gitignored). Run `npm run photos:prepare` on the machine that builds or deploys.
- [ ] After prepare, spot-check a WebP with an EXIF viewer to confirm **no GPS, device serial, or embedded location**.
- [ ] Do **not** commit `.env`, originals, or unprepared personal photos.

### Technical smoke test

- [ ] `npm run lint` passes.
- [ ] `npm run build` passes on a machine that has prepared photos if you expect the gallery to be full.
- [ ] Click through every route on a phone-width viewport: no horizontal scroll, tappable nav, readable headings.
- [ ] Gallery lightbox: open a photo, use **Escape**, **Close**, **Previous** / **Next**, and keyboard focus ring on controls.
- [ ] Fun Zone: complete each game and confirm result cards appear (screen readers get `role="status"` / live regions where implemented).
- [ ] Countdown shows **month and day only** in UI (no birth year).

### Sharing

- [ ] Optional: set `NEXT_PUBLIC_SITE_URL` to your production URL (for example `https://your-site.vercel.app`) so Open Graph image URLs resolve correctly in link previews.
- [ ] Share the URL only with people you trust; remind them not to post photos publicly if your family prefers privacy.
- [ ] Optional: enable Vercel **Deployment Protection** or similar if you later need real access control (not included in this project by default).

## After launch

- [ ] Re-run this checklist whenever you add photos, messages, or new pages.
- [ ] If a photo or note was shared too widely, removing it from the repo and redeploying stops **new** visitors from seeing it; cached copies may still exist elsewhere.

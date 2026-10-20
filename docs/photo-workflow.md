# Photo workflow

All processing happens **on your computer**. Originals never go to Git, and the prepare script does not upload anything anywhere.

## 1. Add originals (private)

Copy JPEG, PNG, or WebP files into:

`private-photo-input/`

This folder is gitignored. Keep backups on your own drive or cloud storage if you like; the repo never sees the originals.

## 2. Map inputs to safe output names

Edit `private-photo-input/prepare.config.json`. Each item needs:

| Field | Meaning |
|-------|---------|
| `input` | Filename inside `private-photo-input/` |
| `output` | WebP name written to `public/photos/` (e.g. `hero.webp`, `photo-01.webp`) |

Rules:

- Output names must be lowercase, use hyphens, and end in `.webp`.
- Each `output` must be **unique** (duplicates make the script fail).
- `hero.webp` is optional and powers the homepage portrait.
- Gallery slots use `photo-01.webp` through `photo-20.webp` (add more entries in config and in `gallery-entries.json` when you need 21+).

## 3. Prepare WebP files

From the project root:

```bash
npm run photos:prepare
```

The script will:

- Auto-rotate using EXIF, then strip metadata (EXIF, GPS, IPTC, etc.) in the exported WebP.
- Resize so the longest edge is at most 1600px (smaller images are not enlarged).
- Write only to `public/photos/` (originals are never modified).
- Update `src/data/gallery-manifest.json` with **only successfully converted** files (width, height, public URL). Original filenames are **not** stored in the manifest.

Missing input files are skipped with a warning. Conversion errors are reported; the manifest still lists successes only.

## 4. Captions, tags, and alt text

Edit **`src/data/gallery-entries.json`** (one object per gallery photo):

| Field | Purpose |
|-------|---------|
| `id` | Stable id (e.g. `photo-01`) |
| `file` | Must match `output` in `prepare.config.json` |
| `alt` | Accessible description (no school names, addresses, full DOB, plates, etc.) |
| `caption` | Optional scrapbook caption under the photo |
| `tags` | Optional: `everyday`, `celebrations`, `adventures`, `goofy-moments` |

The site shows a gallery row only when **`file` exists in the manifest**. Entries without a prepared file are ignored, so you never get broken images.

To add photo 21+, add a config item, a new entry in `gallery-entries.json`, run `npm run photos:prepare`, and redeploy.

## 5. Deploy

`public/photos/` is gitignored. Before `npm run build` or a Vercel deploy, run `photos:prepare` on a machine that has the originals and config. Treat anything in `public/photos/` as **public** once the site is live.

## Quick checklist

1. Drop files in `private-photo-input/`.
2. Update `prepare.config.json`.
3. Run `npm run photos:prepare`.
4. Personalize `src/data/gallery-entries.json`.
5. Build and deploy from a machine that has the prepared WebP files.

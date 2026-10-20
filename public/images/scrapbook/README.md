# Scrapbook images (local only)

Place optimized WebP or JPEG files here for the **Digital Scrapbook** page (`/scrapbook`), for example:

- `memory-01.webp`
- `memory-02.webp`

**Do not commit original photographs to git.** Image files in this folder are gitignored. Commit only `README.md` and `.gitkeep`.

After adding a file locally:

1. Strip sensitive EXIF if possible.
2. Register the memory in `src/data/scrapbook.json` (match the `file` field to your basename).
3. Write `alt` text and captions without private identifying details.

Ensure files exist on the machine that runs `npm run build` before deploying to Vercel.

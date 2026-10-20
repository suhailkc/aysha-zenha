# Gallery images (local only)

Place optimized WebP or JPEG files here for the gallery feature, for example:

- `01-portrait.webp`
- `02-celebration.webp`

**Do not commit original photographs to git.** This folder’s image files are listed in `.gitignore`. Commit only `README.md` and `.gitkeep`.

After adding files locally:

1. Strip sensitive EXIF if possible.
2. Register each image in `src/data/gallery.ts` (created in a later phase).
3. Use alt text that describes the photo without private identifying details.

For production builds, ensure these files exist on the machine that runs `npm run build` before deploying to Vercel.

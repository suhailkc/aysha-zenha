# Prepared photos (tracked in git)

WebP files here are produced by **`pnpm photos:prepare`** from originals in `private-photo-input/`.

- **`hero.webp`** — optional homepage portrait
- **`photo-01.webp`**, **`photo-02.webp`**, … — memory gallery

**Prepared `.webp` files are committed** so you can `git pull` on any computer and deploy without re-running prepare. Originals in `private-photo-input/` stay gitignored.

Captions, tags, and alt text live in `src/data/gallery-entries.json`. Sizes and paths are in `src/data/gallery-manifest.json` (updated by the prepare script).

See [docs/photo-workflow.md](../../docs/photo-workflow.md).

**Privacy:** Use a private GitHub repo. Review photos before commit; the live site still treats these URLs as public.

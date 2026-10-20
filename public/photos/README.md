# Prepared photos (local only)

WebP files here are produced by **`npm run photos:prepare`** from originals in `private-photo-input/`.

- **`hero.webp`** — optional homepage portrait
- **`photo-01.webp`**, **`photo-02.webp`**, … — memory gallery

Image binaries in this folder are **gitignored**. Run the prepare script on any machine before `npm run build` or deploy.

Captions, tags, and alt text live in `src/data/gallery-entries.json`. See [docs/photo-workflow.md](../../docs/photo-workflow.md).

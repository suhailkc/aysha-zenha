# Private photo input

Put **original** JPEG, PNG, or WebP files here. They stay on your machine only; this folder is gitignored (except this README and `prepare.config.json`).

1. Copy photos into this directory.
2. List each file in `prepare.config.json` with a safe output name (for example `photo-01.webp` or `hero.webp`).
3. Run `npm run photos:prepare` from the project root.
4. Edit captions, tags, and alt text in `src/data/gallery-entries.json`.

See [docs/photo-workflow.md](../docs/photo-workflow.md) for the full process.

# Editing love notes and scrapbook content

All family copy lives in local data files. The site renders **only** what you put in these files. There is no public form, database, or visitor storage.

## Family love notes (`/messages`)

**File to edit:** `src/data/messages.json`

Each object in the array is one card. **Display order = array order.** To reorder, move objects up or down. To remove a note, delete its object. To add a note, append a new object with a unique `id`.

| Field | Required | Description |
|-------|----------|-------------|
| `id` | yes | Stable id (e.g. `note-from-aunt`) |
| `message` | yes | Short message text |
| `sticker` | yes | One of: `heart`, `star`, `flower`, `sparkle`, `sun` |
| `author` | no | Sender label or family role |
| `category` | no | `encouragement`, `birthday`, `love`, `cheer`, `gratitude` |
| `accent` | no | Card tint: `lavender`, `pink`, `mint`, `butter` |

Page titles and empty-state copy: `src/data/messages-page.ts`.

Types: `src/types/content.ts` (`FamilyMessage`).

## Digital scrapbook (`/scrapbook`)

**File to edit:** `src/data/scrapbook.json`

**Photos folder:** `public/images/scrapbook/` (see `public/images/scrapbook/README.md`)

Each object is one spread. **Display order = array order.**

| Field | Required | Description |
|-------|----------|-------------|
| `id` | yes | Stable id (e.g. `memory-03`) |
| `alt` | yes | Accessible description of the photo (no private details) |
| `caption` | yes | Visible caption under the photo |
| `file` | no | Basename in `public/images/scrapbook/` (e.g. `memory-03.webp`) |
| `note` | no | Extra short note on the spread |
| `yearOrCategory` | no | Broad year or grouping, only if the family approved it |
| `accent` | no | Spread tint: `lavender`, `pink`, `mint`, `butter` |

If `file` is omitted or the file is not on disk yet, the spread shows a friendly placeholder until you add the image.

Page titles and empty-state copy: `src/data/scrapbook-page.ts`.

Types: `src/types/content.ts` (`ScrapbookMemoryEntry`).

## Empty states

Set either JSON file to `[]` to show the empty state on that page (and a short hint on the home love-notes preview).

## Privacy reminders

- Do not add school names, addresses, full dates of birth, or other identifying details unless you intend them to be public on deploy.
- Do not invent memories or quotes; replace placeholders with family-authored text only.

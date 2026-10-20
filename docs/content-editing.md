# Editing love notes and karate content

All family copy lives in local data files. The site renders **only** what you put in these files. There is no public form, database, or visitor storage.

## Homepage Karate Corner (`/`)

**File to edit:** `src/data/home.ts` (planned block: `karateCorner`)

Use family-approved copy only. Verified fact for the site: Aysha is passionate about karate and her latest achieved belt is **Orange Belt**. Do not add dojo names, instructors, competition results, or future belts unless the family explicitly adds them elsewhere.

| Field (planned) | Description |
|-----------------|-------------|
| `badgeTitle` | e.g. Orange Belt Champion |
| `tagline` | e.g. Little warrior. Big determination. |
| `values` | Short labels: Focus, Discipline, Courage |
| `ctaLabel` / `ctaHref` | Link text and path to `/karate` |
| `photoAlt` | Alt for an approved karate photo when `public/images/karate/` has a file |

Illustration or placeholder shows until an approved photo is added.

## Family love notes (home preview on `/`)

**File to edit:** `src/data/messages.json`

Each object in the array is one card. **Display order = array order.** To reorder, move objects up or down. To remove a note, delete its object. To add a note, append a new object with a unique `id`. The homepage shows up to three cards from this file.

| Field | Required | Description |
|-------|----------|-------------|
| `id` | yes | Stable id (e.g. `note-from-aunt`) |
| `message` | yes | Short message text |
| `sticker` | yes | One of: `heart`, `star`, `flower`, `sparkle`, `sun` |
| `author` | no | Sender label or family role |
| `category` | no | `encouragement`, `birthday`, `love`, `cheer`, `gratitude` |
| `accent` | no | Card tint: `lavender`, `pink`, `mint`, `butter` |

Section headings on the homepage: `src/data/home.ts` (`loveNotes`).

Types: `src/types/content.ts` (`FamilyMessage`).

## Karate Journey (`/karate`)

**File to edit:** `src/data/karate-journey.json` (when implemented)

**Photos folder:** `public/images/karate/` (approved public karate photos only)

Each object is one milestone card. **Display order = array order.** Do not add a full belt ladder with unearned belts marked complete.

| Field | Required | Description |
|-------|----------|-------------|
| `id` | yes | Stable id (e.g. `orange-belt`) |
| `title` | yes | Achievement title (e.g. Orange Belt) |
| `caption` | yes | Family-written caption; no dojo/school name or address |
| `alt` | yes if `file` set | Accessible photo description |
| `file` | no | Basename in `public/images/karate/` |
| `date` | no | Optional milestone date **only if the family wants it public** |

Seed content should include **Orange Belt** as the verified current achievement. Add more milestones only when they are real and approved.

Page titles and hints: `src/data/karate-page.ts` (when implemented).

Types: `src/types/content.ts` (`KarateMilestone` when added).

## Memory gallery karate photos

**File to edit:** `src/data/gallery-entries.json`

When the gallery supports a karate tag, use it for approved karate snapshots. Keep captions free of school names, schedules, and locations. See `docs/photo-workflow.md`.

## Empty states

Set `messages.json` to `[]` to hide love note cards on the homepage (a short hint still appears).

## Privacy reminders

- Do not add school names, addresses, full dates of birth, karate school or dojo names, training schedules or locations, or other identifying details unless you intend them to be public on deploy.
- Do not invent memories, quotes, belt progress, or tournament results; replace placeholders with family-authored text only.

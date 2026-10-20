import scrapbookJson from "@/data/scrapbook.json";
import { publicFileExists } from "@/lib/public-asset";
import type { ScrapbookMemory, ScrapbookMemoryEntry } from "@/types/content";

const SCRAPBOOK_IMAGE_DIR = "images/scrapbook";

const entries = scrapbookJson as ScrapbookMemoryEntry[];

function resolveEntry(entry: ScrapbookMemoryEntry): ScrapbookMemory {
  if (!entry.file) {
    return { ...entry };
  }

  const relative = `${SCRAPBOOK_IMAGE_DIR}/${entry.file}`;
  if (!publicFileExists(relative)) {
    return { ...entry };
  }

  return {
    ...entry,
    src: `/images/scrapbook/${entry.file}`,
  };
}

/** Curated scrapbook spreads (order in JSON is display order). */
export function getScrapbookMemories(): ScrapbookMemory[] {
  return entries.map(resolveEntry);
}

import galleryEntries from "@/data/gallery-entries.json";
import galleryManifest from "@/data/gallery-manifest.json";
import { publicFileExists } from "@/lib/public-asset";
import type {
  GalleryManifest,
  GalleryPhoto,
  GalleryPhotoEntry,
  GalleryTagId,
} from "@/types/content";

const manifest = galleryManifest as GalleryManifest;
const entries = galleryEntries as GalleryPhotoEntry[];

const manifestByOutput = new Map(
  manifest.files.map((file) => [file.output, file]),
);

/** Photos that exist in the manifest (no broken image URLs). */
export function getResolvedGalleryPhotos(): GalleryPhoto[] {
  const resolved: GalleryPhoto[] = [];

  for (const entry of entries) {
    const fileMeta = manifestByOutput.get(entry.file);
    if (!fileMeta) {
      continue;
    }
    if (!publicFileExists(fileMeta.src)) {
      continue;
    }

    resolved.push({
      id: entry.id,
      src: fileMeta.src,
      alt: entry.alt,
      caption: entry.caption,
      tags: entry.tags ?? [],
      width: fileMeta.width,
      height: fileMeta.height,
    });
  }

  return resolved;
}

export function isGalleryTagId(value: string): value is GalleryTagId {
  return (
    value === "everyday" ||
    value === "celebrations" ||
    value === "adventures" ||
    value === "goofy-moments" ||
    value === "karate"
  );
}

export const galleryPreviewCount = 4;

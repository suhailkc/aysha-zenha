import { galleryPreviewCount, getResolvedGalleryPhotos } from "@/lib/gallery";

export { galleryPreviewCount, getResolvedGalleryPhotos };

/** @deprecated Import getResolvedGalleryPhotos() — only includes prepared files from the manifest. */
export const galleryPhotos = getResolvedGalleryPhotos();

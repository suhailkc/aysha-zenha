import { siteConfig } from "@/data/site";
import Image from "next/image";

const KARATE_TITLE_ICON = "/images/decor/karate-title-icon.png";

/** Centered site title — scrolls with the page (not a navbar). */
export function SiteNameTitle() {
  return (
    <div className="px-4 pt-8 pb-2 text-center sm:px-6 sm:pt-10 sm:pb-4">
      <p className="flex flex-wrap items-center justify-center gap-3 font-display text-2xl font-semibold tracking-tight text-plum sm:gap-3.5 sm:text-3xl md:text-4xl">
        <Image
          src={KARATE_TITLE_ICON}
          alt=""
          aria-hidden
          width={384}
          height={384}
          priority
          unoptimized
          className="h-14 w-14 shrink-0 object-contain sm:h-16 sm:w-16 md:h-[4.5rem] md:w-[4.5rem]"
        />
        <span>{siteConfig.displayName}</span>
      </p>
    </div>
  );
}

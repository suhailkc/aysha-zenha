import { siteConfig } from "@/data/site";
import Image from "next/image";

const KARATE_TITLE_ICON = "/images/decor/karate-title-icon.png";

/** Centered site title — scrolls with the page (not a navbar). */
export function SiteNameTitle() {
  return (
    <div className="px-4 pt-6 pb-1 text-center sm:px-6 sm:pt-10 sm:pb-4">
      <p className="flex flex-wrap items-center justify-center gap-2 font-display text-xl font-semibold tracking-tight text-plum min-[360px]:gap-3 min-[360px]:text-2xl sm:gap-3.5 sm:text-3xl md:text-4xl">
        <span
          className="karate-title-icon inline-flex h-14 w-14 shrink-0 sm:h-16 sm:w-16 md:h-[4.5rem] md:w-[4.5rem]"
          aria-hidden
        >
          <span className="karate-title-icon__inner block h-full w-full">
            <Image
              src={KARATE_TITLE_ICON}
              alt=""
              width={384}
              height={384}
              priority
              unoptimized
              className="h-full w-full object-contain"
            />
          </span>
        </span>
        <span>{siteConfig.displayName}</span>
      </p>
    </div>
  );
}

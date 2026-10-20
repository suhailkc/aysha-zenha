import { siteConfig } from "@/data/site";

export function SiteFooter() {
  return (
    <footer className="site-content-pad mt-auto border-t border-plum/8 px-4 py-8 sm:px-6">
      <p className="mx-auto max-w-6xl text-center font-display text-base text-plum/90">
        {siteConfig.footerMessage}
      </p>
    </footer>
  );
}

import { SiteFooter } from "@/components/layout/SiteFooter";
import { DecorativeDoodle } from "@/components/ui/DecorativeDoodle";
import { cn } from "@/lib/cn";
import type { ReactNode } from "react";

type ScrapbookShellProps = {
  children: ReactNode;
  className?: string;
};

export function ScrapbookShell({ children, className }: ScrapbookShellProps) {
  return (
    <div className={cn("scrapbook-bg flex min-h-full flex-col", className)}>
      <div
        aria-hidden
        className="pointer-events-none fixed inset-0 z-0 overflow-hidden"
      >
        <DecorativeDoodle
          variant="star"
          size={28}
          className="absolute left-[6%] top-[12%] text-lavender/70"
        />
        <DecorativeDoodle
          variant="sparkle"
          size={32}
          className="absolute right-[8%] top-[18%] text-butter/90"
        />
        <DecorativeDoodle
          variant="flower"
          size={26}
          className="absolute bottom-[22%] left-[4%] text-mint/80"
        />
        <DecorativeDoodle
          variant="heart"
          size={22}
          className="absolute bottom-[14%] right-[10%] text-bubblegum/75"
        />
      </div>
      <div className="relative z-10 flex min-h-full flex-1 flex-col">
        <a href="#site-main" className="skip-link">
          Skip to main content
        </a>
        {children}
        <SiteFooter />
      </div>
    </div>
  );
}

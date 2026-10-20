"use client";

import { siteConfig } from "@/data/site";
import { cn } from "@/lib/cn";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

function normalizeHash(hash: string) {
  return hash.replace(/^#/, "");
}

function isNavItemActive(
  pathname: string,
  hash: string,
  itemHref: string,
): boolean {
  const [pathPart, hashPart] = itemHref.split("#");
  const targetPath = pathPart || "/";
  const targetHash = normalizeHash(hashPart ?? "");

  if (targetPath === "/gallery") {
    return pathname === "/gallery";
  }

  if (pathname !== "/") {
    return false;
  }

  if (targetHash) {
    if (!hash) {
      return itemHref === "/" && targetHash === "";
    }
    return normalizeHash(hash) === targetHash;
  }

  return itemHref === "/" && !hash;
}

function SiteNavLink({
  href,
  label,
  active,
  compact,
}: {
  href: string;
  label: string;
  active: boolean;
  compact?: boolean;
}) {
  return (
    <Link
      href={href}
      aria-current={active ? "page" : undefined}
      className={cn(
        "inline-flex min-h-11 min-w-11 flex-1 flex-col items-center justify-center gap-0.5 rounded-scrapbook-lg px-2 py-1.5 font-display text-xs font-semibold leading-tight transition-colors sm:min-h-[var(--space-touch-min)] sm:flex-none sm:flex-row sm:gap-2 sm:px-4 sm:text-sm",
        compact && "flex-1",
        active
          ? "bg-lavender/55 text-plum shadow-[var(--shadow-paper)]"
          : "text-plum/80 hover:bg-white/60 hover:text-plum",
      )}
    >
      {label}
    </Link>
  );
}

/** Mobile bottom bar + compact desktop links for the two-route scrapbook site. */
export function SiteNavigation() {
  const pathname = usePathname();
  const [hash, setHash] = useState("");

  useEffect(() => {
    const sync = () => setHash(window.location.hash);
    sync();
    window.addEventListener("hashchange", sync);
    return () => window.removeEventListener("hashchange", sync);
  }, [pathname]);

  const items = siteConfig.navigation;

  return (
    <>
      <nav
        aria-label="Site sections"
        className="mx-auto hidden max-w-3xl flex-wrap items-center justify-center gap-1 px-4 pb-2 sm:flex sm:gap-2 sm:px-6"
      >
        {items.map((item) => (
          <SiteNavLink
            key={item.id}
            href={item.href}
            label={item.label}
            active={isNavItemActive(pathname, hash, item.href)}
          />
        ))}
      </nav>

      <nav
        aria-label="Site sections"
        className="site-bottom-nav fixed inset-x-0 bottom-0 z-40 border-t border-plum/10 bg-cream/92 backdrop-blur-md sm:hidden"
      >
        <div className="mx-auto flex max-w-lg items-stretch justify-between gap-0.5 px-2 pt-1">
          {items.map((item) => (
            <SiteNavLink
              key={item.id}
              href={item.href}
              label={item.shortLabel}
              compact
              active={isNavItemActive(pathname, hash, item.href)}
            />
          ))}
        </div>
      </nav>
    </>
  );
}

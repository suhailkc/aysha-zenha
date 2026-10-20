import { cn } from "@/lib/cn";

/** Beyond this, a dot per page wraps on narrow screens — use prev/next + text instead. */
const MAX_DOT_PAGES = 6;

type CarouselPaginationProps = {
  pageCount: number;
  activePage: number;
  onSelectPage: (page: number) => void;
  ariaLabel: string;
  getPageAriaLabel: (page: number) => string;
  compactLabel: string;
};

export function CarouselPagination({
  pageCount,
  activePage,
  onSelectPage,
  ariaLabel,
  getPageAriaLabel,
  compactLabel,
}: CarouselPaginationProps) {
  if (pageCount <= 1) {
    return null;
  }

  const canGoPrev = activePage > 0;
  const canGoNext = activePage < pageCount - 1;

  if (pageCount > MAX_DOT_PAGES) {
    return (
      <div
        className="flex items-center justify-center gap-2 sm:gap-3"
        aria-label={ariaLabel}
      >
        <button
          type="button"
          className="btn-secondary min-h-11 px-4 py-2 text-sm disabled:opacity-45"
          disabled={!canGoPrev}
          aria-label={`Previous ${compactLabel}`}
          onClick={() => onSelectPage(activePage - 1)}
        >
          Prev
        </button>
        <p
          className="min-w-[5.5rem] text-center font-display text-sm font-semibold tabular-nums text-plum"
          aria-live="polite"
          aria-atomic="true"
        >
          {activePage + 1} / {pageCount}
        </p>
        <button
          type="button"
          className="btn-secondary min-h-11 px-4 py-2 text-sm disabled:opacity-45"
          disabled={!canGoNext}
          aria-label={`Next ${compactLabel}`}
          onClick={() => onSelectPage(activePage + 1)}
        >
          Next
        </button>
      </div>
    );
  }

  return (
    <div
      className="flex max-w-full justify-center overflow-x-auto overscroll-x-contain pb-1"
      role="tablist"
      aria-label={ariaLabel}
    >
      <div className="flex flex-nowrap items-center gap-0.5 sm:gap-1">
        {Array.from({ length: pageCount }, (_, page) => {
          const selected = page === activePage;
          return (
            <button
              key={page}
              type="button"
              role="tab"
              aria-selected={selected}
              aria-label={getPageAriaLabel(page)}
              className={cn(
                "inline-flex min-h-11 min-w-11 shrink-0 items-center justify-center rounded-full",
                "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-lavender",
              )}
              onClick={() => onSelectPage(page)}
            >
              <span
                aria-hidden
                className={cn(
                  "h-2.5 w-2.5 rounded-full border border-lavender/40 transition-colors",
                  selected
                    ? "bg-lavender"
                    : "bg-white/80 hover:bg-lavender/35",
                )}
              />
            </button>
          );
        })}
      </div>
    </div>
  );
}

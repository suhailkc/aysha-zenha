import { DecorativeDoodle } from "@/components/ui/DecorativeDoodle";
import { cn } from "@/lib/cn";

type BirthdayIllustrationProps = {
  variant: "countdown" | "birthday";
  className?: string;
};

export function BirthdayIllustration({
  variant,
  className,
}: BirthdayIllustrationProps) {
  const isBirthday = variant === "birthday";

  return (
    <div
      className={cn(
        "relative mx-auto flex h-40 w-full max-w-xs items-center justify-center sm:h-44",
        className,
      )}
      aria-hidden
    >
      <div
        className={cn(
          "relative flex h-32 w-32 items-center justify-center rounded-scrapbook-2xl border-2 border-dashed border-plum/15 bg-white/70 shadow-paper",
          isBirthday &&
            "border-bubblegum/40 bg-gradient-to-br from-lavender/30 via-bubblegum/25 to-butter/35",
        )}
      >
        <DecorativeDoodle
          variant={isBirthday ? "smiley" : "planet"}
          size={isBirthday ? 56 : 52}
          className={cn(
            isBirthday ? "text-bubblegum" : "text-lavender",
          )}
        />
        <DecorativeDoodle
          variant="star"
          size={22}
          className="absolute -left-3 top-2 text-butter"
        />
        <DecorativeDoodle
          variant="sparkle"
          size={20}
          className="absolute -right-2 bottom-3 text-mint"
        />
        {isBirthday ? (
          <DecorativeDoodle
            variant="heart"
            size={18}
            className="absolute -bottom-2 left-6 text-lavender"
          />
        ) : null}
      </div>
      <DecorativeDoodle
        variant="flower"
        size={24}
        className="absolute right-4 top-0 text-mint/90"
      />
    </div>
  );
}

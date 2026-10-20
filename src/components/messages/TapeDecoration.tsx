import { cn } from "@/lib/cn";

type TapeDecorationProps = {
  className?: string;
  variant?: "butter" | "mint" | "lavender";
};

const variantClass = {
  butter: "scrapbook-tape--butter",
  mint: "scrapbook-tape--mint",
  lavender: "scrapbook-tape--lavender",
} as const;

export function TapeDecoration({
  className,
  variant = "butter",
}: TapeDecorationProps) {
  return (
    <span
      aria-hidden
      className={cn("scrapbook-tape", variantClass[variant], className)}
    />
  );
}

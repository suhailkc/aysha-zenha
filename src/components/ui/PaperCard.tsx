import { cn } from "@/lib/cn";
import type { HTMLAttributes, ReactNode } from "react";

type PaperCardProps = HTMLAttributes<HTMLDivElement> & {
  children: ReactNode;
  padding?: "sm" | "md" | "lg";
  elevated?: boolean;
};

const paddingStyles = {
  sm: "p-4 sm:p-5",
  md: "p-5 sm:p-7",
  lg: "p-6 sm:p-9",
} as const;

export function PaperCard({
  children,
  className,
  padding = "md",
  elevated = false,
  ...props
}: PaperCardProps) {
  return (
    <div
      className={cn(
        "paper-card",
        paddingStyles[padding],
        elevated && "shadow-paper-lifted",
        className,
      )}
      {...props}
    >
      {children}
    </div>
  );
}

"use client";

import { cn } from "@/lib/cn";
import type { ButtonHTMLAttributes, ReactNode } from "react";

type GameChoiceButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  children: ReactNode;
  selected?: boolean;
  compact?: boolean;
};

export function GameChoiceButton({
  children,
  className,
  selected = false,
  compact = false,
  type = "button",
  ...props
}: GameChoiceButtonProps) {
  return (
    <button
      type={type}
      className={cn(
        "fun-zone-choice",
        compact && "fun-zone-choice--compact",
        selected && "fun-zone-choice--selected",
        className,
      )}
      aria-pressed={selected}
      {...props}
    >
      {children}
    </button>
  );
}

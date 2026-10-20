"use client";

import { PrimaryButton } from "@/components/ui/PrimaryButton";
import { SecondaryButton } from "@/components/ui/SecondaryButton";
import { cn } from "@/lib/cn";
import { forwardRef, type ButtonHTMLAttributes, type ReactNode } from "react";

export type SurpriseButtonVariant = "primary" | "secondary" | "sticker";

type SurpriseButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  children: ReactNode;
  variant?: SurpriseButtonVariant;
  className?: string;
};

export const SurpriseButton = forwardRef<HTMLButtonElement, SurpriseButtonProps>(
  function SurpriseButton(
    { children, variant = "secondary", className, type = "button", ...props },
    ref,
  ) {
    if (variant === "primary") {
      return (
        <PrimaryButton className={cn(className)} type={type} {...props}>
          {children}
        </PrimaryButton>
      );
    }

    if (variant === "sticker") {
      return (
        <button
          ref={ref}
          type={type}
          className={cn(
            "sticker-tap inline-flex min-h-[var(--space-touch-min)] min-w-[var(--space-touch-min)] items-center justify-center",
            "rounded-scrapbook-md border-2 border-plum/15 bg-white/80 shadow-[var(--shadow-sticker)]",
            "font-display text-sm font-semibold text-plum",
            "transition-[transform,box-shadow,background-color] duration-150 ease-out",
            "hover:-translate-y-0.5 hover:bg-lavender/30 hover:shadow-paper-lifted",
            "active:translate-y-0",
            "motion-reduce:hover:translate-y-0",
            className,
          )}
          {...props}
        >
          {children}
        </button>
      );
    }

    return (
      <SecondaryButton ref={ref} className={cn(className)} type={type} {...props}>
        {children}
      </SecondaryButton>
    );
  },
);

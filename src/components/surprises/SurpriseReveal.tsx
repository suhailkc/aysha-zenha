"use client";

import { PaperCard } from "@/components/ui/PaperCard";
import { SecondaryButton } from "@/components/ui/SecondaryButton";
import { Sticker, type StickerAccent } from "@/components/ui/Sticker";
import { cn } from "@/lib/cn";
import { useModalLayer } from "@/lib/modal-layer";
import { useEffect, useId, useRef, type ReactNode } from "react";

type SurpriseRevealBase = {
  isOpen: boolean;
  onClose: () => void;
  children?: ReactNode;
  className?: string;
  closeLabel?: string;
  backdropCloseLabel?: string;
  showCloseButton?: boolean;
};

type SurpriseRevealDialog = SurpriseRevealBase & {
  mode: "dialog";
  title: string;
  badge?: string;
  badgeAccent?: StickerAccent;
};

type SurpriseRevealInline = SurpriseRevealBase & {
  mode: "inline";
  revealId: string;
  title?: string;
  live?: "polite" | "assertive";
};

export type SurpriseRevealProps = SurpriseRevealDialog | SurpriseRevealInline;

export function SurpriseReveal(props: SurpriseRevealProps) {
  const {
    isOpen,
    onClose,
    children,
    className,
    closeLabel = "Close",
    backdropCloseLabel = "Close dialog",
    showCloseButton = true,
  } = props;

  const autoTitleId = useId();
  const closeRef = useRef<HTMLButtonElement>(null);

  useModalLayer(isOpen && props.mode === "dialog", onClose);

  useEffect(() => {
    if (!isOpen || props.mode !== "dialog") {
      return;
    }
    closeRef.current?.focus();
  }, [isOpen, props.mode]);

  if (!isOpen) {
    return null;
  }

  if (props.mode === "inline") {
    const titleId = props.title ? `${props.revealId}-title` : undefined;
    return (
      <div
        id={props.revealId}
        role="region"
        aria-labelledby={titleId}
        aria-live={props.live ?? "polite"}
        className={cn("surprise-reveal-inline", className)}
      >
        {props.title ? (
          <p
            id={titleId}
            className="font-display text-lg font-semibold text-plum"
          >
            {props.title}
          </p>
        ) : null}
        <div className={props.title ? "mt-2" : undefined}>{children}</div>
        {showCloseButton ? (
          <div className="mt-4 flex justify-end">
            <SecondaryButton type="button" onClick={onClose}>
              {closeLabel}
            </SecondaryButton>
          </div>
        ) : null}
      </div>
    );
  }

  const titleId = autoTitleId;

  return (
    <div
      className="fixed inset-0 z-50 flex items-end justify-center p-4 sm:items-center"
      role="presentation"
    >
      <button
        type="button"
        className="absolute inset-0 bg-plum/25 backdrop-blur-[2px]"
        aria-label={backdropCloseLabel}
        onClick={onClose}
      />
      <PaperCard
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        elevated
        className={cn(
          "relative z-10 w-full max-w-md surprise-reveal-dialog",
          className,
        )}
      >
        {props.badge ? (
          <div className="flex flex-wrap items-center gap-2">
            <Sticker accent={props.badgeAccent ?? "butter"} tilt="right">
              {props.badge}
            </Sticker>
          </div>
        ) : null}
        <p
          id={titleId}
          className={cn(
            "font-display text-xl font-semibold text-plum",
            props.badge ? "mt-4" : undefined,
          )}
        >
          {props.title}
        </p>
        {children ? <div className="mt-3 text-secondary">{children}</div> : null}
        {showCloseButton ? (
          <div className="mt-6 flex justify-end">
            <SecondaryButton ref={closeRef} type="button" onClick={onClose}>
              {closeLabel}
            </SecondaryButton>
          </div>
        ) : null}
      </PaperCard>
    </div>
  );
}

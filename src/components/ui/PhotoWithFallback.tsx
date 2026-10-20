"use client";

import { cn } from "@/lib/cn";
import Image, { type ImageProps } from "next/image";
import { useState } from "react";

type PhotoWithFallbackProps = Omit<ImageProps, "onError"> & {
  fallbackLabel: string;
  fallbackClassName?: string;
};

export function PhotoWithFallback({
  fallbackLabel,
  fallbackClassName,
  alt,
  className,
  ...imageProps
}: PhotoWithFallbackProps) {
  const [failed, setFailed] = useState(false);

  if (failed) {
    return (
      <div
        className={cn(
          "flex items-center justify-center bg-linear-to-br from-lavender/25 via-bubblegum/15 to-mint/25 p-4 text-center",
          fallbackClassName,
          className,
        )}
        role="img"
        aria-label={typeof alt === "string" && alt.length > 0 ? alt : fallbackLabel}
      >
        <p className="font-display text-sm font-semibold text-plum/80">
          {fallbackLabel}
        </p>
      </div>
    );
  }

  return (
    <Image
      {...imageProps}
      alt={alt}
      className={className}
      onError={() => setFailed(true)}
    />
  );
}

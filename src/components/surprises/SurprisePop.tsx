"use client";

import { SurpriseMeControl } from "@/components/surprises/SurpriseMeControl";

type SurprisePopProps = {
  label: string;
  className?: string;
};

/** Hero-sized “Surprise me” — uses shared surprise pool and dialog reveal. */
export function SurprisePop({ label, className }: SurprisePopProps) {
  return <SurpriseMeControl buttonLabel={label} className={className} />;
}

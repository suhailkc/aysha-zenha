"use client";

import { BirthdayCountdownWidget } from "@/components/countdown/BirthdayCountdownWidget";
import { BirthdayDevPreviewPanel } from "@/components/countdown/BirthdayDevPreviewPanel";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { countdownContent } from "@/data/countdown";
import { Suspense } from "react";

function CountdownWidgetFallback() {
  return (
    <div
      className="paper-card p-8 text-center shadow-paper-lifted"
      aria-busy="true"
    >
      <p className="font-display text-lg text-plum">
        {countdownContent.loadingLabel}
      </p>
    </div>
  );
}

export function BirthdayCountdownSection() {
  return (
    <>
      <SectionHeading
        as="h1"
        title={countdownContent.pageTitle}
        subtitle={countdownContent.pageSubtitle}
      />
      <div className="mt-8">
        <Suspense fallback={<CountdownWidgetFallback />}>
          <BirthdayCountdownWidget />
        </Suspense>
      </div>
      <BirthdayDevPreviewPanel />
    </>
  );
}

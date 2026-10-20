"use client";

import { BirthdayIllustration } from "@/components/countdown/BirthdayIllustration";
import { PaperCard } from "@/components/ui/PaperCard";
import { SecondaryButton } from "@/components/ui/SecondaryButton";
import { Sticker } from "@/components/ui/Sticker";
import { countdownContent } from "@/data/countdown";
import { subscribeBirthdayClock } from "@/lib/birthday-clock-subscribe";
import {
  markBirthdayConfettiShownThisSession,
  wasBirthdayConfettiShownThisSession,
} from "@/lib/birthday-mode";
import {
  getBirthdayStatusSnapshot,
  LOADING_STATUS_SNAPSHOT,
  parseBirthdayStatusSnapshot,
} from "@/lib/birthday-status-store";
import {
  prefersReducedMotion,
  runConfettiBurst,
} from "@/lib/confetti-burst";
import { cn } from "@/lib/cn";
import { useSearchParams } from "next/navigation";
import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
  useSyncExternalStore,
} from "react";

function useClientBirthdayStatus(searchKey: string) {
  const snapshot = useSyncExternalStore(
    subscribeBirthdayClock,
    () => getBirthdayStatusSnapshot(searchKey),
    () => LOADING_STATUS_SNAPSHOT,
  );

  return useMemo(
    () => parseBirthdayStatusSnapshot(snapshot),
    [snapshot],
  );
}

export function BirthdayCountdownWidget() {
  const searchParams = useSearchParams();
  const searchKey = searchParams.toString();
  const status = useClientBirthdayStatus(searchKey);

  const canvasRef = useRef<HTMLCanvasElement>(null);
  const stopBurstRef = useRef<(() => void) | null>(null);
  const autoConfettiAttemptedRef = useRef(false);

  const [celebrateNote, setCelebrateNote] = useState<string | null>(null);

  useEffect(() => {
    return () => {
      stopBurstRef.current?.();
    };
  }, []);

  useEffect(() => {
    if (status?.phase !== "birthday") {
      return;
    }
    if (autoConfettiAttemptedRef.current) {
      return;
    }
    autoConfettiAttemptedRef.current = true;
    if (wasBirthdayConfettiShownThisSession()) {
      return;
    }
    if (prefersReducedMotion()) {
      return;
    }
    const canvas = canvasRef.current;
    if (!canvas) {
      return;
    }
    stopBurstRef.current?.();
    stopBurstRef.current = runConfettiBurst(canvas);
    markBirthdayConfettiShownThisSession();
  }, [status]);

  const launchConfetti = useCallback(() => {
    stopBurstRef.current?.();
    setCelebrateNote(null);

    if (prefersReducedMotion()) {
      setCelebrateNote(countdownContent.celebrateReducedMotion);
      return;
    }

    const canvas = canvasRef.current;
    if (!canvas) {
      return;
    }

    stopBurstRef.current = runConfettiBurst(canvas);
    window.setTimeout(() => {
      setCelebrateNote(countdownContent.celebrateManualNote);
    }, 400);
  }, []);

  const dismissNote = useCallback(() => {
    setCelebrateNote(null);
  }, []);

  const isLoading = status === null;
  const isBirthday = status?.phase === "birthday";
  const daysRemaining =
    status?.phase === "countdown" ? status.daysRemaining : null;

  return (
    <>
      <canvas
        ref={canvasRef}
        className="confetti-canvas pointer-events-none fixed inset-0 z-[60]"
        aria-hidden
      />
      <PaperCard
        elevated
        className={cn(
          "relative overflow-visible text-center",
          isBirthday &&
            "ring-2 ring-bubblegum/35 ring-offset-2 ring-offset-cream",
        )}
        aria-busy={isLoading}
      >
        {isBirthday ? (
          <Sticker
            accent="bubblegum"
            tilt="right"
            className="absolute -right-1 -top-3 z-10 shadow-sticker"
          >
            {countdownContent.birthday.sticker}
          </Sticker>
        ) : null}

        <BirthdayIllustration
          variant={isBirthday ? "birthday" : "countdown"}
          className="mb-4"
        />

        {isLoading ? (
          <p className="font-display text-lg text-plum" role="status">
            {countdownContent.loadingLabel}
          </p>
        ) : isBirthday ? (
          <div className="flex flex-col gap-3">
            <h2 className="font-display text-3xl font-semibold tracking-tight text-plum sm:text-4xl">
              {countdownContent.birthday.headline}
            </h2>
            <p className="mx-auto max-w-md text-secondary">
              {countdownContent.birthday.subline}
            </p>
          </div>
        ) : (
          <div className="flex flex-col gap-3">
            <p
              className="font-display text-5xl font-bold tabular-nums text-plum sm:text-6xl"
              aria-hidden
            >
              {daysRemaining}
            </p>
            <p className="sr-only">
              {countdownContent.countdown.headline(daysRemaining ?? 0)}
            </p>
            <h2 className="font-display text-2xl font-semibold text-plum sm:text-3xl">
              {countdownContent.countdown.headline(daysRemaining ?? 0)}
            </h2>
            <p className="mx-auto max-w-md text-sm text-secondary">
              {countdownContent.countdown.subline}
            </p>
          </div>
        )}

        <div className="mt-8 flex flex-col items-center gap-3">
          <SecondaryButton type="button" onClick={launchConfetti}>
            {countdownContent.celebrateButton}
          </SecondaryButton>
          {celebrateNote ? (
            <div
              role="status"
              aria-live="polite"
              className="max-w-sm rounded-scrapbook-md border border-plum/10 bg-white/85 px-4 py-3 text-center shadow-paper"
            >
              <p className="text-sm text-plum">{celebrateNote}</p>
              <button
                type="button"
                className="mt-2 text-xs font-semibold text-secondary underline-offset-2 hover:underline"
                onClick={dismissNote}
              >
                Got it
              </button>
            </div>
          ) : null}
        </div>
      </PaperCard>
    </>
  );
}

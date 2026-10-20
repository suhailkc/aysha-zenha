const listeners = new Set<() => void>();
let tick = 0;

/** Bumped when the tab becomes visible so countdown re-reads the local date. */
export function getBirthdayClockTick(): number {
  return tick;
}

function bumpBirthdayClock(): void {
  tick += 1;
  for (const listener of listeners) {
    listener();
  }
}

function msUntilNextLocalMidnight(from: Date = new Date()): number {
  const next = new Date(
    from.getFullYear(),
    from.getMonth(),
    from.getDate() + 1,
  );
  return Math.max(0, next.getTime() - from.getTime());
}

export function subscribeBirthdayClock(onStoreChange: () => void): () => void {
  listeners.add(onStoreChange);

  const onVisibility = () => {
    if (document.visibilityState === "visible") {
      bumpBirthdayClock();
    }
  };

  document.addEventListener("visibilitychange", onVisibility);

  let midnightTimeout: number | undefined;

  const scheduleMidnightTick = () => {
    midnightTimeout = window.setTimeout(() => {
      bumpBirthdayClock();
      scheduleMidnightTick();
    }, msUntilNextLocalMidnight());
  };

  scheduleMidnightTick();

  return () => {
    listeners.delete(onStoreChange);
    document.removeEventListener("visibilitychange", onVisibility);
    if (midnightTimeout !== undefined) {
      window.clearTimeout(midnightTimeout);
    }
  };
}

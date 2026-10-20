const listeners = new Set<() => void>();
let tick = 0;

/** Bumped when the tab becomes visible so countdown re-reads the local date. */
export function getBirthdayClockTick(): number {
  return tick;
}

export function subscribeBirthdayClock(onStoreChange: () => void): () => void {
  listeners.add(onStoreChange);

  const onVisibility = () => {
    if (document.visibilityState === "visible") {
      tick += 1;
      for (const listener of listeners) {
        listener();
      }
    }
  };

  document.addEventListener("visibilitychange", onVisibility);

  return () => {
    listeners.delete(onStoreChange);
    document.removeEventListener("visibilitychange", onVisibility);
  };
}

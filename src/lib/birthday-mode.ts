export const BIRTHDAY_CONFETTI_SESSION_KEY = "aysha-birthday-confetti-session";

export function wasBirthdayConfettiShownThisSession(): boolean {
  if (typeof sessionStorage === "undefined") {
    return false;
  }
  try {
    return sessionStorage.getItem(BIRTHDAY_CONFETTI_SESSION_KEY) === "1";
  } catch {
    return false;
  }
}

export function markBirthdayConfettiShownThisSession(): void {
  if (typeof sessionStorage === "undefined") {
    return;
  }
  try {
    sessionStorage.setItem(BIRTHDAY_CONFETTI_SESSION_KEY, "1");
  } catch {
    // ignore private mode / quota
  }
}

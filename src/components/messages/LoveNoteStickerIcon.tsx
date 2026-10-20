import { cn } from "@/lib/cn";
import type { LoveNoteStickerId } from "@/types/content";

type LoveNoteStickerIconProps = {
  sticker: LoveNoteStickerId;
  className?: string;
};

export function LoveNoteStickerIcon({
  sticker,
  className,
}: LoveNoteStickerIconProps) {
  return (
    <span
      aria-hidden
      className={cn(
        "love-note-sticker inline-flex h-10 w-10 items-center justify-center rounded-full border border-plum/10 bg-white/80 shadow-[var(--shadow-sticker)]",
        className,
      )}
    >
      <StickerSvg id={sticker} />
    </span>
  );
}

function StickerSvg({ id }: { id: LoveNoteStickerId }) {
  switch (id) {
    case "heart":
      return (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden>
          <path
            d="M12 21s-7-4.5-9.5-9A5.5 5.5 0 0 1 12 6a5.5 5.5 0 0 1 9.5 6c-2.5 4.5-9.5 9-9.5 9z"
            fill="#ffb6d5"
            stroke="#382b4a"
            strokeWidth="1.2"
            strokeLinejoin="round"
          />
        </svg>
      );
    case "star":
      return (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden>
          <path
            d="M12 2.5l2.8 6.5 7 0.6-5.3 4.6 1.6 6.8L12 17.8 5.9 20.9l1.6-6.8-5.3-4.6 7-.6L12 2.5z"
            fill="#ffe69a"
            stroke="#382b4a"
            strokeWidth="1.1"
            strokeLinejoin="round"
          />
        </svg>
      );
    case "flower":
      return (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden>
          <circle cx="12" cy="12" r="3" fill="#ffb6d5" stroke="#382b4a" strokeWidth="1" />
          <circle cx="12" cy="6" r="2.5" fill="#cdb8ff" stroke="#382b4a" strokeWidth="0.9" />
          <circle cx="17" cy="9" r="2.5" fill="#b8ebd2" stroke="#382b4a" strokeWidth="0.9" />
          <circle cx="17" cy="15" r="2.5" fill="#ffe69a" stroke="#382b4a" strokeWidth="0.9" />
          <circle cx="12" cy="18" r="2.5" fill="#cdb8ff" stroke="#382b4a" strokeWidth="0.9" />
          <circle cx="7" cy="15" r="2.5" fill="#b8ebd2" stroke="#382b4a" strokeWidth="0.9" />
          <circle cx="7" cy="9" r="2.5" fill="#ffe69a" stroke="#382b4a" strokeWidth="0.9" />
        </svg>
      );
    case "sparkle":
      return (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden>
          <path
            d="M12 2v4M12 18v4M4 12H2M22 12h-2M5.6 5.6l2.8 2.8M15.6 15.6l2.8 2.8M18.4 5.6l-2.8 2.8M8.4 15.6l-2.8 2.8"
            stroke="#cdb8ff"
            strokeWidth="1.4"
            strokeLinecap="round"
          />
          <circle cx="12" cy="12" r="3.5" fill="#cdb8ff" stroke="#382b4a" strokeWidth="1" />
        </svg>
      );
    case "sun":
      return (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden>
          <circle cx="12" cy="12" r="4.5" fill="#ffe69a" stroke="#382b4a" strokeWidth="1.1" />
          <path
            d="M12 3v2M12 19v2M3 12h2M19 12h2M5.2 5.2l1.4 1.4M17.4 17.4l1.4 1.4M18.8 5.2l-1.4 1.4M6.6 17.4l-1.4 1.4"
            stroke="#382b4a"
            strokeWidth="1.2"
            strokeLinecap="round"
          />
        </svg>
      );
    default:
      return null;
  }
}

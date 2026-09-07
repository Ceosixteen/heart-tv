"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useLiveStatus } from "@/contexts/LiveContext";

const DISMISS_KEY = "live-banner-dismissed-v1";

export default function LiveBanner() {
  const status = useLiveStatus();
  const [dismissed, setDismissed] = useState(true); // start hidden to avoid flash

  useEffect(() => {
    try {
      setDismissed(!!sessionStorage.getItem(DISMISS_KEY));
    } catch {
      setDismissed(false);
    }
  }, []);

  function dismiss() {
    try { sessionStorage.setItem(DISMISS_KEY, "1"); } catch {}
    setDismissed(true);
  }

  // Reset dismiss when a new live session starts (videoId changes)
  const videoId = status?.videoId ?? null;
  useEffect(() => {
    if (!videoId) return;
    try {
      const stored = sessionStorage.getItem(DISMISS_KEY);
      // If the stored key is for a different video, clear it
      if (stored && stored !== videoId) {
        sessionStorage.removeItem(DISMISS_KEY);
        setDismissed(false);
      }
    } catch {}
  }, [videoId]);

  if (!status?.isLive || dismissed) return null;

  const platformLabel = status.platform === "youtube" ? "YouTube" : "Facebook";

  return (
    <div
      role="status"
      aria-live="polite"
      className="fixed inset-x-0 top-[76px] z-40 bg-red-600/95 shadow-[0_2px_12px_-4px_rgb(0_0_0/0.4)] backdrop-blur-sm"
    >
      <div className="mx-auto flex h-10 max-w-7xl items-center justify-between gap-4 px-5 sm:px-8">
        <Link
          href="/live"
          className="flex min-w-0 items-center gap-2.5 text-white transition hover:text-white/85"
        >
          {/* Pulsing dot */}
          <span className="relative flex h-2 w-2 shrink-0">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-white opacity-75" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-white" />
          </span>

          <span className="text-[11px] font-semibold uppercase tracking-[0.15em]">
            LIVE NOW
          </span>

          {status.title && (
            <span className="hidden max-w-[360px] truncate border-l border-white/30 pl-2.5 text-[11px] font-medium text-white/80 sm:block">
              {status.title}
            </span>
          )}

          <span className="text-[11px] text-white/60">
            on {platformLabel} &rarr; Watch
          </span>
        </Link>

        <button
          type="button"
          onClick={dismiss}
          aria-label="Dismiss live notification"
          className="shrink-0 p-1 text-white/60 transition hover:text-white"
        >
          <svg
            viewBox="0 0 24 24"
            className="h-3.5 w-3.5"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            aria-hidden
          >
            <path d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
    </div>
  );
}

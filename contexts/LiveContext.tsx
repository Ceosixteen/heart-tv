"use client";

import { createContext, useContext, useEffect, useState } from "react";
import type { LiveStatus } from "@/lib/live";

const LiveContext = createContext<LiveStatus | null>(null);

export function LiveProvider({ children }: { children: React.ReactNode }) {
  const [status, setStatus] = useState<LiveStatus | null>(null);

  useEffect(() => {
    async function poll() {
      try {
        const res = await fetch("/api/live-status");
        if (res.ok) setStatus(await res.json());
      } catch {}
    }
    poll();
    const id = setInterval(poll, 60_000);
    return () => clearInterval(id);
  }, []);

  return <LiveContext value={status}>{children}</LiveContext>;
}

export function useLiveStatus() {
  return useContext(LiveContext);
}

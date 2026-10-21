"use client";

import { useEffect, useRef, useState } from "react";

type Props = { src: string; title: string; isYouTube: boolean };

function Icon({ name }: { name: "share" | "volume" | "sun" | "expand" | "reduce" }) {
  const paths = {
    share: <><circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><path d="m8.6 10.5 6.8-4M8.6 13.5l6.8 4"/></>,
    volume: <><path d="M11 5 6 9H2v6h4l5 4V5Z"/><path d="M15.5 8.5a5 5 0 0 1 0 7M18 6a8.5 8.5 0 0 1 0 12"/></>,
    sun: <><circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"/></>,
    expand: <path d="M8 3H3v5M16 3h5v5M8 21H3v-5M16 21h5v-5"/>,
    reduce: <path d="M3 8h5V3M21 8h-5V3M3 16h5v5M21 16h-5v5"/>,
  };
  return <svg viewBox="0 0 24 24" aria-hidden className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">{paths[name]}</svg>;
}

export default function LivePlayer({ src, title, isYouTube }: Props) {
  const frame = useRef<HTMLIFrameElement>(null);
  const shell = useRef<HTMLDivElement>(null);
  const [volume, setVolume] = useState(70);
  const [brightness, setBrightness] = useState(100);
  const [fullscreen, setFullscreen] = useState(false);
  const [shared, setShared] = useState(false);

  useEffect(() => {
    const update = () => setFullscreen(document.fullscreenElement === shell.current);
    document.addEventListener("fullscreenchange", update);
    return () => document.removeEventListener("fullscreenchange", update);
  }, []);

  function youtubeCommand(func: string, args: unknown[] = []) {
    if (!isYouTube) return;
    frame.current?.contentWindow?.postMessage(JSON.stringify({ event: "command", func, args }), "*");
  }

  function changeVolume(value: number) {
    setVolume(value);
    youtubeCommand(value === 0 ? "mute" : "unMute");
    if (value > 0) youtubeCommand("setVolume", [value]);
  }

  async function share() {
    const data = { title, text: `Watch ${title} live on Heart TV`, url: window.location.href };
    try {
      if (navigator.share) await navigator.share(data);
      else await navigator.clipboard.writeText(window.location.href);
      setShared(true); window.setTimeout(() => setShared(false), 1800);
    } catch { /* The viewer cancelled sharing. */ }
  }

  async function toggleFullscreen() {
    if (document.fullscreenElement) await document.exitFullscreen();
    else await shell.current?.requestFullscreen();
  }

  return <div ref={shell} className="group relative overflow-hidden rounded-2xl bg-black shadow-[0_24px_80px_-24px_rgb(0_0_0/0.7)]">
    <div className="relative aspect-video w-full">
      <iframe ref={frame} src={src} tabIndex={-1} className="pointer-events-none absolute inset-0 h-full w-full border-0" style={{ filter: `brightness(${brightness}%)` }} allow="autoplay; encrypted-media" title={title} />
      <span className="absolute inset-0 z-10 cursor-default" aria-hidden />
    </div>
    <div className="absolute inset-x-0 bottom-0 z-20 flex flex-wrap items-center gap-3 bg-gradient-to-t from-black/95 via-black/75 to-transparent px-4 pb-4 pt-12 text-white sm:px-6">
      <button type="button" onClick={share} className="inline-flex h-10 items-center gap-2 rounded-full bg-white/15 px-4 text-sm font-semibold backdrop-blur transition hover:bg-white/25" aria-label="Share live broadcast"><Icon name="share" /> <span className="hidden sm:inline">{shared ? "Link copied" : "Share live"}</span></button>
      <label className="flex h-10 items-center gap-2 rounded-full bg-white/15 px-3 backdrop-blur" aria-label="Volume"><Icon name="volume" /><input type="range" min="0" max="100" value={volume} onChange={(event) => changeVolume(Number(event.target.value))} className="w-20 accent-gold sm:w-24" /></label>
      <label className="flex h-10 items-center gap-2 rounded-full bg-white/15 px-3 backdrop-blur" aria-label="Brightness"><Icon name="sun" /><input type="range" min="45" max="140" value={brightness} onChange={(event) => setBrightness(Number(event.target.value))} className="w-20 accent-gold sm:w-24" /></label>
      <button type="button" onClick={toggleFullscreen} className="ml-auto grid h-10 w-10 place-items-center rounded-full bg-white/15 backdrop-blur transition hover:bg-white/25" aria-label={fullscreen ? "Reduce screen" : "Enlarge screen"}><Icon name={fullscreen ? "reduce" : "expand"} /></button>
    </div>
  </div>;
}

"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import type { HeroContent } from "@/lib/content";

export default function HeroVideo({ hero }: { hero: HeroContent }) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [muted, setMuted] = useState(true);
  const [playing, setPlaying] = useState(true);

  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) {
      v.pause();
      setPlaying(false);
      return;
    }
    v.play().catch(() => setPlaying(false));
  }, [hero.videoSrc]);

  const toggleSound = () => {
    const v = videoRef.current;
    if (!v) return;
    v.muted = !v.muted;
    setMuted(v.muted);
  };

  const togglePlay = () => {
    const v = videoRef.current;
    if (!v) return;
    if (v.paused) {
      v.play().catch(() => undefined);
      setPlaying(true);
    } else {
      v.pause();
      setPlaying(false);
    }
  };

  return (
    <section className="relative isolate min-h-[92vh] overflow-hidden bg-navy-deep">
      {/* Media layer */}
      <div className="absolute inset-0 -z-10">
        {hero.videoSrc ? (
          <video
            ref={videoRef}
            className="h-full w-full object-cover"
            src={hero.videoSrc}
            poster={hero.posterSrc || undefined}
            muted={muted}
            loop
            playsInline
            autoPlay
            preload="metadata"
            aria-label="Heart TV partnership film"
          />
        ) : hero.posterSrc ? (
          <Image
            src={hero.posterSrc}
            alt=""
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
        ) : (
          <div className="h-full w-full bg-[radial-gradient(120%_90%_at_20%_10%,#2b25c4_0%,#161274_55%,#05063a_100%)] grain" />
        )}
        <div className="absolute inset-0 bg-gradient-to-b from-navy-deep/85 via-navy-deep/55 to-navy-deep" />
        <div className="absolute inset-0 bg-gradient-to-r from-navy-deep/90 via-navy-deep/35 to-transparent" />
        {/* Drifting light over the footage, like a studio wash — sits above the
            darkening gradients so it still reads against the photo beneath. */}
        <div className="scanlines absolute inset-0 opacity-60" />
        <div className="orb orb-a absolute -left-[10%] -top-[30%] h-[50vw] max-h-[480px] w-[50vw] max-w-[480px] bg-azure/[0.18]" />
        <div className="orb orb-b absolute -bottom-[35%] right-[5%] h-[42vw] max-h-[400px] w-[42vw] max-w-[400px] bg-gold/[0.12]" />
      </div>

      <div className="mx-auto flex min-h-[92vh] max-w-7xl flex-col justify-end px-5 pb-16 pt-36 sm:px-8 sm:pb-24">
        <div className="max-w-3xl">
          <p className="eyebrow inline-flex items-center gap-2 rounded-full border border-gold/40 bg-gold/10 px-4 py-2 text-gold">
            <span className="h-1.5 w-1.5 rounded-full bg-gold" />
            Heart TV Partnership
          </p>

          <h1 className="display mt-7 text-[clamp(2.5rem,6.4vw,4.6rem)] text-white">
            {hero.headline}
          </h1>

          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-white/75 sm:text-xl">
            {hero.subhead}
          </p>

          <div className="mt-10 flex flex-wrap items-center gap-4">
            <Link
              href="#join"
              className="inline-flex items-center gap-2 rounded-full bg-azure px-8 py-4 text-base font-semibold text-ink shadow-[0_18px_40px_-18px_rgb(36_170_245/0.75)] transition hover:bg-white"
            >
              Become a Partner
              <span aria-hidden>&rarr;</span>
            </Link>
            <Link
              href="#where"
              className="inline-flex items-center gap-2 rounded-full border border-white/25 px-8 py-4 text-base font-semibold text-white transition hover:border-gold hover:text-gold"
            >
              See where the money goes
            </Link>
          </div>

          <dl className="mt-14 grid max-w-2xl grid-cols-2 gap-x-8 gap-y-6 border-t border-white/15 pt-8 sm:grid-cols-3">
            {[
              { k: "Scholarships", v: "Fees, books, uniforms" },
              { k: "Basic needs", v: "Food, water, shelter" },
              { k: "Broadcast", v: "Hope, every day" },
            ].map((s) => (
              <div key={s.k}>
                <dt className="font-display text-xl font-semibold text-gold">{s.k}</dt>
                <dd className="mt-1 text-sm text-white/60">{s.v}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>

      {hero.videoSrc && (
        <div className="absolute bottom-6 right-5 z-10 flex gap-2 sm:right-8">
          <button
            type="button"
            onClick={togglePlay}
            className="grid h-11 w-11 place-items-center rounded-full border border-white/25 bg-black/30 text-white backdrop-blur transition hover:border-gold hover:text-gold"
          >
            <span className="sr-only">{playing ? "Pause background film" : "Play background film"}</span>
            <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor" aria-hidden>
              {playing ? <path d="M8 5h3v14H8zM13 5h3v14h-3z" /> : <path d="M8 5l11 7-11 7z" />}
            </svg>
          </button>
          <button
            type="button"
            onClick={toggleSound}
            className="grid h-11 w-11 place-items-center rounded-full border border-white/25 bg-black/30 text-white backdrop-blur transition hover:border-gold hover:text-gold"
          >
            <span className="sr-only">{muted ? "Unmute background film" : "Mute background film"}</span>
            <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
              <path d="M4 9v6h4l5 4V5L8 9H4z" />
              {muted ? <path d="M17 9l4 6M21 9l-4 6" /> : <path d="M16.5 8.5a5 5 0 0 1 0 7" />}
            </svg>
          </button>
        </div>
      )}
    </section>
  );
}

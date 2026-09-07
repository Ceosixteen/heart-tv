"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import type { GallerySlide } from "@/lib/content";

export default function GiveGallery({ slides }: { slides: GallerySlide[] }) {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const touchX = useRef<number | null>(null);
  const count = slides.length;

  const go = useCallback(
    (next: number) => {
      if (count === 0) return;
      setIndex(((next % count) + count) % count);
    },
    [count],
  );

  useEffect(() => {
    if (paused || count < 2) return;
    const reduce =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return;
    const t = setInterval(() => setIndex((i) => (i + 1) % count), 6000);
    return () => clearInterval(t);
  }, [paused, count]);

  if (count === 0) return null;

  return (
    <div
      className="relative"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
      onKeyDown={(e) => {
        if (e.key === "ArrowRight") go(index + 1);
        if (e.key === "ArrowLeft") go(index - 1);
      }}
      onTouchStart={(e) => (touchX.current = e.touches[0].clientX)}
      onTouchEnd={(e) => {
        if (touchX.current === null) return;
        const dx = e.changedTouches[0].clientX - touchX.current;
        if (Math.abs(dx) > 48) go(index + (dx < 0 ? 1 : -1));
        touchX.current = null;
      }}
      role="region"
      aria-roledescription="carousel"
      aria-label="Where your giving goes"
      tabIndex={0}
    >
      <div className="relative aspect-[16/10] overflow-hidden rounded-[1.75rem] bg-navy-deep sm:aspect-[16/9]">
        {slides.map((slide, i) => (
          <div
            key={`${slide.caption}-${i}`}
            aria-hidden={i !== index}
            className={`absolute inset-0 transition-opacity duration-700 ${
              i === index ? "opacity-100" : "opacity-0"
            }`}
          >
            {slide.src ? (
              <Image
                src={slide.src}
                alt={slide.caption}
                fill
                sizes="(max-width: 1024px) 100vw, 62vw"
                className="object-cover"
                priority={i === 0}
              />
            ) : (
              <div className="h-full w-full bg-[radial-gradient(110%_90%_at_30%_20%,#2b25c4_0%,#161274_60%,#05063a_100%)] grain" />
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/45 to-transparent" />
            <div className="absolute inset-x-0 bottom-0 p-6 sm:p-10">
              <p className="eyebrow text-gold">
                {String(i + 1).padStart(2, "0")} / {String(count).padStart(2, "0")}
              </p>
              <h3 className="display mt-3 text-2xl text-white sm:text-3xl">{slide.caption}</h3>
              <p className="mt-3 max-w-xl text-sm leading-relaxed text-white/75 sm:text-base">
                {slide.body}
              </p>
            </div>
          </div>
        ))}

        {count > 1 && (
          <>
            <button
              type="button"
              onClick={() => go(index - 1)}
              className="absolute left-3 top-1/2 grid h-11 w-11 -translate-y-1/2 place-items-center rounded-full border border-white/25 bg-black/35 text-white backdrop-blur transition hover:border-gold hover:text-gold sm:left-5"
            >
              <span className="sr-only">Previous slide</span>
              <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
                <path d="M15 5l-7 7 7 7" />
              </svg>
            </button>
            <button
              type="button"
              onClick={() => go(index + 1)}
              className="absolute right-3 top-1/2 grid h-11 w-11 -translate-y-1/2 place-items-center rounded-full border border-white/25 bg-black/35 text-white backdrop-blur transition hover:border-gold hover:text-gold sm:right-5"
            >
              <span className="sr-only">Next slide</span>
              <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
                <path d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </>
        )}
      </div>

      {count > 1 && (
        <div className="mt-5 flex justify-center gap-2.5">
          {slides.map((slide, i) => (
            <button
              key={`dot-${i}`}
              type="button"
              onClick={() => go(i)}
              aria-current={i === index}
              className={`h-2 rounded-full transition-all ${
                i === index ? "w-8 bg-blue" : "w-2 bg-navy/25 hover:bg-navy/45"
              }`}
            >
              <span className="sr-only">Go to slide {i + 1}: {slide.caption}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

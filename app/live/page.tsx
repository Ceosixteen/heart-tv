import type { Metadata } from "next";
import Link from "next/link";
import { getLiveStatus, type LiveStatus } from "@/lib/live";
import AmbientBackground from "@/components/AmbientBackground";
import { SITE } from "@/lib/site";

export const metadata: Metadata = {
  title: "Live",
  description:
    "Watch Heart TV live — a daily broadcast of hope, faith and transformation from Peter AD Ministries.",
};

export const dynamic = "force-dynamic";

export default async function LivePage() {
  const status = await getLiveStatus();
  return status.isLive ? <OnAir status={status} /> : <OffAir />;
}

/* ─── ON AIR ─────────────────────────────────────────────────── */

function OnAir({ status }: { status: LiveStatus }) {
  const isYT = status.platform === "youtube";

  const embedSrc = isYT
    ? `https://www.youtube.com/embed/${status.videoId}?autoplay=1&rel=0&modestbranding=1`
    : status.permalink
    ? `https://www.facebook.com/plugins/video.php?href=${encodeURIComponent(
        `https://www.facebook.com${status.permalink}`
      )}&width=1280&autoplay=true&show_text=false`
    : null;

  const chatSrc = isYT
    ? `https://www.youtube.com/live_chat?v=${status.videoId}&embed_domain=hearttv.org`
    : null;

  return (
    <section className="relative min-h-screen bg-navy-deep text-white">
      <AmbientBackground variant="navy" orbs />

      <div className="mx-auto max-w-7xl px-5 pb-16 pt-36 sm:px-8">
        {/* Live badge */}
        <div className="mb-6 flex items-center gap-3">
          <span className="relative flex h-2.5 w-2.5">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-red-500 opacity-75" />
            <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-red-500" />
          </span>
          <span className="text-[11px] font-semibold uppercase tracking-[0.16em] text-red-400">
            Live Now
          </span>
          <span className="text-sm text-white/50">
            on {status.platform === "youtube" ? "YouTube" : "Facebook"}
          </span>
        </div>

        {status.title && (
          <h1 className="display mb-8 text-2xl text-white sm:text-3xl">
            {status.title}
          </h1>
        )}

        {/* Player + optional chat */}
        {embedSrc ? (
          <div className="flex flex-col gap-4 lg:flex-row lg:items-start">
            {/* Main player — 16:9 */}
            <div className="w-full overflow-hidden rounded-2xl shadow-[0_24px_80px_-24px_rgb(0_0_0/0.7)] lg:flex-1">
              <div className="relative pb-[56.25%]">
                <iframe
                  src={embedSrc}
                  className="absolute inset-0 h-full w-full border-0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                  title={status.title ?? "Heart TV Live"}
                />
              </div>
            </div>

            {/* YouTube live chat sidebar */}
            {chatSrc && (
              <div className="h-[480px] w-full overflow-hidden rounded-2xl border border-white/10 bg-white/5 lg:h-auto lg:w-[340px] lg:self-stretch">
                <iframe
                  src={chatSrc}
                  className="h-full w-full border-0"
                  title="Live chat"
                />
              </div>
            )}
          </div>
        ) : (
          <div className="flex items-center justify-center rounded-2xl border border-white/10 bg-white/5 py-24">
            <p className="text-white/50">Stream embed unavailable — watch directly on Facebook.</p>
          </div>
        )}

        {/* Bottom strip */}
        <div className="mt-10 flex flex-wrap items-center gap-4 border-t border-white/10 pt-8">
          <p className="flex-1 text-sm text-white/60">
            Enjoying the broadcast? Your partnership keeps this mission alive.
          </p>
          <Link
            href="/partnership#join"
            className="inline-flex items-center gap-2 rounded-full bg-gold px-6 py-3 text-sm font-semibold text-ink transition hover:bg-white"
          >
            Become a Partner &rarr;
          </Link>
        </div>
      </div>
    </section>
  );
}

/* ─── OFF AIR ────────────────────────────────────────────────── */

const PLATFORMS = [
  {
    name: "YouTube",
    icon: (
      <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor" aria-hidden>
        <path d="M23 7s-.3-2-1.2-2.8c-1.1-1.2-2.4-1.2-3-1.3C16.2 2.8 12 2.8 12 2.8s-4.2 0-6.8.2c-.6.1-1.9.1-3 1.3C1.3 5 1 7 1 7S.7 9.1.7 11.3v2.1c0 2.1.3 4.3.3 4.3s.3 2 1.2 2.8c1.1 1.2 2.6 1.1 3.3 1.2C7.3 21.9 12 22 12 22s4.2 0 6.8-.3c.6-.1 1.9-.1 3-1.3.9-.8 1.2-2.8 1.2-2.8s.3-2.1.3-4.3v-2.1C23.3 9.1 23 7 23 7zM9.7 15.5V8l6.5 3.7-6.5 3.8z" />
      </svg>
    ),
    href: SITE.socials.find((s) => s.label === "YouTube")?.href ?? "#",
    cta: "Subscribe & turn on notifications",
  },
  {
    name: "Facebook",
    icon: (
      <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor" aria-hidden>
        <path d="M24 12.07C24 5.4 18.63 0 12 0S0 5.4 0 12.07C0 18.1 4.39 23.1 10.13 24v-8.44H7.08v-3.49h3.04V9.41c0-3.02 1.8-4.7 4.54-4.7 1.31 0 2.68.24 2.68.24v2.97h-1.5c-1.5 0-1.96.93-1.96 1.89v2.26h3.32l-.53 3.5h-2.8V24C19.61 23.1 24 18.1 24 12.07z" />
      </svg>
    ),
    href: SITE.socials.find((s) => s.label === "Facebook")?.href ?? "#",
    cta: "Like the page & follow for live alerts",
  },
];

function OffAir() {
  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden bg-navy-deep pb-24 pt-40 text-white">
        <AmbientBackground variant="navy" orbs />

        <div className="relative mx-auto max-w-3xl px-5 text-center sm:px-8">
          {/* Offline badge */}
          <p className="eyebrow mb-6 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/5 px-4 py-2 text-white/60">
            <span className="h-1.5 w-1.5 rounded-full bg-white/40" />
            Not Live Right Now
          </p>

          <h1 className="display text-[clamp(2rem,5vw,3.5rem)] leading-tight">
            We'll be back on air soon.
          </h1>

          <p className="mx-auto mt-6 max-w-xl text-lg leading-relaxed text-white/65">
            Heart TV broadcasts daily from Peter AD Ministries. Follow us on
            YouTube or Facebook to get notified the moment we go live.
          </p>

          <div className="mt-10 flex flex-wrap justify-center gap-4">
            {PLATFORMS.map((p) => (
              <a
                key={p.name}
                href={p.href}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/5 px-6 py-3 text-sm font-semibold text-white transition hover:border-gold hover:text-gold"
              >
                {p.icon}
                {p.name}
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Notify section */}
      <section className="relative overflow-hidden bg-cloud py-20">
        <AmbientBackground variant="light" orbs />

        <div className="mx-auto max-w-5xl px-5 sm:px-8">
          <h2 className="display mb-12 text-center text-2xl text-navy sm:text-3xl">
            Never miss a broadcast
          </h2>

          <div className="grid gap-6 sm:grid-cols-2">
            {PLATFORMS.map((p) => (
              <a
                key={p.name}
                href={p.href}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-start gap-4 rounded-2xl border border-navy/10 bg-white p-6 shadow-sm transition hover:border-azure hover:shadow-md"
              >
                <span className="mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-navy/5 text-navy group-hover:bg-azure group-hover:text-white transition">
                  {p.icon}
                </span>
                <div>
                  <p className="font-semibold text-navy">{p.name}</p>
                  <p className="mt-0.5 text-sm text-muted">{p.cta}</p>
                </div>
                <span className="ml-auto mt-1 text-muted/40 group-hover:text-azure transition">
                  &rarr;
                </span>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Partnership nudge */}
      <section className="relative overflow-hidden bg-navy-deep py-20 text-white">
        <AmbientBackground variant="navy" orbs={false} />
        <div className="mx-auto max-w-2xl px-5 text-center sm:px-8">
          <p className="text-base leading-relaxed text-white/70">
            "Give, and it will be given to you — good measure, pressed down,
            shaken together, and running over."
          </p>
          <p className="mt-3 text-sm font-semibold text-gold">Luke 6:38</p>
          <Link
            href="/partnership"
            className="mt-10 inline-flex items-center gap-2 rounded-full bg-azure px-8 py-4 text-base font-semibold text-ink shadow-[0_16px_36px_-16px_rgb(36_170_245/0.7)] transition hover:bg-white"
          >
            Partner with Heart TV
          </Link>
        </div>
      </section>
    </>
  );
}

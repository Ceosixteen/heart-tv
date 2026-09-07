"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import Logo from "@/components/Logo";
import { NAV } from "@/lib/site";
import { useLiveStatus } from "@/contexts/LiveContext";

// Routes that open with a full-bleed dark hero, which the header can sit on
// transparently. Everywhere else it needs its own ground, or the white lockup
// and nav links disappear into a light page.
const DARK_HERO_ROUTES = ["/", "/partnership", "/live"];

export default function SiteHeader() {
  const pathname = usePathname();
  const liveStatus = useLiveStatus();
  const isLive = liveStatus?.isLive ?? false;
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const grounded = scrolled || open || !DARK_HERO_ROUTES.includes(pathname);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-300 ${
        grounded
          ? "bg-navy-deep/95 shadow-[0_1px_0_rgb(255_255_255/0.08)] backdrop-blur"
          : "bg-transparent"
      }`}
    >
      <div className="mx-auto flex h-[76px] max-w-7xl items-center justify-between gap-6 px-5 sm:px-8">
        <Link href="/" className="flex items-center gap-3" aria-label="Heart.tv home">
          {/* The header only ever sits on navy, so the knockout is always right. */}
          <Logo height={30} variant="white" alt="" priority className="h-[25px] w-auto sm:h-[30px]" />
          <span className="hidden border-l border-white/20 pl-3 text-[10px] font-medium uppercase leading-[1.35] tracking-[0.16em] text-white/55 sm:block">
            Peter AD
            <br />
            Ministries
          </span>
        </Link>

        <nav className="hidden items-center gap-8 lg:flex" aria-label="Main">
          {NAV.map((item) => {
            const active = pathname === item.href;
            const showLiveDot = item.label === "Live" && isLive;
            return (
              <Link
                key={item.href}
                href={item.href}
                aria-current={active ? "page" : undefined}
                className={`relative inline-flex items-center gap-1.5 text-sm font-medium transition ${
                  active ? "text-gold" : "text-white/80 hover:text-white"
                }`}
              >
                {showLiveDot && (
                  <span className="relative flex h-1.5 w-1.5">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-red-400 opacity-75" />
                    <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-red-500" />
                  </span>
                )}
                {item.label}
                {active && (
                  <span className="absolute -bottom-1.5 left-0 h-0.5 w-full rounded-full bg-gold" />
                )}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-3">
          <Link
            href="/partnership#join"
            className="hidden rounded-full bg-gold px-5 py-2.5 text-sm font-semibold text-ink transition hover:bg-white sm:inline-flex"
          >
            Become a Partner
          </Link>
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls="mobile-nav"
            className="grid h-10 w-10 place-items-center rounded-xl border border-white/20 text-white lg:hidden"
          >
            <span className="sr-only">{open ? "Close menu" : "Open menu"}</span>
            <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
              {open ? <path d="M6 6l12 12M18 6L6 18" /> : <path d="M4 7h16M4 12h16M4 17h16" />}
            </svg>
          </button>
        </div>
      </div>

      {open && (
        <nav
          id="mobile-nav"
          aria-label="Mobile"
          className="border-t border-white/10 bg-navy-deep px-5 pb-8 pt-4 lg:hidden"
        >
          <ul className="space-y-1">
            {NAV.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="block rounded-xl px-3 py-3 text-base font-medium text-white/85 hover:bg-white/10 hover:text-white"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
          <Link
            href="/partnership#join"
            className="mt-5 block rounded-full bg-gold px-5 py-3.5 text-center text-sm font-semibold text-ink"
          >
            Become a Partner
          </Link>
        </nav>
      )}
    </header>
  );
}

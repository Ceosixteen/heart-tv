import Link from "next/link";
import Logo from "@/components/Logo";
import { NAV, SITE } from "@/lib/site";

export default function SiteFooter() {
  return (
    <footer className="bg-ink text-cloud/70">
      <div className="mx-auto grid max-w-7xl gap-12 px-5 py-16 sm:px-8 lg:grid-cols-[1.4fr_1fr_1fr]">
        <div>
          <Link href="/" aria-label="Heart.tv home" className="inline-block">
            <Logo height={36} variant="white" alt="" className="h-8 w-auto sm:h-9" />
          </Link>
          <p className="mt-5 max-w-sm text-sm leading-relaxed">
            {SITE.name} is the broadcast arm of {SITE.parent}. {SITE.mission}
          </p>
          <p className="mt-5 text-sm">
            <a href={`mailto:${SITE.email}`} className="text-gold hover:underline">
              {SITE.email}
            </a>
            <br />
            {SITE.phonePrimary}
          </p>
        </div>

        <div>
          <h2 className="font-display text-base font-semibold text-white">Explore</h2>
          <ul className="mt-4 space-y-2.5 text-sm">
            {NAV.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="hover:text-white">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h2 className="font-display text-base font-semibold text-white">Follow</h2>
          <ul className="mt-4 flex flex-wrap gap-2">
            {SITE.socials.map((s) => (
              <li key={s.label}>
                <a
                  href={s.href}
                  className="inline-flex rounded-full border border-white/15 px-3.5 py-1.5 text-xs font-medium hover:border-gold hover:text-gold"
                >
                  {s.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="border-t border-white/10">
        <p className="mx-auto max-w-7xl px-5 py-6 text-xs sm:px-8">
          &copy; {new Date().getFullYear()} {SITE.name} &middot; {SITE.parent}. All rights reserved.
        </p>
      </div>
    </footer>
  );
}

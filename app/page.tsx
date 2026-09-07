import Link from "next/link";
import { SITE } from "@/lib/site";

export default function Home() {
  return (
    <section className="mx-auto flex min-h-[70vh] max-w-3xl flex-col justify-center px-6 py-24">
      <p className="eyebrow text-blue">{SITE.parent}</p>
      <h1 className="display mt-4 text-5xl text-navy sm:text-6xl">
        Heart TV
      </h1>
      <p className="mt-5 max-w-xl text-lg text-navy/70">
        {SITE.mission} The rest of the site is still being built — the
        partnership page is live now.
      </p>
      <div className="mt-8">
        <Link
          href="/partnership"
          className="inline-flex items-center gap-2 rounded-full bg-blue px-7 py-3.5 text-sm font-semibold text-white transition hover:bg-navy"
        >
          Go to Partnership
          <span aria-hidden>&rarr;</span>
        </Link>
      </div>
    </section>
  );
}

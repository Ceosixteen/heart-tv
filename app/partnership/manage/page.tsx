import type { Metadata } from "next";
import Link from "next/link";
import Logo from "@/components/Logo";
import StudioForm from "@/components/StudioForm";
import { getPartnershipContent } from "@/lib/content";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Partnership studio",
  robots: { index: false, follow: false },
};

export default async function ManagePage() {
  const content = await getPartnershipContent();

  return (
    <section className="mx-auto max-w-4xl px-5 pb-24 pt-32 sm:px-8">
      <Logo height={30} variant="color" alt="Heart.tv" className="mb-8 h-7 w-auto" />
      <p className="eyebrow text-blue">Internal</p>
      <h1 className="display mt-4 text-4xl text-navy">Partnership studio</h1>
      <p className="mt-4 max-w-2xl text-navy/70">
        Upload the hero film and the giving photographs without touching code. Changes
        write to <code className="rounded bg-mist px-1.5 py-0.5 text-sm">content/partnership.json</code>{" "}
        and appear on{" "}
        <Link href="/partnership" className="font-semibold text-blue hover:underline">
          /partnership
        </Link>{" "}
        immediately.
      </p>
      <div className="mt-6 rounded-xl border border-gold/50 bg-gold/10 px-5 py-4 text-sm leading-relaxed text-navy">
        <strong className="font-semibold">Before this goes public:</strong> put this route
        behind real authentication and move uploads to object storage. The passcode below
        is a stopgap for local and staging use only.
      </div>

      <div className="mt-10">
        <StudioForm content={content} />
      </div>
    </section>
  );
}

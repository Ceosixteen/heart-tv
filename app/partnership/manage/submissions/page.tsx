import type { Metadata } from "next";
import Link from "next/link";
import Logo from "@/components/Logo";

export const dynamic = "force-dynamic";
export const metadata: Metadata = {
  title: "Partner submissions",
  robots: { index: false, follow: false },
};

type Partner = {
  id: string;
  receivedAt: string;
  fullName: string;
  email: string;
  phone: string;
  country: string;
  tier: string;
  frequency: string;
  currency: string;
  amount: string;
  newsletter: boolean;
  prayer?: string;
};

async function getPartners(): Promise<Partner[]> {
  const ready =
    !!process.env.FIREBASE_PROJECT_ID &&
    !!process.env.FIREBASE_CLIENT_EMAIL &&
    !!process.env.FIREBASE_PRIVATE_KEY;

  if (!ready) return [];

  const { db } = await import("@/lib/firebase");
  const snap = await db()
    .collection("partners")
    .orderBy("receivedAt", "desc")
    .limit(200)
    .get();

  return snap.docs.map((d) => {
    const data = d.data();
    return {
      id: data.id ?? d.id,
      receivedAt:
        data.receivedAt?.toDate?.()?.toISOString?.() ??
        data.receivedAt ??
        "",
      fullName: data.fullName ?? "",
      email: data.email ?? "",
      phone: data.phone ?? "",
      country: data.country ?? "",
      tier: data.tier ?? "",
      frequency: data.frequency ?? "",
      currency: data.currency ?? "",
      amount: data.amount ?? "",
      newsletter: data.newsletter ?? false,
      prayer: data.prayer ?? "",
    } as Partner;
  });
}

function fmt(iso: string) {
  if (!iso) return "—";
  return new Date(iso).toLocaleString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

export default async function SubmissionsPage() {
  const partners = await getPartners();
  const firebaseConfigured =
    !!process.env.FIREBASE_PROJECT_ID &&
    !!process.env.FIREBASE_CLIENT_EMAIL &&
    !!process.env.FIREBASE_PRIVATE_KEY;

  return (
    <section className="mx-auto max-w-6xl px-5 pb-24 pt-32 sm:px-8">
      <Logo height={30} variant="color" alt="Heart.tv" className="mb-8 h-7 w-auto" />

      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="eyebrow text-blue">Internal</p>
          <h1 className="display mt-2 text-4xl text-navy">Partner submissions</h1>
          <p className="mt-2 text-navy/60">
            {partners.length} {partners.length === 1 ? "record" : "records"} — newest first
          </p>
        </div>
        <Link
          href="/partnership/manage"
          className="rounded-full border border-navy/20 px-5 py-2.5 text-sm font-semibold text-navy transition hover:bg-navy hover:text-white"
        >
          ← Studio
        </Link>
      </div>

      {!firebaseConfigured && (
        <div className="mt-8 rounded-xl border border-gold/50 bg-gold/10 px-5 py-4 text-sm leading-relaxed text-navy">
          <strong className="font-semibold">Firestore not configured.</strong> Add{" "}
          <code className="rounded bg-mist px-1 py-0.5">FIREBASE_PROJECT_ID</code>,{" "}
          <code className="rounded bg-mist px-1 py-0.5">FIREBASE_CLIENT_EMAIL</code> and{" "}
          <code className="rounded bg-mist px-1 py-0.5">FIREBASE_PRIVATE_KEY</code> to your
          environment variables. Submissions are currently stored locally in{" "}
          <code className="rounded bg-mist px-1 py-0.5">content/submissions.json</code>.
        </div>
      )}

      {firebaseConfigured && partners.length === 0 && (
        <p className="mt-16 text-center text-navy/50">No submissions yet.</p>
      )}

      {partners.length > 0 && (
        <div className="mt-8 overflow-x-auto rounded-2xl border border-navy/10 bg-white shadow-sm">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-navy/10 bg-cloud text-left text-xs font-semibold uppercase tracking-wider text-muted">
                <th className="px-4 py-3">Ref</th>
                <th className="px-4 py-3">Date</th>
                <th className="px-4 py-3">Name</th>
                <th className="px-4 py-3">Email</th>
                <th className="px-4 py-3">Phone</th>
                <th className="px-4 py-3">Country</th>
                <th className="px-4 py-3">Tier</th>
                <th className="px-4 py-3">Amount</th>
                <th className="px-4 py-3">Freq</th>
                <th className="px-4 py-3">NL</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-navy/5">
              {partners.map((p) => (
                <tr key={p.id} className="hover:bg-cloud/60 transition-colors">
                  <td className="whitespace-nowrap px-4 py-3 font-mono text-xs text-blue">
                    {p.id}
                  </td>
                  <td className="whitespace-nowrap px-4 py-3 text-muted">{fmt(p.receivedAt)}</td>
                  <td className="px-4 py-3 font-medium text-navy">{p.fullName}</td>
                  <td className="px-4 py-3 text-muted">
                    <a href={`mailto:${p.email}`} className="hover:text-blue transition-colors">
                      {p.email}
                    </a>
                  </td>
                  <td className="whitespace-nowrap px-4 py-3 text-muted">
                    <a href={`tel:${p.phone}`} className="hover:text-blue transition-colors">
                      {p.phone}
                    </a>
                  </td>
                  <td className="px-4 py-3 text-muted">{p.country}</td>
                  <td className="px-4 py-3 capitalize text-navy">{p.tier || "—"}</td>
                  <td className="whitespace-nowrap px-4 py-3 text-navy">
                    {p.amount ? `${p.currency} ${p.amount}` : "—"}
                  </td>
                  <td className="px-4 py-3 capitalize text-muted">{p.frequency || "—"}</td>
                  <td className="px-4 py-3 text-center">
                    {p.newsletter ? (
                      <span className="text-green-600">✓</span>
                    ) : (
                      <span className="text-muted/40">—</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {partners.some((p) => p.prayer) && (
        <details className="mt-10">
          <summary className="cursor-pointer text-sm font-semibold text-navy/60 hover:text-navy transition-colors">
            Prayer requests ({partners.filter((p) => p.prayer).length})
          </summary>
          <div className="mt-4 space-y-4">
            {partners
              .filter((p) => p.prayer)
              .map((p) => (
                <div key={p.id} className="rounded-xl border border-navy/10 bg-white p-5">
                  <p className="text-xs font-semibold text-muted">
                    {p.fullName} — {p.id}
                  </p>
                  <p className="mt-2 text-sm leading-relaxed text-navy/80">{p.prayer}</p>
                </div>
              ))}
          </div>
        </details>
      )}
    </section>
  );
}

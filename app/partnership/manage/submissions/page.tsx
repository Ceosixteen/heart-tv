import type { Metadata } from "next";
import Link from "next/link";
import Logo from "@/components/Logo";
import SubmissionsDashboard from "./SubmissionsDashboard";

export const dynamic = "force-dynamic";
export const metadata: Metadata = {
  title: "Admin dashboard — Heart TV",
  robots: { index: false, follow: false },
};

export type Partner = {
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
  prayer: string;
  heardFrom: string;
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
    .limit(500)
    .get();

  return snap.docs.map((d) => {
    const data = d.data();
    return {
      id: data.id ?? d.id,
      receivedAt:
        data.receivedAt?.toDate?.()?.toISOString?.() ?? data.receivedAt ?? "",
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
      heardFrom: data.heardFrom ?? "",
    };
  });
}

export default async function SubmissionsPage() {
  const partners = await getPartners();
  const firebaseConfigured =
    !!process.env.FIREBASE_PROJECT_ID &&
    !!process.env.FIREBASE_CLIENT_EMAIL &&
    !!process.env.FIREBASE_PRIVATE_KEY;

  return (
    <div className="min-h-screen bg-cloud">
      {/* Top bar */}
      <header className="sticky top-0 z-30 border-b border-navy/10 bg-white/90 backdrop-blur">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-4 px-5 sm:px-8">
          <div className="flex items-center gap-4">
            <Logo height={24} variant="color" alt="Heart.tv" className="h-6 w-auto" />
            <span className="hidden h-5 border-l border-navy/15 sm:block" />
            <span className="hidden text-sm font-semibold text-navy sm:block">
              Admin Dashboard
            </span>
          </div>
          <div className="flex items-center gap-3">
            <Link
              href="/partnership/manage"
              className="text-sm font-medium text-muted transition hover:text-navy"
            >
              Studio
            </Link>
            <Link
              href="/partnership"
              className="text-sm font-medium text-muted transition hover:text-navy"
            >
              Live site
            </Link>
            <LogoutButton />
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-5 py-10 sm:px-8">
        {!firebaseConfigured && (
          <div className="mb-8 rounded-xl border border-gold/50 bg-gold/10 px-5 py-4 text-sm leading-relaxed text-navy">
            <strong className="font-semibold">Firestore not configured.</strong>{" "}
            Add <code className="rounded bg-white/70 px-1">FIREBASE_PROJECT_ID</code>,{" "}
            <code className="rounded bg-white/70 px-1">FIREBASE_CLIENT_EMAIL</code> and{" "}
            <code className="rounded bg-white/70 px-1">FIREBASE_PRIVATE_KEY</code> to
            your Vercel environment variables to see real submissions here.
          </div>
        )}
        <SubmissionsDashboard partners={partners} />
      </main>
    </div>
  );
}

// Tiny client component just for the logout button
function LogoutButton() {
  return (
    <form
      action={async () => {
        "use server";
        const { cookies } = await import("next/headers");
        (await cookies()).set("htv-admin-session", "", { maxAge: 0, path: "/" });
      }}
    >
      <button
        type="submit"
        className="rounded-full border border-navy/20 px-4 py-1.5 text-xs font-semibold text-navy transition hover:bg-navy hover:text-white"
      >
        Log out
      </button>
    </form>
  );
}

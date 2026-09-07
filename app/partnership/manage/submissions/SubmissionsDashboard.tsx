"use client";

import { useState, useMemo } from "react";
import type { Partner } from "./page";

function fmt(iso: string) {
  if (!iso) return "—";
  return new Date(iso).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

function StatCard({
  label,
  value,
  sub,
}: {
  label: string;
  value: string | number;
  sub?: string;
}) {
  return (
    <div className="rounded-2xl border border-navy/10 bg-white p-6 shadow-sm">
      <p className="text-xs font-semibold uppercase tracking-wider text-muted">{label}</p>
      <p className="mt-2 text-3xl font-bold text-navy">{value}</p>
      {sub && <p className="mt-1 text-sm text-muted">{sub}</p>}
    </div>
  );
}

function exportCSV(partners: Partner[]) {
  const cols: (keyof Partner)[] = [
    "id", "receivedAt", "fullName", "email", "phone", "country",
    "tier", "frequency", "currency", "amount", "newsletter", "heardFrom",
  ];
  const esc = (v: unknown) => `"${String(v ?? "").replace(/"/g, '""')}"`;
  const rows = [
    cols.join(","),
    ...partners.map((p) => cols.map((c) => esc(p[c])).join(",")),
  ];
  const blob = new Blob([rows.join("\n")], { type: "text/csv" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `heart-tv-partners-${new Date().toISOString().slice(0, 10)}.csv`;
  a.click();
  URL.revokeObjectURL(url);
}

const TIERS = ["", "seed", "bronze", "silver", "gold", "platinum"];

export default function SubmissionsDashboard({ partners }: { partners: Partner[] }) {
  const [q, setQ] = useState("");
  const [tierFilter, setTierFilter] = useState("");
  const [freqFilter, setFreqFilter] = useState("");
  const [prayerOpen, setPrayerOpen] = useState<string | null>(null);

  // Stats
  const thisMonth = useMemo(() => {
    const cutoff = new Date();
    cutoff.setDate(1);
    cutoff.setHours(0, 0, 0, 0);
    return partners.filter((p) => p.receivedAt && new Date(p.receivedAt) >= cutoff).length;
  }, [partners]);

  const topCountry = useMemo(() => {
    const counts: Record<string, number> = {};
    for (const p of partners) counts[p.country] = (counts[p.country] ?? 0) + 1;
    return Object.entries(counts).sort((a, b) => b[1] - a[1])[0]?.[0] ?? "—";
  }, [partners]);

  const newsletterCount = partners.filter((p) => p.newsletter).length;
  const prayerCount = partners.filter((p) => p.prayer).length;

  // Filtered list
  const filtered = useMemo(() => {
    const lq = q.toLowerCase();
    return partners.filter((p) => {
      if (tierFilter && p.tier !== tierFilter) return false;
      if (freqFilter && p.frequency !== freqFilter) return false;
      if (
        lq &&
        !p.fullName.toLowerCase().includes(lq) &&
        !p.email.toLowerCase().includes(lq) &&
        !p.country.toLowerCase().includes(lq) &&
        !p.id.toLowerCase().includes(lq)
      )
        return false;
      return true;
    });
  }, [partners, q, tierFilter, freqFilter]);

  if (partners.length === 0) {
    return (
      <div className="py-24 text-center">
        <p className="text-4xl">🙏</p>
        <p className="mt-4 text-lg font-semibold text-navy">No submissions yet</p>
        <p className="mt-2 text-sm text-muted">
          Partner signups will appear here the moment someone fills in the form.
        </p>
      </div>
    );
  }

  return (
    <>
      {/* Stats row */}
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
        <StatCard label="Total partners" value={partners.length} sub="all time" />
        <StatCard label="This month" value={thisMonth} sub="new sign-ups" />
        <StatCard label="Newsletter" value={newsletterCount} sub="opted in" />
        <StatCard label="Top country" value={topCountry} sub={`${prayerCount} prayer requests`} />
      </div>

      {/* Tier breakdown */}
      <div className="mt-6 rounded-2xl border border-navy/10 bg-white p-6 shadow-sm">
        <p className="mb-4 text-xs font-semibold uppercase tracking-wider text-muted">
          Partners by tier
        </p>
        <div className="flex flex-wrap gap-3">
          {TIERS.slice(1).map((tier) => {
            const count = partners.filter((p) => p.tier === tier).length;
            return (
              <div key={tier} className="flex items-center gap-2 rounded-xl bg-cloud px-4 py-2">
                <span className="text-sm font-semibold capitalize text-navy">{tier}</span>
                <span className="rounded-full bg-navy/10 px-2 py-0.5 text-xs font-bold text-navy">
                  {count}
                </span>
              </div>
            );
          })}
          <div className="flex items-center gap-2 rounded-xl bg-cloud px-4 py-2">
            <span className="text-sm font-semibold text-muted">Unspecified</span>
            <span className="rounded-full bg-navy/10 px-2 py-0.5 text-xs font-bold text-navy">
              {partners.filter((p) => !p.tier).length}
            </span>
          </div>
        </div>
      </div>

      {/* Controls */}
      <div className="mt-8 flex flex-wrap items-center gap-3">
        <input
          type="search"
          placeholder="Search name, email, country, ref…"
          value={q}
          onChange={(e) => setQ(e.target.value)}
          className="min-w-[220px] flex-1 rounded-xl border border-navy/15 bg-white px-4 py-2.5 text-sm text-navy placeholder:text-muted/50 focus:border-azure focus:outline-none focus:ring-2 focus:ring-azure/20"
        />
        <select
          value={tierFilter}
          onChange={(e) => setTierFilter(e.target.value)}
          className="rounded-xl border border-navy/15 bg-white px-3 py-2.5 text-sm text-navy focus:border-azure focus:outline-none"
        >
          <option value="">All tiers</option>
          {TIERS.slice(1).map((t) => (
            <option key={t} value={t} className="capitalize">
              {t.charAt(0).toUpperCase() + t.slice(1)}
            </option>
          ))}
        </select>
        <select
          value={freqFilter}
          onChange={(e) => setFreqFilter(e.target.value)}
          className="rounded-xl border border-navy/15 bg-white px-3 py-2.5 text-sm text-navy focus:border-azure focus:outline-none"
        >
          <option value="">All frequencies</option>
          <option value="monthly">Monthly</option>
          <option value="quarterly">Quarterly</option>
          <option value="annual">Annual</option>
          <option value="one-off">One-off</option>
        </select>
        <span className="text-sm text-muted">{filtered.length} shown</span>
        <button
          onClick={() => exportCSV(filtered)}
          className="ml-auto rounded-full border border-navy/20 px-5 py-2.5 text-sm font-semibold text-navy transition hover:bg-navy hover:text-white"
        >
          Export CSV
        </button>
      </div>

      {/* Table */}
      <div className="mt-4 overflow-x-auto rounded-2xl border border-navy/10 bg-white shadow-sm">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-navy/10 bg-cloud text-left text-[11px] font-semibold uppercase tracking-wider text-muted">
              <th className="px-4 py-3">Ref</th>
              <th className="px-4 py-3">Date</th>
              <th className="px-4 py-3">Name</th>
              <th className="px-4 py-3">Email</th>
              <th className="px-4 py-3">Phone</th>
              <th className="px-4 py-3">Country</th>
              <th className="px-4 py-3">Tier</th>
              <th className="px-4 py-3">Amount</th>
              <th className="px-4 py-3">Freq</th>
              <th className="px-4 py-3 text-center">NL</th>
              <th className="px-4 py-3 text-center">🙏</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-navy/5">
            {filtered.length === 0 && (
              <tr>
                <td colSpan={11} className="px-4 py-12 text-center text-sm text-muted">
                  No results match your search.
                </td>
              </tr>
            )}
            {filtered.map((p) => (
              <tr key={p.id} className="transition-colors hover:bg-cloud/60">
                <td className="whitespace-nowrap px-4 py-3 font-mono text-xs text-blue">
                  {p.id}
                </td>
                <td className="whitespace-nowrap px-4 py-3 text-muted">{fmt(p.receivedAt)}</td>
                <td className="px-4 py-3 font-medium text-navy">{p.fullName}</td>
                <td className="px-4 py-3">
                  <a
                    href={`mailto:${p.email}`}
                    className="text-muted transition hover:text-blue"
                  >
                    {p.email}
                  </a>
                </td>
                <td className="whitespace-nowrap px-4 py-3">
                  <a
                    href={`tel:${p.phone}`}
                    className="text-muted transition hover:text-blue"
                  >
                    {p.phone}
                  </a>
                </td>
                <td className="px-4 py-3 text-muted">{p.country || "—"}</td>
                <td className="px-4 py-3 capitalize text-navy">{p.tier || "—"}</td>
                <td className="whitespace-nowrap px-4 py-3 text-navy">
                  {p.amount ? `${p.currency} ${p.amount}` : "—"}
                </td>
                <td className="px-4 py-3 capitalize text-muted">{p.frequency || "—"}</td>
                <td className="px-4 py-3 text-center">
                  {p.newsletter ? (
                    <span className="text-green-600">✓</span>
                  ) : (
                    <span className="text-muted/30">—</span>
                  )}
                </td>
                <td className="px-4 py-3 text-center">
                  {p.prayer ? (
                    <button
                      onClick={() => setPrayerOpen(prayerOpen === p.id ? null : p.id)}
                      className="text-base transition hover:scale-110"
                      title="View prayer request"
                    >
                      🙏
                    </button>
                  ) : (
                    <span className="text-muted/30">—</span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Prayer drawer */}
      {prayerOpen && (() => {
        const p = partners.find((x) => x.id === prayerOpen);
        if (!p?.prayer) return null;
        return (
          <div className="mt-4 rounded-2xl border border-azure/30 bg-azure/5 p-6">
            <div className="mb-3 flex items-center justify-between">
              <p className="text-xs font-semibold text-muted">
                Prayer request — {p.fullName} ({p.id})
              </p>
              <button
                onClick={() => setPrayerOpen(null)}
                className="text-xs text-muted transition hover:text-navy"
              >
                Close
              </button>
            </div>
            <p className="text-sm leading-relaxed text-navy/80">{p.prayer}</p>
          </div>
        );
      })()}
    </>
  );
}

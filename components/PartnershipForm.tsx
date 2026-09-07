"use client";

import { useState } from "react";
import { LogoMark } from "@/components/Logo";

const TIERS = [
  { id: "seed", name: "Seed Partner", amount: "From $10 / month", note: "Feeds one family for a week." },
  { id: "sower", name: "Sower Partner", amount: "From $30 / month", note: "Keeps one child's school place open." },
  { id: "covenant", name: "Covenant Partner", amount: "From $100 / month", note: "Funds a full scholarship term." },
  { id: "legacy", name: "Legacy Partner", amount: "I'll choose my own", note: "Set your own rhythm and amount." },
];

const FIELD =
  "w-full rounded-xl border border-navy/15 bg-white px-4 py-3.5 text-[15px] text-ink placeholder:text-muted/70 transition focus:border-blue focus:outline-none focus:ring-4 focus:ring-blue/12";
const LABEL = "block text-sm font-semibold text-navy";

type Status = "idle" | "sending" | "sent" | "error";

export default function PartnershipForm() {
  const [tier, setTier] = useState("sower");
  const [status, setStatus] = useState<Status>("idle");
  const [message, setMessage] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries()) as Record<string, string>;

    const next: Record<string, string> = {};
    if (!data.fullName?.trim()) next.fullName = "Please tell us your name.";
    if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(data.email ?? "")) next.email = "Enter a valid email address.";
    if ((data.phone ?? "").replace(/\D/g, "").length < 7) next.phone = "Enter a reachable phone number.";
    if (!data.country?.trim()) next.country = "Which country are you partnering from?";
    if (!data.consent) next.consent = "We need your permission to contact you.";
    setErrors(next);
    if (Object.keys(next).length > 0) {
      form.querySelector<HTMLElement>(`[name="${Object.keys(next)[0]}"]`)?.focus();
      return;
    }

    setStatus("sending");
    try {
      const res = await fetch("/api/partnership", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...data, tier }),
      });
      const json = await res.json();
      if (!res.ok) throw new Error(json?.error ?? "Something went wrong.");
      setMessage(json.message ?? "");
      setStatus("sent");
      form.reset();
    } catch (err) {
      setMessage(err instanceof Error ? err.message : "Something went wrong.");
      setStatus("error");
    }
  }

  if (status === "sent") {
    return (
      <div className="rounded-[1.75rem] border border-navy/10 bg-white p-8 text-center shadow-[0_30px_70px_-45px_rgb(18_16_94/0.6)] sm:p-14">
        <span className="mx-auto grid h-16 w-16 place-items-center rounded-full bg-blue/10 text-blue">
          <svg viewBox="0 0 24 24" className="h-8 w-8" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
            <path d="M4 12.5l5 5L20 6.5" />
          </svg>
        </span>
        <h3 className="display mt-6 text-3xl text-navy">Welcome to the family.</h3>
        <p className="mx-auto mt-4 max-w-md text-navy/70">
          {message || "Your partnership request is with our team."} Look out for your
          personal partner number and giving details by email within 48 hours.
        </p>
        <button
          type="button"
          onClick={() => setStatus("idle")}
          className="mt-8 rounded-full border border-navy/20 px-6 py-3 text-sm font-semibold text-navy transition hover:border-blue hover:text-blue"
        >
          Submit another response
        </button>
      </div>
    );
  }

  return (
    <form
      onSubmit={onSubmit}
      noValidate
      className="rounded-[1.75rem] border border-navy/10 bg-white p-6 shadow-[0_30px_70px_-45px_rgb(18_16_94/0.6)] sm:p-10"
    >
      <div className="mb-7 flex items-center gap-3 border-b border-navy/10 pb-6">
        <LogoMark size={38} alt="" />
        <p className="text-sm font-semibold leading-tight text-navy">
          Heart.tv Partnership
          <span className="mt-0.5 block text-xs font-normal text-muted">
            Peter AD Ministries
          </span>
        </p>
      </div>

      <fieldset className="border-0 p-0">
        <legend className={`${LABEL} mb-3`}>Choose your partnership</legend>
        <div className="grid gap-3 sm:grid-cols-2">
          {TIERS.map((t) => {
            const active = tier === t.id;
            return (
              <label
                key={t.id}
                className={`cursor-pointer rounded-2xl border p-4 transition ${
                  active
                    ? "border-blue bg-blue/[0.04] ring-4 ring-blue/10"
                    : "border-navy/12 hover:border-navy/30"
                }`}
              >
                <input
                  type="radio"
                  name="tierChoice"
                  value={t.id}
                  checked={active}
                  onChange={() => setTier(t.id)}
                  className="sr-only"
                />
                <span className="flex items-start justify-between gap-3">
                  <span>
                    <span className="block font-display text-lg font-semibold text-navy">{t.name}</span>
                    <span className="mt-0.5 block text-sm font-medium text-blue">{t.amount}</span>
                    <span className="mt-1.5 block text-xs leading-relaxed text-muted">{t.note}</span>
                  </span>
                  <span
                    aria-hidden
                    className={`mt-1 grid h-5 w-5 shrink-0 place-items-center rounded-full border-2 ${
                      active ? "border-blue" : "border-navy/25"
                    }`}
                  >
                    {active && <span className="h-2.5 w-2.5 rounded-full bg-blue" />}
                  </span>
                </span>
              </label>
            );
          })}
        </div>
      </fieldset>

      <div className="mt-8 grid gap-5 sm:grid-cols-2">
        <Field id="fullName" label="Full name" error={errors.fullName}>
          <input id="fullName" name="fullName" className={FIELD} placeholder="Peter Adewale" autoComplete="name" />
        </Field>

        <Field id="email" label="Email address" error={errors.email}>
          <input id="email" name="email" type="email" className={FIELD} placeholder="you@example.com" autoComplete="email" />
        </Field>

        <Field id="phone" label="Phone / WhatsApp" error={errors.phone}>
          <input id="phone" name="phone" type="tel" className={FIELD} placeholder="+234 800 000 0000" autoComplete="tel" />
        </Field>

        <Field id="country" label="Country" error={errors.country}>
          <input id="country" name="country" className={FIELD} placeholder="Nigeria" autoComplete="country-name" />
        </Field>

        <Field id="frequency" label="How often would you like to give?">
          <select id="frequency" name="frequency" className={FIELD} defaultValue="monthly">
            <option value="monthly">Monthly</option>
            <option value="quarterly">Quarterly</option>
            <option value="annually">Annually</option>
            <option value="one-off">A one-time gift</option>
          </select>
        </Field>

        <Field id="amount" label="Amount you have in mind" hint="Optional — you can decide later.">
          <div className="flex gap-2">
            <select name="currency" aria-label="Currency" className={`${FIELD} w-28 shrink-0`} defaultValue="USD">
              <option>USD</option>
              <option>NGN</option>
              <option>GBP</option>
              <option>EUR</option>
            </select>
            <input id="amount" name="amount" inputMode="decimal" className={FIELD} placeholder="50" />
          </div>
        </Field>

        <div className="sm:col-span-2">
          <Field id="heardFrom" label="How did you find Heart TV?">
            <select id="heardFrom" name="heardFrom" className={FIELD} defaultValue="">
              <option value="">Select one</option>
              <option>Heart TV broadcast</option>
              <option>YouTube or social media</option>
              <option>A friend or family member</option>
              <option>A Peter AD Ministries event</option>
              <option>Other</option>
            </select>
          </Field>
        </div>

        <div className="sm:col-span-2">
          <Field id="prayer" label="Prayer request or a message for the team" hint="Optional — every request is read and prayed over.">
            <textarea id="prayer" name="prayer" rows={4} className={`${FIELD} resize-y`} placeholder="Write freely…" />
          </Field>
        </div>
      </div>

      <div className="mt-7 space-y-3">
        <Checkbox name="consent" error={errors.consent}>
          I agree that Heart TV may contact me about my partnership and store my details
          for that purpose.
        </Checkbox>
        <Checkbox name="newsletter" defaultChecked>
          Send me partner updates, crusade notices and the monthly impact report.
        </Checkbox>
      </div>

      {status === "error" && (
        <p role="alert" className="mt-5 rounded-xl bg-blue/10 px-4 py-3 text-sm font-medium text-blue">
          {message}
        </p>
      )}

      <button
        type="submit"
        disabled={status === "sending"}
        className="mt-7 inline-flex w-full items-center justify-center gap-2 rounded-full bg-blue px-8 py-4 text-base font-semibold text-white transition hover:bg-navy disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto"
      >
        {status === "sending" ? "Sending…" : "Join the Heart TV family"}
        {status !== "sending" && <span aria-hidden>&rarr;</span>}
      </button>

      <p className="mt-4 text-xs leading-relaxed text-muted">
        No payment is taken on this page. Once we receive your details we will send your
        personal partner number and the giving options available in your country.
      </p>
    </form>
  );
}

function Field({
  id,
  label,
  hint,
  error,
  children,
}: {
  id: string;
  label: string;
  hint?: string;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label htmlFor={id} className={LABEL}>
        {label}
      </label>
      {hint && <p className="mt-1 text-xs text-muted">{hint}</p>}
      <div className="mt-2">{children}</div>
      {error && (
        <p role="alert" className="mt-1.5 text-xs font-medium text-blue">
          {error}
        </p>
      )}
    </div>
  );
}

function Checkbox({
  name,
  children,
  error,
  defaultChecked,
}: {
  name: string;
  children: React.ReactNode;
  error?: string;
  defaultChecked?: boolean;
}) {
  return (
    <div>
      <label className="flex cursor-pointer items-start gap-3 text-sm leading-relaxed text-navy/80">
        <input
          type="checkbox"
          name={name}
          defaultChecked={defaultChecked}
          className="mt-0.5 h-5 w-5 shrink-0 rounded border-navy/30 accent-[#1057d1]"
        />
        <span>{children}</span>
      </label>
      {error && (
        <p role="alert" className="ml-8 mt-1 text-xs font-medium text-blue">
          {error}
        </p>
      )}
    </div>
  );
}

"use client";

import { useState, FormEvent } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Logo from "@/components/Logo";

export default function LoginForm() {
  const router = useRouter();
  const params = useSearchParams();
  const next = params.get("next") ?? "/partnership/manage";

  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function submit(e: FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });
      if (res.ok) {
        router.push(next);
        router.refresh();
      } else {
        const { error: msg } = await res.json();
        setError(msg ?? "Incorrect password.");
      }
    } catch {
      setError("Network error — please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-cloud px-5">
      <div className="w-full max-w-sm">
        <div className="mb-8 text-center">
          <Logo height={32} variant="color" alt="Heart.tv" className="mx-auto mb-6 h-8 w-auto" />
          <h1 className="display text-2xl text-navy">Admin access</h1>
          <p className="mt-2 text-sm text-muted">Partnership studio · Heart TV</p>
        </div>

        <form
          onSubmit={submit}
          className="rounded-2xl border border-navy/10 bg-white p-8 shadow-sm"
        >
          <label className="block text-sm font-semibold text-navy" htmlFor="pw">
            Password
          </label>
          <input
            id="pw"
            type="password"
            autoComplete="current-password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="mt-2 w-full rounded-xl border border-navy/15 bg-cloud px-4 py-3 text-sm text-navy placeholder:text-muted/50 focus:border-azure focus:outline-none focus:ring-2 focus:ring-azure/20"
            placeholder="Enter admin password"
          />

          {error && (
            <p role="alert" className="mt-3 text-sm text-red-600">
              {error}
            </p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="mt-5 w-full rounded-full bg-navy py-3 text-sm font-semibold text-white transition hover:bg-blue disabled:opacity-60"
          >
            {loading ? "Checking…" : "Sign in"}
          </button>
        </form>
      </div>
    </div>
  );
}

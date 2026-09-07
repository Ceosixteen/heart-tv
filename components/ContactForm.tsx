"use client";

import { useState, FormEvent } from "react";

export default function ContactForm() {
  const [fields, setFields] = useState({
    name: "", email: "", subject: "", message: "",
  });
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const [feedback, setFeedback] = useState("");

  function set(k: keyof typeof fields) {
    return (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
      setFields((f) => ({ ...f, [k]: e.target.value }));
  }

  async function submit(e: FormEvent) {
    e.preventDefault();
    setStatus("sending");
    setFeedback("");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(fields),
      });
      const data = await res.json();
      if (res.ok) {
        setStatus("sent");
        setFeedback(data.message);
        setFields({ name: "", email: "", subject: "", message: "" });
      } else {
        setStatus("error");
        setFeedback(data.error ?? "Something went wrong.");
      }
    } catch {
      setStatus("error");
      setFeedback("Network error — please try again.");
    }
  }

  if (status === "sent") {
    return (
      <div className="flex flex-col items-center justify-center rounded-2xl border border-green-200 bg-green-50 px-8 py-16 text-center">
        <span className="text-4xl">🙏</span>
        <p className="mt-4 text-lg font-semibold text-navy">{feedback}</p>
        <p className="mt-2 text-sm text-muted">We read every message and will respond shortly.</p>
        <button
          onClick={() => setStatus("idle")}
          className="mt-6 text-sm font-semibold text-blue underline-offset-2 hover:underline"
        >
          Send another message
        </button>
      </div>
    );
  }

  const inputCls =
    "w-full rounded-xl border border-navy/15 bg-cloud px-4 py-3 text-sm text-navy placeholder:text-muted/50 focus:border-azure focus:outline-none focus:ring-2 focus:ring-azure/20 transition";

  return (
    <form onSubmit={submit} className="space-y-5">
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label className="mb-1.5 block text-sm font-semibold text-navy" htmlFor="c-name">
            Your name
          </label>
          <input
            id="c-name" type="text" required autoComplete="name"
            placeholder="Full name" value={fields.name} onChange={set("name")}
            className={inputCls}
          />
        </div>
        <div>
          <label className="mb-1.5 block text-sm font-semibold text-navy" htmlFor="c-email">
            Email address
          </label>
          <input
            id="c-email" type="email" required autoComplete="email"
            placeholder="you@example.com" value={fields.email} onChange={set("email")}
            className={inputCls}
          />
        </div>
      </div>

      <div>
        <label className="mb-1.5 block text-sm font-semibold text-navy" htmlFor="c-subject">
          Subject <span className="font-normal text-muted">(optional)</span>
        </label>
        <input
          id="c-subject" type="text" autoComplete="off"
          placeholder="What's this about?" value={fields.subject} onChange={set("subject")}
          className={inputCls}
        />
      </div>

      <div>
        <label className="mb-1.5 block text-sm font-semibold text-navy" htmlFor="c-message">
          Message
        </label>
        <textarea
          id="c-message" required rows={6}
          placeholder="How can we help? Prayer requests, partnership enquiries, media questions — write freely."
          value={fields.message} onChange={set("message")}
          className={`${inputCls} resize-none`}
        />
      </div>

      {status === "error" && (
        <p role="alert" className="text-sm text-red-600">{feedback}</p>
      )}

      <button
        type="submit"
        disabled={status === "sending"}
        className="w-full rounded-full bg-navy py-3.5 text-sm font-semibold text-white transition hover:bg-blue disabled:opacity-60 sm:w-auto sm:px-10"
      >
        {status === "sending" ? "Sending…" : "Send message"}
      </button>
    </form>
  );
}

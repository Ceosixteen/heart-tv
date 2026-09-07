"use client";

import { useState } from "react";
import type { PartnershipContent } from "@/lib/content";

const FIELD =
  "w-full rounded-xl border border-navy/15 bg-white px-4 py-3 text-[15px] text-ink transition focus:border-blue focus:outline-none focus:ring-4 focus:ring-blue/12";
const LABEL = "block text-sm font-semibold text-navy";
const SLOTS = 6;

export default function StudioForm({ content }: { content: PartnershipContent }) {
  const [status, setStatus] = useState<"idle" | "saving" | "saved" | "error">("idle");
  const [message, setMessage] = useState("");

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    data.set("slideCount", String(SLOTS));
    setStatus("saving");
    try {
      const res = await fetch("/api/content", { method: "POST", body: data });
      const json = await res.json();
      if (!res.ok) throw new Error(json?.error ?? "Save failed.");
      setMessage("Saved. Reload /partnership to see it live.");
      setStatus("saved");
    } catch (err) {
      setMessage(err instanceof Error ? err.message : "Save failed.");
      setStatus("error");
    }
  }

  return (
    <form onSubmit={onSubmit} className="space-y-10">
      <section className="rounded-[1.5rem] border border-navy/10 bg-white p-7">
        <h2 className="display text-2xl text-navy">Studio key</h2>
        <p className="mt-2 text-sm text-muted">
          Required only if <code className="rounded bg-mist px-1.5 py-0.5">HEART_TV_STUDIO_KEY</code> is
          set in your environment.
        </p>
        <input name="studioKey" type="password" className={`${FIELD} mt-4 max-w-sm`} placeholder="••••••••" />
      </section>

      <section className="rounded-[1.5rem] border border-navy/10 bg-white p-7">
        <h2 className="display text-2xl text-navy">Hero</h2>
        <div className="mt-6 grid gap-5">
          <div>
            <label htmlFor="headline" className={LABEL}>Headline</label>
            <input id="headline" name="headline" defaultValue={content.hero.headline} className={`${FIELD} mt-2`} />
          </div>
          <div>
            <label htmlFor="subhead" className={LABEL}>Sub-headline</label>
            <textarea id="subhead" name="subhead" rows={3} defaultValue={content.hero.subhead} className={`${FIELD} mt-2 resize-y`} />
          </div>
          <div className="grid gap-5 sm:grid-cols-2">
            <div>
              <label htmlFor="heroVideo" className={LABEL}>Hero video (mp4 / webm, up to 200MB)</label>
              <input id="heroVideo" name="heroVideo" type="file" accept="video/*" className={`${FIELD} mt-2 file:mr-3 file:rounded-lg file:border-0 file:bg-navy file:px-3 file:py-1.5 file:text-sm file:text-white`} />
              <p className="mt-2 text-xs text-muted">
                Current: {content.hero.videoSrc || "none — an animated gradient is showing instead"}
              </p>
            </div>
            <div>
              <label htmlFor="heroPoster" className={LABEL}>Poster image (shown before the video loads)</label>
              <input id="heroPoster" name="heroPoster" type="file" accept="image/*" className={`${FIELD} mt-2 file:mr-3 file:rounded-lg file:border-0 file:bg-navy file:px-3 file:py-1.5 file:text-sm file:text-white`} />
              <p className="mt-2 text-xs text-muted">Current: {content.hero.posterSrc || "none"}</p>
            </div>
          </div>
        </div>
      </section>

      <section className="rounded-[1.5rem] border border-navy/10 bg-white p-7">
        <h2 className="display text-2xl text-navy">Giving slides</h2>
        <p className="mt-2 text-sm text-muted">
          Photographs of giving and charity for the &ldquo;Where does your money go?&rdquo;
          carousel. Leave a slot blank to drop it.
        </p>
        <div className="mt-6 space-y-6">
          {Array.from({ length: SLOTS }, (_, i) => {
            const slide = content.gallery[i];
            return (
              <div key={i} className="grid gap-4 rounded-2xl border border-navy/10 p-5 sm:grid-cols-[1fr_1.4fr]">
                <div>
                  <label htmlFor={`slide-${i}-file`} className={LABEL}>Slide {i + 1} image</label>
                  <input id={`slide-${i}-file`} name={`slide-${i}-file`} type="file" accept="image/*" className={`${FIELD} mt-2 file:mr-3 file:rounded-lg file:border-0 file:bg-navy file:px-3 file:py-1.5 file:text-sm file:text-white`} />
                  <p className="mt-2 break-all text-xs text-muted">Current: {slide?.src || "none"}</p>
                </div>
                <div className="space-y-3">
                  <input name={`slide-${i}-caption`} defaultValue={slide?.caption ?? ""} placeholder="Caption" className={FIELD} />
                  <textarea name={`slide-${i}-body`} rows={2} defaultValue={slide?.body ?? ""} placeholder="One sentence of context" className={`${FIELD} resize-y`} />
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {status === "error" && (
        <p role="alert" className="rounded-xl bg-blue/10 px-4 py-3 text-sm font-medium text-blue">{message}</p>
      )}
      {status === "saved" && (
        <p role="status" className="rounded-xl bg-green-600/10 px-4 py-3 text-sm font-medium text-green-800">{message}</p>
      )}

      <button
        type="submit"
        disabled={status === "saving"}
        className="rounded-full bg-blue px-8 py-4 text-base font-semibold text-white transition hover:bg-navy disabled:opacity-60"
      >
        {status === "saving" ? "Uploading…" : "Save partnership page"}
      </button>
    </form>
  );
}

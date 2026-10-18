"use client";

import Image from "next/image";
import { useRef, useState } from "react";
import media from "@/content/media.json";

type Sermon = { title: string; scripture: string; summary: string; takeaways: string[]; videoId: string };
const sermons: Sermon[] = media.sermons;
const channel = "https://www.youtube.com/@peteradministries";
const section = "mx-auto max-w-7xl px-5 py-20 sm:px-8 sm:py-24";

export default function MediaLibrary() {
  const [playing, setPlaying] = useState<string | null>(null);
  const [photoIndex, setPhotoIndex] = useState(0);
  const dialog = useRef<HTMLDialogElement>(null);
  const photo = media.photos[photoIndex];

  function movePhoto(direction: number) {
    setPhotoIndex((current) => (current + direction + media.photos.length) % media.photos.length);
  }

  return (
    <div className="bg-cloud text-ink">
      <nav aria-label="Media sections" className="border-y border-navy/10 bg-white">
        <div className="mx-auto flex max-w-7xl flex-wrap gap-2 px-5 py-4 sm:px-8">
          {[["videos", "Watch videos"], ["pictures", "In pictures"], ["sermons", "Sermon summaries"]].map(([id, label]) => (
            <a key={id} href={`#${id}`} className="rounded-full px-5 py-3 text-sm font-semibold text-navy transition hover:bg-mist">{label} <span aria-hidden>↗</span></a>
          ))}
        </div>
      </nav>

      <section id="videos" aria-labelledby="videos-heading" className={section}>
        <div className="mb-10 flex flex-wrap items-end justify-between gap-6">
          <div>
            <p className="eyebrow text-blue">Beyond the live broadcast</p>
            <h2 id="videos-heading" className="display mt-4 text-3xl text-navy sm:text-5xl">A message to return to.</h2>
            <p className="mt-4 max-w-xl leading-relaxed text-muted">Revisit services and moments from Peter AD Ministries. Make room for hope, wherever you are.</p>
          </div>
          <a href={`${channel}/videos`} target="_blank" rel="noopener noreferrer" className="rounded-full border border-navy/20 px-6 py-3 text-sm font-semibold text-navy hover:bg-white">All videos on YouTube ↗</a>
        </div>
        <div className="grid gap-7 md:grid-cols-2">
          {media.videos.map((video) => (
            <article key={video.id} className="overflow-hidden rounded-3xl border border-navy/10 bg-white">
              <div className="relative aspect-video bg-navy-deep">
                {playing === video.id ? (
                  <iframe className="absolute inset-0 h-full w-full" src={`https://www.youtube-nocookie.com/embed/${video.id}?autoplay=1&rel=0`} title={video.title} allow="autoplay; encrypted-media; picture-in-picture; fullscreen" allowFullScreen />
                ) : (
                  <button type="button" onClick={() => setPlaying(video.id)} aria-label={`Play ${video.title}`} className="group absolute inset-0 flex h-full w-full items-center justify-center overflow-hidden">
                    <Image src={`https://i.ytimg.com/vi/${video.id}/hqdefault.jpg`} alt="" fill unoptimized sizes="(max-width: 768px) 100vw, 50vw" className="object-cover opacity-75 transition duration-500 group-hover:scale-105 group-hover:opacity-90" />
                    <span className="relative grid h-16 w-16 place-items-center rounded-full bg-white text-2xl text-blue shadow-xl transition group-hover:scale-110" aria-hidden>▶</span>
                  </button>
                )}
              </div>
              <div className="p-7">
                <p className="eyebrow text-blue">{video.category}</p>
                <h3 className="mt-3 font-display text-2xl font-semibold text-navy">{video.title}</h3>
                <a className="mt-5 inline-block text-sm font-semibold text-blue underline-offset-4 hover:underline" href={`https://www.youtube.com/watch?v=${video.id}`} target="_blank" rel="noopener noreferrer">Watch on YouTube ↗</a>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section id="pictures" aria-labelledby="pictures-heading" className="bg-mist/60">
        <div className={section}>
          <p className="eyebrow text-blue">Life in the ministry</p>
          <h2 id="pictures-heading" className="display mt-4 text-3xl text-navy sm:text-5xl">Faith, seen in everyday moments.</h2>
          <p className="mt-4 max-w-xl leading-relaxed text-muted">Faces, fellowship and acts of care from our outreach. Select a photograph to take a closer look.</p>
          <div className="mt-10 grid grid-cols-2 gap-4 lg:grid-cols-3">
            {media.photos.map((item, index) => (
              <button key={item.src} type="button" onClick={() => { setPhotoIndex(index); dialog.current?.showModal(); }} aria-label={`View photo: ${item.caption}`} className="group relative aspect-[4/3] overflow-hidden rounded-2xl bg-navy-deep text-left">
                <Image src={item.src} alt={item.alt} fill sizes="(max-width: 1024px) 50vw, 33vw" className="object-cover transition duration-500 group-hover:scale-105" />
                <span className="absolute inset-0 bg-gradient-to-t from-ink/80 via-transparent to-transparent" />
                <span className="absolute inset-x-0 bottom-0 p-4 font-semibold text-white sm:p-6">{item.caption} <span aria-hidden>↗</span></span>
              </button>
            ))}
          </div>
        </div>
      </section>

      <section id="sermons" aria-labelledby="sermons-heading" className={section}>
        <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr]">
          <div>
            <p className="eyebrow text-blue">Carry the Word with you</p>
            <h2 id="sermons-heading" className="display mt-4 text-3xl text-navy sm:text-5xl">Sermon summaries.</h2>
            <p className="mt-5 leading-relaxed text-muted">A place to revisit the Scripture, key lessons and practical encouragement from each message.</p>
          </div>
          <div className="space-y-4">
            {sermons.length ? sermons.map((sermon) => (
              <details key={sermon.videoId} className="rounded-2xl border border-navy/10 bg-white p-7">
                <summary className="cursor-pointer font-display text-2xl font-semibold text-navy">{sermon.title}</summary>
                <p className="mt-4 text-sm font-semibold text-blue">{sermon.scripture}</p>
                <p className="mt-4 leading-relaxed text-muted">{sermon.summary}</p>
                <ul className="mt-4 list-disc space-y-2 pl-5 text-navy">{sermon.takeaways.map((point) => <li key={point}>{point}</li>)}</ul>
                <a href={`https://www.youtube.com/watch?v=${sermon.videoId}`} target="_blank" rel="noopener noreferrer" className="mt-5 inline-block font-semibold text-blue">Watch the full message ↗</a>
              </details>
            )) : (
              <div className="rounded-3xl border border-navy/10 bg-white p-8 sm:p-10">
                <span className="eyebrow text-blue">Coming soon</span>
                <h3 className="mt-4 font-display text-2xl font-semibold text-navy">More than a moment. A message to live by.</h3>
                <p className="mt-4 leading-relaxed text-muted">Sermon notes will appear here as they are published. In the meantime, explore the full messages on our YouTube channel.</p>
                <a href={`${channel}/videos`} target="_blank" rel="noopener noreferrer" className="mt-7 inline-flex rounded-full bg-blue px-6 py-3 font-semibold text-white hover:bg-navy">Explore the messages ↗</a>
              </div>
            )}
          </div>
        </div>
      </section>

      <dialog ref={dialog} aria-label="Outreach photo viewer" onClick={(event) => { if (event.target === event.currentTarget) dialog.current?.close(); }} onKeyDown={(event) => { if (event.key === "ArrowRight") movePhoto(1); if (event.key === "ArrowLeft") movePhoto(-1); }} className="fixed inset-0 m-auto w-[calc(100%-2rem)] max-w-5xl rounded-2xl bg-navy-deep p-4 text-white shadow-2xl backdrop:bg-black/85 sm:p-6">
        <div className="mb-4 flex items-center justify-between gap-4"><p aria-live="polite">{photo.caption} · {photoIndex + 1} / {media.photos.length}</p><button type="button" autoFocus onClick={() => dialog.current?.close()} className="rounded-full border border-white/30 px-4 py-2">Close ×</button></div>
        <div className="relative h-[60vh]"><Image src={photo.src} alt={photo.alt} fill sizes="90vw" className="object-contain" /></div>
        <div className="mt-4 flex justify-between"><button type="button" onClick={() => movePhoto(-1)} className="rounded-full border border-white/30 px-5 py-3">← Previous</button><button type="button" onClick={() => movePhoto(1)} className="rounded-full border border-white/30 px-5 py-3">Next →</button></div>
      </dialog>
    </div>
  );
}

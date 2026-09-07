import { promises as fs } from "fs";
import path from "path";
import { NextResponse } from "next/server";
import {
  getPartnershipContent,
  savePartnershipContent,
  type GallerySlide,
} from "@/lib/content";

const UPLOAD_DIR = path.join(process.cwd(), "public", "uploads");
const MAX_VIDEO = 200 * 1024 * 1024;
const MAX_IMAGE = 12 * 1024 * 1024;

function authorised(key: string) {
  const expected = process.env.HEART_TV_STUDIO_KEY;
  // With no key configured the studio is open — fine locally, never in production.
  if (!expected) return true;
  return key === expected;
}

function safeName(name: string) {
  return name.toLowerCase().replace(/[^a-z0-9.]+/g, "-").replace(/^-|-$/g, "").slice(-70) || "file";
}

async function store(file: File, limit: number): Promise<string> {
  if (file.size > limit) {
    throw new Error(`"${file.name}" is ${(file.size / 1e6).toFixed(0)}MB — over the ${(limit / 1e6).toFixed(0)}MB limit.`);
  }
  await fs.mkdir(UPLOAD_DIR, { recursive: true });
  const filename = `${Date.now().toString(36)}-${safeName(file.name)}`;
  const bytes = Buffer.from(await file.arrayBuffer());
  await fs.writeFile(path.join(UPLOAD_DIR, filename), bytes);
  return `/uploads/${filename}`;
}

function isFile(value: FormDataEntryValue | null): value is File {
  return value instanceof File && value.size > 0;
}

export async function POST(request: Request) {
  let form: FormData;
  try {
    form = await request.formData();
  } catch {
    return NextResponse.json({ error: "Could not read the upload." }, { status: 400 });
  }

  if (!authorised(String(form.get("studioKey") ?? ""))) {
    return NextResponse.json({ error: "That studio key is not correct." }, { status: 401 });
  }

  const current = await getPartnershipContent();

  try {
    const heroVideo = form.get("heroVideo");
    const heroPoster = form.get("heroPoster");

    const hero = {
      ...current.hero,
      headline: String(form.get("headline") ?? current.hero.headline).trim().slice(0, 200),
      subhead: String(form.get("subhead") ?? current.hero.subhead).trim().slice(0, 500),
      videoSrc: isFile(heroVideo) ? await store(heroVideo, MAX_VIDEO) : current.hero.videoSrc,
      posterSrc: isFile(heroPoster) ? await store(heroPoster, MAX_IMAGE) : current.hero.posterSrc,
    };

    const slideCount = Math.min(Number(form.get("slideCount") ?? 0) || 0, 12);
    const gallery: GallerySlide[] = [];
    for (let i = 0; i < slideCount; i += 1) {
      const caption = String(form.get(`slide-${i}-caption`) ?? "").trim().slice(0, 120);
      const body = String(form.get(`slide-${i}-body`) ?? "").trim().slice(0, 400);
      const existing = current.gallery[i];
      const upload = form.get(`slide-${i}-file`);
      const src = isFile(upload) ? await store(upload, MAX_IMAGE) : (existing?.src ?? "");
      if (!caption && !src) continue;
      gallery.push({ src, caption: caption || existing?.caption || "Heart TV outreach", body });
    }

    await savePartnershipContent({ hero, gallery });
    return NextResponse.json({ ok: true, hero, gallery });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Upload failed.";
    console.error("Content save failed", err);
    return NextResponse.json({ error: message }, { status: 400 });
  }
}

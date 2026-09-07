import { promises as fs } from "fs";
import path from "path";

export type HeroContent = {
  videoSrc: string;
  posterSrc: string;
  headline: string;
  subhead: string;
};

export type GallerySlide = {
  src: string;
  caption: string;
  body: string;
};

export type PartnershipContent = {
  hero: HeroContent;
  gallery: GallerySlide[];
};

export const CONTENT_PATH = path.join(process.cwd(), "content", "partnership.json");

export const FALLBACK_CONTENT: PartnershipContent = {
  hero: {
    videoSrc: "",
    posterSrc: "",
    headline: "Give once. Reshape a life. Then watch it happen.",
    subhead:
      "Heart TV partners fund scholarships, meet basic needs and carry the message of hope to souls, nations and the world.",
  },
  gallery: [],
};

export async function getPartnershipContent(): Promise<PartnershipContent> {
  try {
    const raw = await fs.readFile(CONTENT_PATH, "utf8");
    const parsed = JSON.parse(raw) as Partial<PartnershipContent>;
    return {
      hero: { ...FALLBACK_CONTENT.hero, ...(parsed.hero ?? {}) },
      gallery: Array.isArray(parsed.gallery) ? parsed.gallery : [],
    };
  } catch {
    return FALLBACK_CONTENT;
  }
}

export async function savePartnershipContent(content: PartnershipContent): Promise<void> {
  await fs.writeFile(CONTENT_PATH, `${JSON.stringify(content, null, 2)}\n`, "utf8");
}

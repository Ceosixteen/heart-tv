export interface LiveStatus {
  isLive: boolean;
  platform: "youtube" | "facebook" | null;
  videoId: string | null;
  title: string | null;
  thumbnailUrl: string | null;
  /** Facebook permalink, e.g. /hearttv/videos/12345 */
  permalink: string | null;
}

const NOT_LIVE: LiveStatus = {
  isLive: false,
  platform: null,
  videoId: null,
  title: null,
  thumbnailUrl: null,
  permalink: null,
};

let _cache: { data: LiveStatus; expires: number } | null = null;
const CACHE_MS = 5 * 60 * 1000;

async function checkYouTube(): Promise<LiveStatus | null> {
  const apiKey = process.env.YOUTUBE_API_KEY;
  const channelId = process.env.YOUTUBE_CHANNEL_ID;
  if (!apiKey || !channelId) return null;

  const url =
    `https://www.googleapis.com/youtube/v3/search` +
    `?part=snippet&channelId=${encodeURIComponent(channelId)}` +
    `&type=video&eventType=live&key=${encodeURIComponent(apiKey)}`;

  const res = await fetch(url, { cache: "no-store" });
  if (!res.ok) return null;

  const json = await res.json();
  const item = json.items?.[0];
  if (!item) return null;

  return {
    isLive: true,
    platform: "youtube",
    videoId: item.id.videoId,
    title: item.snippet.title ?? null,
    thumbnailUrl: item.snippet.thumbnails?.high?.url ?? null,
    permalink: null,
  };
}

async function checkFacebook(): Promise<LiveStatus | null> {
  const pageId = process.env.FACEBOOK_PAGE_ID;
  const token = process.env.FACEBOOK_ACCESS_TOKEN;
  if (!pageId || !token) return null;

  const url =
    `https://graph.facebook.com/v19.0/${encodeURIComponent(pageId)}/live_videos` +
    `?status=LIVE&fields=id,title,permalink_url` +
    `&access_token=${encodeURIComponent(token)}`;

  const res = await fetch(url, { cache: "no-store" });
  if (!res.ok) return null;

  const json = await res.json();
  const item = json.data?.[0];
  if (!item) return null;

  return {
    isLive: true,
    platform: "facebook",
    videoId: item.id,
    title: item.title ?? "Live on Facebook",
    thumbnailUrl: null,
    permalink: item.permalink_url ?? null,
  };
}

export async function getLiveStatus(): Promise<LiveStatus> {
  if (_cache && Date.now() < _cache.expires) return _cache.data;

  let data: LiveStatus;
  try {
    const [yt, fb] = await Promise.allSettled([checkYouTube(), checkFacebook()]);
    data =
      (yt.status === "fulfilled" && yt.value) ||
      (fb.status === "fulfilled" && fb.value) ||
      NOT_LIVE;
  } catch {
    data = NOT_LIVE;
  }

  _cache = { data, expires: Date.now() + CACHE_MS };
  return data;
}

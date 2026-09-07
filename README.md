# Heart TV

Website for **Heart TV**, the broadcast arm of **Peter AD Ministries** — a mission of
hope to change souls, nations and the world.

Next.js 16 (App Router) · React 19 · Tailwind CSS 4 · TypeScript.

```bash
npm run dev     # http://localhost:3000
npm run build
npm start
```

## What exists today

| Route | Purpose |
| --- | --- |
| `/partnership` | The partnership landing page (the deliverable) |
| `/partnership/manage` | Internal studio — upload the hero film and giving photos |
| `/api/partnership` | Receives partnership form submissions |
| `/api/content` | Receives studio uploads, writes `content/partnership.json` |
| `/` | Placeholder until the rest of the site is built |

`/live`, `/programmes`, `/about` and `/contact` are linked in the nav but not built yet.

## The partnership page, section by section

1. **Hero** — full-bleed uploaded video, muted/looping, with play and sound controls.
   With no video uploaded it falls back to an animated gradient, so the page never
   looks broken.
2. **Why become a partner** — four reasons, then a T.B. Joshua quote band.
3. **Where does your money go** — photo carousel (autoplay, arrows, dots, swipe,
   arrow keys) beside a 40/30/20/10 allocation breakdown.
4. **Benefits** — six partner benefits, closing on a second quote.
5. **Fill the partnership form** — tier picker, contact details, giving frequency and
   amount, prayer request, consent. Posts to `/api/partnership`.
6. **Talk to the team** — phone, WhatsApp and email cards, plus a soft opt-in for
   people who aren't ready to commit.

## Brand assets

The official logo was supplied as a flat JPEG on white. It was separated into its
three inks, un-composited from the paper, and re-traced, so `public/brand/` holds
transparent artwork rather than a knocked-out screenshot. Brand colours read off the
source file: royal `#0208B6` (the "H" and "rt."), azure `#2EBFF4` (the "ea"), and
navy `#080185` (the roundel).

| File | Use |
| --- | --- |
| `heart-tv-logo-solid-white.svg` | **Default reversed lockup.** Roundel painted solid, so nothing behind the logo shows through its "tv". Header, footer, join-section watermark. |
| `heart-tv-logo.svg` | Full colour, for light grounds. Studio masthead. |
| `heart-tv-mark.png` | Roundel alone, navy on white. Form seal. |
| `heart-tv-mark-white.png` | Roundel alone, reversed for dark grounds. |
| `heart-tv-logo.png` / `-white.png` | Pixel-exact rasters of the original, for print, decks and email signatures. |
| `heart-tv-logo-white.svg` | Knockout variant: the "tv" is a hole. Only for flat grounds. |
| `og-heart-tv.png` | 1200x630 social card. |

`app/icon.png` and `app/apple-icon.png` are the tab and home-screen icons, picked up
by Next.js from their filenames. Use `components/Logo.tsx` rather than referencing the
files directly:

```tsx
<Logo height={30} variant="white" />   // reversed lockup
<Logo height={30} variant="color" />   // full colour
<LogoMark size={38} />                 // roundel only
```

The header sits transparently only on routes listed in `DARK_HERO_ROUTES`
(`components/SiteHeader.tsx`); everywhere else it takes a navy ground, or the white
lockup and nav links disappear into a light page. Add new dark-hero routes there.

## Photography

Ten real outreach photographs live in `public/images/` and are placed like this:

| Photo | Where it appears |
| --- | --- |
| `children-gathering-field.jpg` | Hero still (replaced automatically once a hero video is uploaded) |
| `children-meal-let-love-lead.jpg` | Wide plate in "Why become a partner" |
| `ministry-among-children.jpg` | Background of the first T.B. Joshua quote band |
| `volunteers-carrying-food-sacks.jpg` | "Where does your money go" carousel, slide 1 |
| `families-seated-with-parcels.jpg` | Carousel, slide 2 |
| `families-with-maize-flour.jpg` | Carousel, slide 3 |
| `mother-five-children.jpg` | Carousel, slide 4 |
| `mothers-receiving-supplies.jpg` | Carousel, slide 5 |
| `father-and-child-support.jpg` | Carousel, slide 6 |
| `woman-carrying-food-home.jpg` | Closing quote in the partnership form column |

Carousel photos and captions are editable from `/partnership/manage`; the three fixed
placements are referenced directly in `app/partnership/page.tsx`.

## Uploading the hero video and giving photos

Go to `/partnership/manage`, choose the files, save. Uploads land in `public/uploads/`
and the paths are written to `content/partnership.json`. `/partnership` renders with
`dynamic = "force-dynamic"`, so a reload shows the change immediately.

Set a passcode to gate the studio:

```bash
echo 'HEART_TV_STUDIO_KEY=choose-something-long' >> .env.local
```

## Before this goes live

- **Authentication on `/partnership/manage`.** The studio key is a stopgap for local
  and staging use, not real auth.
- **Object storage for uploads.** Writing into `public/` works when self-hosting on a
  persistent disk; it does not survive serverless deploys.
- **A real destination for form submissions.** They currently append to
  `content/submissions.json`. Swap the marked block in `app/api/partnership/route.ts`
  for the ministry's CRM or mailing list.
- **Real contact details.** Phone numbers, WhatsApp, email and address are placeholders
  in `lib/site.ts`.
- **Confirm the giving split.** The 40/30/20/10 figures in `app/partnership/page.tsx`
  are illustrative and must match the ministry's audited allocation before publishing.
- **Data protection.** The form stores names, emails and prayer requests — add a privacy
  notice and a retention policy.
- **Logo source.** The artwork was rebuilt from a compressed JPEG. If the designer's
  original vector exists, drop it in and re-point `components/Logo.tsx`; the traced
  files are faithful but they are a reconstruction.
- **Photo consent.** The outreach photographs show identifiable adults and children, and
  two include handwritten cash amounts. Confirm the ministry holds consent to publish
  each one, and decide whether the cash-amount images should be cropped.

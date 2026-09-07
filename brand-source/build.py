import os, shutil, subprocess
from PIL import Image, ImageChops, ImageFilter, ImageDraw
import trace as T

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
DEST = os.path.join(ROOT, "public", "brand")
APP  = os.path.join(ROOT, "app")
os.makedirs(DEST, exist_ok=True)
W, H = T.W, T.H
NAVY = (8, 1, 133)

covs = T.covs
alpha = Image.new("L", (W, H), 0)
full = Image.new("RGBA", (W, H), (0, 0, 0, 0))
for n, rgb in T.INKS:
    full.paste(Image.new("RGBA", (W, H), rgb + (255,)), (0, 0), covs[n])
    alpha = ImageChops.lighter(alpha, covs[n])
full.putalpha(alpha)
full.save(f"{DEST}/heart-tv-logo.png")

white = Image.new("RGBA", (W, H), (255, 255, 255, 0)); white.putalpha(alpha)
white.save(f"{DEST}/heart-tv-logo-white.png")

# ---- roundel mark -------------------------------------------------------
# The mark is a true circle, so recover it from the navy layer's bounding box
# rather than tracing a silhouette: that keeps the edge perfectly round.
# navy is pinned to the roundel upstream, so its coverage bbox IS the disc.
bx0, by0, bx1, by1 = covs["navy"].point(lambda v: 255 if v > 128 else 0).getbbox()
cx, cy = (bx0 + bx1) / 2, (by0 + by1) / 2
rad = ((bx1 - bx0) + (by1 - by0)) / 4
print(f"disc from coverage: r={rad:.1f} at ({cx:.1f},{cy:.1f}); "
      f"trace said r={T.RAD:.1f} at ({T.CX:.1f},{T.CY:.1f})")
SS, PAD = 8, 4
side = int(rad * 2) + PAD * 2
disc = Image.new("L", (side * SS, side * SS), 0)
ImageDraw.Draw(disc).ellipse(
    [(PAD + (rad - rad)) * SS, PAD * SS, (PAD + 2 * rad) * SS, (PAD + 2 * rad) * SS], fill=255)
disc = disc.resize((side, side), Image.LANCZOS)

# Inside the disc the artwork is navy with the "tv" reversed out in white, so
# blend white -> navy by the navy coverage and keep the letters solid white.
box = (int(cx - rad) - PAD, int(cy - rad) - PAD)
crop = covs["navy"].crop((box[0], box[1], box[0] + side, box[1] + side))
mark = Image.new("RGBA", (side, side), (255, 255, 255, 255))
mark.paste(Image.new("RGBA", (side, side), NAVY + (255,)), (0, 0), crop)
mark.putalpha(disc)
mark.save(f"{DEST}/heart-tv-mark.png")

# Inverse roundel for dark grounds: white disc, opaque navy "tv". Nothing behind
# the logo shows through, so it holds up over photography as well as flat colour.
tvc = covs["tv"].crop((box[0], box[1], box[0] + side, box[1] + side))
mark_w = Image.new("RGBA", (side, side), (255, 255, 255, 255))
mark_w.paste(Image.new("RGBA", (side, side), NAVY + (255,)), (0, 0), tvc)
mark_w.putalpha(disc)
mark_w.save(f"{DEST}/heart-tv-mark-white.png")
print(f"mark {side}x{side} from r={rad:.1f} at ({cx:.0f},{cy:.0f})")

# ---- app icons + social card -------------------------------------------
def sq(size, pad_ratio, bg, out):
    canvas = Image.new("RGBA", (size, size), bg)
    inner = round(size * (1 - 2 * pad_ratio))
    m = mark.resize((inner, inner), Image.LANCZOS)
    canvas.alpha_composite(m, ((size - inner) // 2, (size - inner) // 2))
    canvas.save(out)

sq(512, 0.03, (0, 0, 0, 0), f"{DEST}/icon-512.png")
sq(512, 0.03, (0, 0, 0, 0), f"{APP}/icon.png")
sq(180, 0.08, (255, 255, 255, 255), f"{APP}/apple-icon.png")   # iOS ignores alpha

og = Image.new("RGBA", (1200, 630), (18, 16, 94, 255))          # navy-deep
lw = 760
# Render the solid lockup for the card so the roundel stays opaque; a knockout
# would let the card's own navy show through the "tv".
tmp = f"{DEST}/.og-lockup.png"
subprocess.run(["rsvg-convert", "-w", str(lw * 2),
                f"{DEST}/heart-tv-logo-solid-white.svg", "-o", tmp], check=True)
solid = Image.open(tmp).convert("RGBA")
lo = solid.resize((lw, round(lw * solid.height / solid.width)), Image.LANCZOS)
og.alpha_composite(lo, ((1200 - lw) // 2, (630 - lo.height) // 2 - 20))
og.convert("RGB").save(f"{DEST}/og-heart-tv.png", quality=95)
os.remove(tmp)

for f in ("heart-tv-logo.svg", "heart-tv-logo-white.svg",
          "heart-tv-logo-onblue.svg", "heart-tv-logo-solid-white.svg"):
    shutil.copy(f, f"{DEST}/{f}")
print("\n".join(sorted(os.listdir(DEST))))

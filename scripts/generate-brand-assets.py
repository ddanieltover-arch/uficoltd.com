#!/usr/bin/env python3
"""Generate favicon, apple-touch-icon, and OG image from brand logo."""

from pathlib import Path

from PIL import Image, ImageDraw

ROOT = Path(__file__).resolve().parents[1]
LOGO = ROOT / "public" / "images" / "site" / "logo.png"
SITE_DIR = ROOT / "public" / "images" / "site"
APP_DIR = ROOT / "src" / "app"


def crop_icon(logo: Image.Image) -> Image.Image:
    w, h = logo.size
    size = min(w, int(h * 0.58))
    left = (w - size) // 2
    top = max(0, int(h * 0.02))
    return logo.crop((left, top, left + size, top + size))


def save_favicon(icon: Image.Image, dest: Path) -> None:
    sizes = [(16, 16), (32, 32), (48, 48)]
    icon.save(dest, format="ICO", sizes=[(s, s) for s in [16, 32, 48]])


def save_png(icon: Image.Image, size: int, dest: Path) -> None:
    icon.resize((size, size), Image.Resampling.LANCZOS).save(dest, format="PNG")


def build_og_image(logo: Image.Image, dest: Path) -> None:
    width, height = 1200, 630
    canvas = Image.new("RGB", (width, height), "#ffffff")
    draw = ImageDraw.Draw(canvas)

    for y in range(height):
        t = y / height
        r = int(11 + (248 - 11) * t)
        g = int(162 + (250 - 162) * t)
        b = int(46 + (252 - 46) * t)
        draw.line([(0, y), (width, y)], fill=(r, g, b))

    logo_copy = logo.copy()
    max_w, max_h = 900, 420
    logo_copy.thumbnail((max_w, max_h), Image.Resampling.LANCZOS)
    x = (width - logo_copy.width) // 2
    y = (height - logo_copy.height) // 2
    canvas.paste(logo_copy, (x, y), logo_copy)
    canvas.save(dest, format="PNG", optimize=True)


def main() -> None:
    logo = Image.open(LOGO).convert("RGBA")
    icon = crop_icon(logo)

    SITE_DIR.mkdir(parents=True, exist_ok=True)
    APP_DIR.mkdir(parents=True, exist_ok=True)

    favicon_path = SITE_DIR / "favicon.ico"
    save_favicon(icon, favicon_path)

    save_png(icon, 32, SITE_DIR / "favicon-32.png")
    save_png(icon, 180, SITE_DIR / "apple-touch-icon.png")
    save_png(icon, 192, SITE_DIR / "icon-192.png")
    save_png(icon, 512, SITE_DIR / "icon-512.png")

    og_path = SITE_DIR / "og-image.png"
    build_og_image(logo, og_path)

    # Next.js app directory file conventions
    save_favicon(icon, APP_DIR / "favicon.ico")
    save_png(icon, 32, APP_DIR / "icon.png")
    save_png(icon, 180, APP_DIR / "apple-icon.png")
    og_path_app = APP_DIR / "opengraph-image.png"
    build_og_image(logo, og_path_app)

    print("Generated favicon, icons, and OG image.")


if __name__ == "__main__":
    main()

#!/usr/bin/env python3
"""Download site branding and marketing images to public/images/site/."""

import urllib.request
from pathlib import Path

try:
    import requests
except ImportError:
    requests = None

ROOT = Path(__file__).resolve().parents[1]
OUT_DIR = ROOT / "public" / "images" / "site"

UA = "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36"
BASE = "https://uficoltd.com/wp-content/uploads"

IMAGES = [
    f"{BASE}/2024/07/cropped-lg1.png",
    f"{BASE}/2024/07/sugarvsugars-brown-whitesugar-e1528986901183.webp",
    f"{BASE}/2024/07/Sugar-Cane-Harvesting_Web.webp",
    f"{BASE}/2024/07/sugarcane-being-harvested.webp",
    f"{BASE}/2024/07/Sugar-bum.webp",
    f"{BASE}/2024/07/1520142494635.webp",
    f"{BASE}/2024/07/overview.webp",
]


def download(url: str, dest: Path) -> None:
    if requests is not None:
        session = requests.Session()
        session.headers["User-Agent"] = UA
        session.get("https://uficoltd.com/", timeout=30)
        resp = session.get(url, timeout=60)
        resp.raise_for_status()
        dest.write_bytes(resp.content)
        return

    req = urllib.request.Request(url, headers={"User-Agent": UA})
    with urllib.request.urlopen(req, timeout=60) as resp:
        dest.write_bytes(resp.read())


def main() -> None:
    OUT_DIR.mkdir(parents=True, exist_ok=True)
    for url in IMAGES:
        filename = url.rstrip("/").split("/")[-1]
        dest = OUT_DIR / filename
        if dest.exists():
            print(f"Skip {filename} (exists)")
            continue
        print(f"Downloading {filename}...")
        try:
            download(url, dest)
        except Exception as exc:
            print(f"  FAILED: {exc}")


if __name__ == "__main__":
    main()

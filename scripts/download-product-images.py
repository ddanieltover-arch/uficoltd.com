#!/usr/bin/env python3
"""Download product images to public/images/products/ and update products.json."""

import json
import re
import urllib.request
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
PRODUCTS_JSON = ROOT / "content" / "products.json"
OUT_DIR = ROOT / "public" / "images" / "products"

UA = "Mozilla/5.0 (compatible; UFI-Image-Sync/1.0)"


def filename_from_url(url: str) -> str:
    name = url.rstrip("/").split("/")[-1]
    return re.sub(r"[^\w.\-]", "-", name)


def download(url: str, dest: Path) -> bool:
    req = urllib.request.Request(url, headers={"User-Agent": UA})
    with urllib.request.urlopen(req, timeout=60) as resp:
        dest.write_bytes(resp.read())
    return True


def main() -> None:
    products = json.loads(PRODUCTS_JSON.read_text(encoding="utf-8"))
    OUT_DIR.mkdir(parents=True, exist_ok=True)

    updated = 0
    for product in products:
        url = product.get("image", "")
        if not url or not url.startswith("http"):
            continue

        filename = filename_from_url(url)
        dest = OUT_DIR / filename
        local_path = f"/images/products/{filename}"

        if not dest.exists():
            try:
                print(f"Downloading {filename}...")
                download(url, dest)
            except Exception as exc:
                print(f"  FAILED {url}: {exc}")
                continue

        if product["image"] != local_path:
            product["image"] = local_path
            updated += 1

    PRODUCTS_JSON.write_text(json.dumps(products, indent=2, ensure_ascii=False) + "\n", encoding="utf-8")
    print(f"Done. Updated {updated} product image paths in products.json")


if __name__ == "__main__":
    main()

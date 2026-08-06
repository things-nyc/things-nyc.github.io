#!/usr/bin/env -S uv run
# /// script
# requires-python = ">=3.10"
# dependencies = ["pillow>=10", "piexif>=1.1.3"]
# ///
# Copyright (C) 2026 The Things Network New York, Inc.
"""Import teardown photos into the site.

Reads a directory of device subdirectories, each holding JPEG photos of a
teardown. For each photo it writes three files under
public/images/teardowns/<slug>/:

  full/     the original image data with GPS EXIF removed (pixels untouched)
  display/  long edge at most 1600 px, EXIF removed
  thumb/    long edge at most 640 px, EXIF removed

It then writes src/data/teardowns.json, one entry per device, photos sorted
by EXIF capture date. Re-running merges: titles, descriptions, and captions
already in the JSON are kept, so hand-edited text survives new photo batches.

Without --merge, each device's photo list is rebuilt from the source
directory, so the source must hold the complete set for that device. With
--merge, the source only needs the photos to add or replace: entries for
photos the source doesn't contain stay in the JSON, so a single replacement
shot can be imported without the full collection on hand.

Usage:
  uv run scripts/import-teardown-photos.py "/mnt/c/tmp/LoRaWan Gateways"
  uv run scripts/import-teardown-photos.py --merge ~/new-photos
"""

import argparse
import io
import json
import re
import sys
from pathlib import Path

import piexif
from PIL import Image, ImageOps

DISPLAY_LONG_EDGE = 1600
THUMB_LONG_EDGE = 640
JPEG_EXTENSIONS = {".jpg", ".jpeg"}

REPO_ROOT = Path(__file__).resolve().parent.parent
IMAGE_ROOT = REPO_ROOT / "public" / "images" / "teardowns"
DATA_FILE = REPO_ROOT / "src" / "data" / "teardowns.json"


def slugify(name: str) -> str:
    return re.sub(r"[^a-z0-9]+", "-", name.lower()).strip("-")


def output_name(source_name: str) -> str:
    stem, _, _ = source_name.lower().rpartition(".")
    return f"{stem}.jpg"


def exif_date(exif_dict: dict) -> str | None:
    """Return the capture date as ISO 8601, or None."""
    raw = exif_dict.get("Exif", {}).get(piexif.ExifIFD.DateTimeOriginal)
    if raw is None:
        raw = exif_dict.get("0th", {}).get(piexif.ImageIFD.DateTime)
    if raw is None:
        return None
    text = raw.decode("ascii", "replace")
    match = re.match(r"(\d{4}):(\d{2}):(\d{2}) (\d{2}:\d{2}:\d{2})", text)
    if not match:
        return None
    return f"{match.group(1)}-{match.group(2)}-{match.group(3)}T{match.group(4)}"


def strip_gps(source_bytes: bytes) -> bytes:
    """Return the JPEG with its GPS IFD removed and pixels untouched."""
    exif_dict = piexif.load(source_bytes)
    if not exif_dict.get("GPS"):
        return source_bytes
    exif_dict["GPS"] = {}
    # iPhone photos store SceneType as an int; piexif.dump rejects that.
    scene_type = exif_dict.get("Exif", {}).get(piexif.ExifIFD.SceneType)
    if isinstance(scene_type, int):
        del exif_dict["Exif"][piexif.ExifIFD.SceneType]
    out = io.BytesIO()
    piexif.insert(piexif.dump(exif_dict), source_bytes, out)
    return out.getvalue()


def has_gps(path: Path) -> bool:
    try:
        return bool(piexif.load(str(path)).get("GPS"))
    except Exception:
        return False


def save_resized(image: Image.Image, long_edge: int, quality: int, dest: Path) -> Image.Image:
    copy = image.copy()
    copy.thumbnail((long_edge, long_edge), Image.Resampling.LANCZOS)
    if copy.mode != "RGB":
        copy = copy.convert("RGB")
    copy.save(dest, "JPEG", quality=quality, optimize=True, progressive=True)
    return copy


def load_existing() -> dict[str, dict]:
    if not DATA_FILE.exists():
        return {}
    return {entry["slug"]: entry for entry in json.loads(DATA_FILE.read_text())}


def import_device(source_dir: Path, existing: dict | None, merge: bool) -> dict:
    slug = slugify(source_dir.name)
    old_photos = {}
    if existing:
        old_photos = {p["file"]: p for p in existing["photos"]}

    imported = {}
    for src in sorted(source_dir.iterdir()):
        if src.suffix.lower() not in JPEG_EXTENSIONS:
            continue
        source_bytes = src.read_bytes()
        name = output_name(src.name)

        full_dir = IMAGE_ROOT / slug / "full"
        display_dir = IMAGE_ROOT / slug / "display"
        thumb_dir = IMAGE_ROOT / slug / "thumb"
        for d in (full_dir, display_dir, thumb_dir):
            d.mkdir(parents=True, exist_ok=True)

        (full_dir / name).write_bytes(strip_gps(source_bytes))

        oriented = ImageOps.exif_transpose(Image.open(io.BytesIO(source_bytes)))
        display = save_resized(oriented, DISPLAY_LONG_EDGE, 80, display_dir / name)
        save_resized(oriented, THUMB_LONG_EDGE, 75, thumb_dir / name)

        imported[name] = {
            "file": name,
            "date": exif_date(piexif.load(source_bytes)),
            "width": display.width,
            "height": display.height,
            "caption": old_photos.get(name, {}).get("caption", ""),
        }

    if merge:
        for name, photo in old_photos.items():
            imported.setdefault(name, photo)
    photos = [imported[name] for name in sorted(imported)]

    # A photo without an EXIF date takes the date of its neighbor in
    # filename order, so it sorts with the batch it belongs to.
    for i, photo in enumerate(photos):
        if photo["date"] is None:
            neighbors = photos[i - 1::-1] if i else []
            neighbors = list(neighbors) + photos[i + 1:]
            photo["date"] = next((n["date"] for n in neighbors if n["date"]), "")
    photos.sort(key=lambda p: (p["date"], p["file"]))

    return {
        "slug": slug,
        "title": existing["title"] if existing else source_dir.name,
        "description": existing.get("description", "") if existing else "",
        "photos": photos,
    }


def main() -> int:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("source", type=Path, help="directory of device subdirectories")
    parser.add_argument(
        "--merge",
        action="store_true",
        help="add or replace only the photos present in the source directory; "
        "keep JSON entries for photos the source doesn't contain",
    )
    args = parser.parse_args()

    if not args.source.is_dir():
        parser.error(f"not a directory: {args.source}")

    existing = load_existing()
    entries = []
    for device_dir in sorted(p for p in args.source.iterdir() if p.is_dir()):
        entry = import_device(device_dir, existing.get(slugify(device_dir.name)), args.merge)
        entries.append(entry)
        print(f"{entry['slug']}: {len(entry['photos'])} photos")

    # Keep devices from earlier runs that this source directory doesn't cover.
    imported = {e["slug"] for e in entries}
    entries.extend(e for slug, e in existing.items() if slug not in imported)
    entries.sort(key=lambda e: max((p["date"] for p in e["photos"]), default=""), reverse=True)

    DATA_FILE.write_text(json.dumps(entries, indent=2) + "\n")
    print(f"wrote {DATA_FILE.relative_to(REPO_ROOT)} ({len(entries)} devices)")

    leaks = [p for p in IMAGE_ROOT.rglob("*.jpg") if has_gps(p)]
    if leaks:
        for p in leaks:
            print(f"GPS data survived in {p}", file=sys.stderr)
        return 1
    print("verified: no GPS data in any output file")
    return 0


if __name__ == "__main__":
    sys.exit(main())

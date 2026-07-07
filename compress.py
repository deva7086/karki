#!/usr/bin/env python
"""Compress all site images to web-optimised WebP for the free-tier deploy."""
import shutil
from pathlib import Path
from PIL import Image, ImageOps

IMG = Path("/home/deva/karkey-photography/public/images")
BACKUP = Path("/home/deva/karkey-photography/.predeploy-originals")
MAX_EDGE = 2000       # cap the longest side
QUALITY = 82

BACKUP.mkdir(exist_ok=True)
originals = sorted([p for p in IMG.glob("*") if p.suffix.lower() in (".jpg", ".jpeg", ".png")])

total_before = total_after = 0
for p in originals:
    shutil.copy2(p, BACKUP / p.name)          # keep a backup
    img = Image.open(p)
    img = ImageOps.exif_transpose(img).convert("RGB")
    w, h = img.size
    if max(w, h) > MAX_EDGE:
        s = MAX_EDGE / max(w, h)
        img = img.resize((round(w * s), round(h * s)), Image.LANCZOS)
    out = p.with_suffix(".webp")
    img.save(out, "WEBP", quality=QUALITY, method=6)
    before, after = p.stat().st_size, out.stat().st_size
    total_before += before
    total_after += after
    if p.suffix.lower() != ".webp":
        p.unlink()                            # remove the old jpg/png
    print(f"  {p.name:26s} {before//1024:5d}K -> {out.name:26s} {after//1024:5d}K")

print(f"\nTotal: {total_before//1024}K -> {total_after//1024}K "
      f"({100 - total_after*100//max(1,total_before)}% smaller)")

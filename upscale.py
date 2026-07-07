#!/usr/bin/env python
"""Upscale the low-res portfolio images 4x with Real-ESRGAN (via spandrel)."""
import sys, gc, math
from pathlib import Path
import torch
from PIL import Image
import numpy as np
from spandrel import ModelLoader

MODEL = Path.home() / ".cache/upscale-models/RealESRGAN_x4plus.pth"
IMG_DIR = Path("/home/deva/karkey-photography/public/images")
FILES = [
    "bride-white.png", "ritual-coconut.png", "couple-indoor.png",
    "engagement-garland.png", "heritage-man.png", "young-smile.png",
    "gold-steps.png", "yellow-saree.png", "couple-bw.png",
]

device = "cuda" if torch.cuda.is_available() else "cpu"
print(f"Loading model on {device} ...")
model = ModelLoader().load_from_file(str(MODEL)).eval().to(device)
scale = model.scale
print(f"Model scale: {scale}x")


def to_tensor(img: Image.Image) -> torch.Tensor:
    a = np.asarray(img.convert("RGB"), dtype=np.float32) / 255.0
    return torch.from_numpy(a).permute(2, 0, 1).unsqueeze(0)


def to_image(t: torch.Tensor) -> Image.Image:
    a = t.squeeze(0).permute(1, 2, 0).clamp(0, 1).cpu().numpy()
    return Image.fromarray((a * 255.0 + 0.5).astype(np.uint8))


@torch.inference_mode()
def upscale_tiled(t: torch.Tensor, tile=256, pad=16) -> torch.Tensor:
    """Tiled inference so it fits comfortably in 4 GB VRAM."""
    _, _, h, w = t.shape
    out = torch.zeros(1, 3, h * scale, w * scale, dtype=torch.float32)
    for y in range(0, h, tile):
        for x in range(0, w, tile):
            y0, x0 = max(0, y - pad), max(0, x - pad)
            y1, x1 = min(h, y + tile + pad), min(w, x + tile + pad)
            chunk = t[:, :, y0:y1, x0:x1].to(device)
            up = model(chunk).float().cpu()
            # crop away the padding (in output scale)
            top = (y - y0) * scale
            left = (x - x0) * scale
            hh = min(tile, h - y) * scale
            ww = min(tile, w - x) * scale
            out[:, :, y * scale:y * scale + hh, x * scale:x * scale + ww] = \
                up[:, :, top:top + hh, left:left + ww]
            del chunk, up
            if device == "cuda":
                torch.cuda.empty_cache()
    return out


for name in FILES:
    p = IMG_DIR / name
    img = Image.open(p)
    w, h = img.size
    t = to_tensor(img)
    try:
        out = upscale_tiled(t)
    except torch.cuda.OutOfMemoryError:
        print(f"  {name}: OOM -> retrying on CPU")
        torch.cuda.empty_cache()
        gm = model.to("cpu")
        with torch.inference_mode():
            out = gm(t).float()
        model.to(device)
    res = to_image(out)
    res.save(p, "PNG", optimize=True)
    print(f"  {name}: {w}x{h} -> {res.size[0]}x{res.size[1]}")
    del t, out, res
    gc.collect()
    if device == "cuda":
        torch.cuda.empty_cache()

print("Done.")

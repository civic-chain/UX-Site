#!/usr/bin/env python3
"""Finish a CivicChain illustration extraction.

Runs the system chroma-key remover, trims transparent padding, validates alpha,
and writes a sibling WebP at quality 80 without resampling.
"""

from __future__ import annotations

import argparse
import os
from pathlib import Path
import subprocess
import sys


DEFAULT_HELPER = (
    Path(os.environ.get("CODEX_HOME", Path.home() / ".codex"))
    / "skills"
    / ".system"
    / "imagegen"
    / "scripts"
    / "remove_chroma_key.py"
)


def die(message: str) -> None:
    print(f"Error: {message}", file=sys.stderr)
    raise SystemExit(1)


def load_pillow():
    try:
        from PIL import Image
    except ImportError:
        die(
            "Pillow is required. In Codex Desktop, call load_workspace_dependencies "
            "and run this script with the bundled Python executable."
        )
    return Image


def parse_args() -> argparse.Namespace:
    parser = argparse.ArgumentParser(
        description=(
            "Remove chroma-key background, trim transparent padding, and write "
            "transparent PNG plus WebP."
        )
    )
    parser.add_argument("--input", required=True, help="Chroma-key source image.")
    parser.add_argument("--out", required=True, help="Final transparent PNG path.")
    parser.add_argument(
        "--webp",
        help="Optional WebP path. Defaults to sibling path with .webp suffix.",
    )
    parser.add_argument("--quality", type=int, default=80, help="WebP quality, 1-100.")
    parser.add_argument(
        "--helper",
        default=str(DEFAULT_HELPER),
        help="Path to system remove_chroma_key.py helper.",
    )
    parser.add_argument("--force", action="store_true", help="Overwrite outputs.")
    parser.add_argument("--edge-contract", type=float, default=0.0)
    parser.add_argument("--edge-feather", type=float, default=0.0)
    parser.add_argument(
        "--trim-padding",
        type=int,
        default=5,
        help="Transparent pixels to keep around the detected subject.",
    )
    parser.add_argument(
        "--trim-alpha-threshold",
        type=int,
        default=24,
        help="Alpha threshold for medium-tolerance trimming, 0-255.",
    )
    parser.add_argument(
        "--no-trim",
        action="store_true",
        help="Skip transparent-border trimming.",
    )
    parser.add_argument(
        "--allow-non-green-key",
        action="store_true",
        help="Skip the default green chroma-key source validation.",
    )
    return parser.parse_args()


def validate_paths(args: argparse.Namespace) -> tuple[Path, Path, Path, Path]:
    source = Path(args.input)
    png = Path(args.out)
    webp = Path(args.webp) if args.webp else png.with_suffix(".webp")
    helper = Path(args.helper)

    if not source.exists():
        die(f"input not found: {source}")
    if not helper.exists():
        die(f"chroma-key helper not found: {helper}")
    if png.suffix.lower() != ".png":
        die("--out must be a .png path")
    if webp.suffix.lower() != ".webp":
        die("--webp must be a .webp path")
    if not 1 <= args.quality <= 100:
        die("--quality must be between 1 and 100")
    if args.trim_padding < 0:
        die("--trim-padding must be 0 or greater")
    if not 0 <= args.trim_alpha_threshold <= 255:
        die("--trim-alpha-threshold must be between 0 and 255")
    for path in (png, webp):
        if path.exists() and not args.force:
            die(f"output already exists: {path} (use --force)")
        path.parent.mkdir(parents=True, exist_ok=True)
    return source, png, webp, helper


def run_chroma_helper(
    *,
    source: Path,
    png: Path,
    helper: Path,
    edge_contract: float,
    edge_feather: float,
    force: bool,
) -> None:
    command = [
        sys.executable,
        str(helper),
        "--input",
        str(source),
        "--out",
        str(png),
        "--auto-key",
        "border",
        "--soft-matte",
        "--transparent-threshold",
        "12",
        "--opaque-threshold",
        "220",
        "--despill",
    ]
    if edge_contract:
        command += ["--edge-contract", str(edge_contract)]
    if edge_feather:
        command += ["--edge-feather", str(edge_feather)]
    if force:
        command.append("--force")

    subprocess.run(command, check=True)


def validate_green_chroma_source(source: Path) -> None:
    Image = load_pillow()
    with Image.open(source) as image:
        image = image.convert("RGB")
        width, height = image.size
        samples = []
        for x in range(width):
            samples.append(image.getpixel((x, 0)))
            samples.append(image.getpixel((x, height - 1)))
        for y in range(height):
            samples.append(image.getpixel((0, y)))
            samples.append(image.getpixel((width - 1, y)))

    greenish = [
        (r, g, b)
        for r, g, b in samples
        if g >= 160 and g >= r * 1.6 and g >= b * 1.6
    ]
    if len(greenish) / max(len(samples), 1) < 0.85:
        die("source border is not predominantly green chroma-key; regenerate with #00ff00")


def trim_transparent_padding(
    png: Path,
    *,
    padding: int,
    alpha_threshold: int,
) -> tuple[tuple[int, int], tuple[int, int], tuple[int, int, int, int]]:
    Image = load_pillow()
    with Image.open(png) as image:
        image = image.convert("RGBA")
        width, height = image.size
        alpha = image.getchannel("A")
        mask = alpha.point(lambda value: 255 if value > alpha_threshold else 0)
        bbox = mask.getbbox()
        if bbox is None:
            die("cannot trim: no opaque subject pixels found")

        left, top, right, bottom = bbox
        crop_box = (
            max(left - padding, 0),
            max(top - padding, 0),
            min(right + padding, width),
            min(bottom + padding, height),
        )
        if crop_box != (0, 0, width, height):
            image.crop(crop_box).save(png)
        else:
            image.save(png)
        return (width, height), (crop_box[2] - crop_box[0], crop_box[3] - crop_box[1]), crop_box


def validate_alpha(png: Path) -> None:
    Image = load_pillow()
    with Image.open(png) as png_image:
        if png_image.mode != "RGBA":
            die(f"PNG must be RGBA, got {png_image.mode}")

        alpha = png_image.getchannel("A")
        alpha_min, alpha_max = alpha.getextrema()
        if alpha_min != 0 or alpha_max == 0:
            die("PNG alpha validation failed: expected transparent and opaque pixels")

        width, height = png_image.size
        corners = [
            alpha.getpixel((0, 0)),
            alpha.getpixel((width - 1, 0)),
            alpha.getpixel((0, height - 1)),
            alpha.getpixel((width - 1, height - 1)),
        ]
        if max(corners) > 8:
            die(f"PNG corners are not transparent enough: {corners}")

        alpha_values = alpha.get_flattened_data()
        opaque_pixels = sum(1 for value in alpha_values if value > 8)
        total_pixels = width * height
        coverage = opaque_pixels / total_pixels
        if coverage < 0.01:
            die(f"subject coverage is too small: {coverage:.2%}")
        if coverage > 0.99:
            die(f"background removal likely failed: coverage {coverage:.2%}")


def validate_sizes(source: Path, png: Path, webp: Path | None = None) -> None:
    Image = load_pillow()
    with Image.open(source) as source_image, Image.open(png) as png_image:
        if png_image.size[0] > source_image.size[0] or png_image.size[1] > source_image.size[1]:
            die(f"PNG grew: source {source_image.size}, png {png_image.size}")

    if webp:
        with Image.open(webp) as webp_image, Image.open(png) as png_image:
            if webp_image.size != png_image.size:
                die(f"WebP size changed: png {png_image.size}, webp {webp_image.size}")


def save_webp(png: Path, webp: Path, quality: int, force: bool) -> None:
    Image = load_pillow()
    if webp.exists() and force:
        webp.unlink()
    with Image.open(png) as image:
        if image.mode != "RGBA":
            image = image.convert("RGBA")
        image.save(webp, "WEBP", quality=quality, method=6)


def main() -> None:
    args = parse_args()
    source, png, webp, helper = validate_paths(args)
    if not args.allow_non_green_key:
        validate_green_chroma_source(source)
    run_chroma_helper(
        source=source,
        png=png,
        helper=helper,
        edge_contract=args.edge_contract,
        edge_feather=args.edge_feather,
        force=args.force,
    )
    if args.no_trim:
        trim_from = trim_to = None
        crop_box = None
    else:
        trim_from, trim_to, crop_box = trim_transparent_padding(
            png,
            padding=args.trim_padding,
            alpha_threshold=args.trim_alpha_threshold,
        )
    validate_alpha(png)
    validate_sizes(source, png)
    save_webp(png, webp, args.quality, args.force)
    validate_alpha(png)
    validate_sizes(source, png, webp)
    if not args.no_trim:
        print(f"Trim: {trim_from} -> {trim_to} crop_box={crop_box}")
    print(f"PNG: {png}")
    print(f"WebP: {webp}")


if __name__ == "__main__":
    main()

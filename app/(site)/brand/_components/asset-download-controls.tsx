"use client";

import { useEffect, useRef, useState } from "react";

import { Button } from "@/components/ui/button";
import { SystemIcon } from "@/components/ui/system-icon";

type LogoDownloadAsset = {
  label: string;
  slug: string;
  src: string;
};

type RasterVariant = {
  id: string;
  label: string;
  detail: string;
  extension: "png" | "jpg";
  mimeType: "image/png" | "image/jpeg";
  backgroundToken: string | null;
  paintToken: string | null;
};

const rasterVariants: readonly RasterVariant[] = [
  {
    id: "png-transparent",
    label: "PNG",
    detail: "Transparent",
    extension: "png",
    mimeType: "image/png",
    backgroundToken: null,
    paintToken: null,
  },
  {
    id: "png-cream",
    label: "PNG",
    detail: "Cream",
    extension: "png",
    mimeType: "image/png",
    backgroundToken: "--background",
    paintToken: null,
  },
  {
    id: "png-blue",
    label: "PNG",
    detail: "Blue",
    extension: "png",
    mimeType: "image/png",
    backgroundToken: "--foreground",
    paintToken: "--background",
  },
  {
    id: "jpg-cream",
    label: "JPG",
    detail: "Cream",
    extension: "jpg",
    mimeType: "image/jpeg",
    backgroundToken: "--background",
    paintToken: null,
  },
  {
    id: "jpg-blue",
    label: "JPG",
    detail: "Blue",
    extension: "jpg",
    mimeType: "image/jpeg",
    backgroundToken: "--foreground",
    paintToken: "--background",
  },
];

type DownloadState = "idle" | "working" | "done" | "error";

type AssetDownloadControlsProps = {
  asset: LogoDownloadAsset;
};

export function AssetDownloadControls({ asset }: AssetDownloadControlsProps) {
  const [states, setStates] = useState<Record<string, DownloadState>>({});
  const [message, setMessage] = useState<string | null>(null);
  const controlsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    controlsRef.current?.setAttribute("data-asset-download-ready", "true");
  }, []);

  async function handleRasterDownload(variant: RasterVariant) {
    const key = `${asset.slug}-${variant.id}`;
    setStates((current) => ({ ...current, [key]: "working" }));
    setMessage(null);

    try {
      const blob = await createRasterLogo(asset.src, variant);
      downloadBlob(blob, getRasterFilename(asset.slug, variant));
      setStates((current) => ({ ...current, [key]: "done" }));
    } catch {
      setStates((current) => ({ ...current, [key]: "error" }));
      setMessage("Raster export failed. Use SVG while this browser is checked.");
    }
  }

  return (
    <div
      ref={controlsRef}
      className="grid gap-2"
      data-asset-download-ready="false"
    >
      <div className="flex flex-wrap gap-2">
        <Button asChild variant="outline" size="sm">
          <a href={asset.src} download={`${asset.slug}.svg`}>
            SVG
            <SystemIcon name="arrow-right" size="xs" />
          </a>
        </Button>
        {rasterVariants.map((variant) => {
          const key = `${asset.slug}-${variant.id}`;
          const state = states[key] ?? "idle";
          const isWorking = state === "working";

          return (
            <Button
              key={variant.id}
              type="button"
              variant={state === "error" ? "soft" : "outline"}
              size="sm"
              disabled={isWorking}
              aria-label={`Download ${asset.label} as ${variant.label} on ${variant.detail}`}
              data-asset-download={key}
              onClick={() => void handleRasterDownload(variant)}
            >
              {isWorking ? "Making" : variant.label}
              <span className="body-xs normal-case text-current/60">
                {variant.detail}
              </span>
              <SystemIcon name={state === "done" ? "check" : "arrow-right"} size="xs" />
            </Button>
          );
        })}
      </div>
      <p className="min-h-4 body-xs text-current/62" aria-live="polite">
        {message}
      </p>
    </div>
  );
}

async function createRasterLogo(src: string, variant: RasterVariant) {
  const svgText = await fetchSvg(src);
  const background = variant.backgroundToken
    ? resolveCssToken(variant.backgroundToken)
    : null;
  const paint = variant.paintToken ? resolveCssToken(variant.paintToken) : null;
  const { blob, width, height } = createSvgBlob(svgText, paint);
  const svgUrl = URL.createObjectURL(blob);

  try {
    const image = await decodeImage(svgUrl);
    const canvas = document.createElement("canvas");
    const scale = 4;

    canvas.width = Math.ceil(width * scale);
    canvas.height = Math.ceil(height * scale);

    const context = canvas.getContext("2d", { willReadFrequently: true });
    if (!context) {
      throw new Error("Canvas is unavailable.");
    }

    context.scale(scale, scale);

    if (background) {
      context.fillStyle = background;
      context.fillRect(0, 0, width, height);
    }

    context.drawImage(image, 0, 0, width, height);
    assertCanvasHasVisibleContent(canvas, Boolean(background));

    return await canvasToBlob(canvas, variant.mimeType);
  } finally {
    URL.revokeObjectURL(svgUrl);
  }
}

async function fetchSvg(src: string) {
  const response = await fetch(src);

  if (!response.ok) {
    throw new Error(`Could not fetch ${src}.`);
  }

  return response.text();
}

function createSvgBlob(svgText: string, paint: string | null) {
  const parser = new DOMParser();
  const documentNode = parser.parseFromString(svgText, "image/svg+xml");

  if (documentNode.querySelector("parsererror")) {
    throw new Error("SVG could not be parsed.");
  }

  const svg = documentNode.documentElement;
  svg.querySelectorAll("script, foreignObject").forEach((node) => node.remove());
  svg.setAttribute("xmlns", "http://www.w3.org/2000/svg");

  if (paint) {
    svg.querySelectorAll("[fill]").forEach((node) => {
      const fill = node.getAttribute("fill");
      if (fill && fill !== "none") {
        node.setAttribute("fill", paint);
      }
    });

    svg.querySelectorAll("[stroke]").forEach((node) => {
      const stroke = node.getAttribute("stroke");
      if (stroke && stroke !== "none") {
        node.setAttribute("stroke", paint);
      }
    });
  }

  const { width, height } = getSvgDimensions(svg);
  svg.setAttribute("width", String(width));
  svg.setAttribute("height", String(height));

  return {
    blob: new Blob([new XMLSerializer().serializeToString(svg)], {
      type: "image/svg+xml;charset=utf-8",
    }),
    height,
    width,
  };
}

function getSvgDimensions(svg: Element) {
  const width = Number.parseFloat(svg.getAttribute("width") ?? "");
  const height = Number.parseFloat(svg.getAttribute("height") ?? "");
  const viewBox = svg.getAttribute("viewBox")?.split(/\s+/).map(Number);

  return {
    width: Number.isFinite(width) && width > 0 ? width : viewBox?.[2] ?? 512,
    height: Number.isFinite(height) && height > 0 ? height : viewBox?.[3] ?? 512,
  };
}

async function decodeImage(src: string) {
  const image = new Image();
  image.decoding = "async";

  const loaded = new Promise<void>((resolve, reject) => {
    image.onload = () => resolve();
    image.onerror = () => reject(new Error("SVG image decode failed."));
  });

  image.src = src;
  await loaded;
  await image.decode().catch(() => undefined);

  return image;
}

function assertCanvasHasVisibleContent(canvas: HTMLCanvasElement, hasBackground: boolean) {
  const context = canvas.getContext("2d", { willReadFrequently: true });
  if (!context) {
    throw new Error("Canvas is unavailable.");
  }

  const { data, height, width } = context.getImageData(0, 0, canvas.width, canvas.height);
  const pixelCount = width * height;
  const stride = Math.max(1, Math.floor(pixelCount / 50000)) * 4;
  const first = [data[0], data[1], data[2], data[3]];

  for (let index = 0; index < data.length; index += stride) {
    const red = data[index] ?? 0;
    const green = data[index + 1] ?? 0;
    const blue = data[index + 2] ?? 0;
    const alpha = data[index + 3] ?? 0;

    if (!hasBackground && alpha > 0) {
      return;
    }

    if (
      hasBackground &&
      (Math.abs(red - first[0]) > 4 ||
        Math.abs(green - first[1]) > 4 ||
        Math.abs(blue - first[2]) > 4 ||
        Math.abs(alpha - first[3]) > 4)
    ) {
      return;
    }
  }

  throw new Error("Canvas render was blank.");
}

async function canvasToBlob(canvas: HTMLCanvasElement, mimeType: RasterVariant["mimeType"]) {
  return new Promise<Blob>((resolve, reject) => {
    canvas.toBlob(
      (blob) => {
        if (!blob || blob.size === 0) {
          reject(new Error("Canvas export returned an empty file."));
          return;
        }

        resolve(blob);
      },
      mimeType,
      0.92,
    );
  });
}

function resolveCssToken(tokenName: string) {
  const value = getComputedStyle(document.documentElement)
    .getPropertyValue(tokenName)
    .trim();

  if (!value) {
    throw new Error(`Missing CSS token ${tokenName}.`);
  }

  return value;
}

function downloadBlob(blob: Blob, filename: string) {
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");

  window.dispatchEvent(
    new CustomEvent("brand-asset-download-created", {
      detail: {
        filename,
        mimeType: blob.type,
        size: blob.size,
      },
    }),
  );

  link.href = url;
  link.download = filename;
  document.body.append(link);
  link.click();
  link.remove();

  window.setTimeout(() => URL.revokeObjectURL(url), 1000);
}

function getRasterFilename(slug: string, variant: RasterVariant) {
  return `${slug}-${variant.detail.toLowerCase()}-${variant.extension}.${variant.extension}`;
}

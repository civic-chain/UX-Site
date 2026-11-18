import Image, { type ImageProps } from "next/image";

import { cn } from "@/lib/utils";

type BrandRasterImageProps = ImageProps;

export function BrandRasterImage({
  alt,
  className,
  ...props
}: BrandRasterImageProps) {
  return (
    <Image
      {...props}
      alt={alt}
      className={cn("mix-blend-multiply", className)}
    />
  );
}

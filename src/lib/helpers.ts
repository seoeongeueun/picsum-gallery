import type { GalleryImage } from "@/types/types";

export function debounce<T extends (...args: unknown[]) => void>(
  fn: T,
  delay = 200
) {
  let timeoutId: ReturnType<typeof setTimeout>;
  return (...args: Parameters<T>) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => fn(...args), delay);
  };
}

export function throttle<T extends (...args: unknown[]) => void>(
  func: T,
  limit = 150
) {
  let inThrottle: boolean;
  return function (this: unknown, ...args: Parameters<T>) {
    if (!inThrottle) {
      func.apply(this, args);
      inThrottle = true;
      setTimeout(() => (inThrottle = false), limit);
    }
  };
}

export function packImages(images: GalleryImage[]) {
  if (!Array.isArray(images) || images.some((img) => !img)) {
    console.warn("packImages(): invalid images array", images);
    return [];
  }
  const packer = new MaxRectsPacker(
    window.innerWidth,
    window.innerHeight / 2,
    20,
    {
      smart: false,
      square: false,
    }
  );
  console.log(images);
  const scaledImages = images.map((img) => {
    console.log(img);
    const ratio = img.width / img.height;
    const scaledWidth = Math.min(
      Math.max(200, img.width / 10),
      window.innerWidth
    );
    const scaledHeight = scaledWidth / ratio;
    return { ...img, scaledWidth, scaledHeight };
  });

  for (const img of scaledImages) {
    packer.add(img.scaledWidth, img.scaledHeight, img);
  }

  return packer.bins[0].rects;
}

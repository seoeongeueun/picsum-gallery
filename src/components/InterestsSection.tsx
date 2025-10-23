import { useImages } from "@/hooks/useImages";
import { useSelectedImageStore } from "@/stores/useSelectedImageStore";
import { packImages } from "@/lib/helpers";
import type { GalleryImage } from "@/types/types";
import { MaxRectsPacker } from "maxrects-packer";
import { useEffect, useState, useRef } from "react";

export default function InterestsSection() {
  const ids = useSelectedImageStore((s) => s.selectedIds);
  const { useFetchImagesByIds } = useImages();
  const [imgs, setImgs] = useState();
  const wallRef = useRef<HTMLDivElement>(null);

  const { data: images, isLoading, isError } = useFetchImagesByIds(ids);

  useEffect(() => {
    if (!isLoading && images && images.length > 0) {
      setImgs(packImages(images));
    }
  }, [images, isLoading]);

  // maxRectsPacker 로직을 이용해 이미지의 최적 위치를 반환
  function packImages(images: GalleryImage[]) {
    const wall = wallRef.current;
    if (!wall) return;

    console.log(wall.clientHeight, wall.clientWidth);
    const gap = 50; //이미지 사이 간격 값
    const packer = new MaxRectsPacker(
      wall.clientWidth,
      wall.clientHeight,
      gap,
      {
        smart: false,
        square: false,
      }
    );

    for (const img of images) {
      // 10 - 20 까지 랜덤 비율로 이미지를 축소
      const randomRatio = Math.floor(Math.random() * (20 - 10 + 1)) + 10;
      // 배율대로 축소하되 최소 너비는 100으로 보장
      const scaledWidth = Math.max(100, img.width / randomRatio);

      console.log(
        scaledWidth,
        scaledWidth / (img.width / img.height),
        img.width
      );

      packer.add(scaledWidth, scaledWidth / (img.width / img.height), img);
    }

    return packer.bins[0].rects;
  }

  return (
    <section aria-label="관심 목록" className="w-full h-full">
      {/* <header className="text-center absolute flex flex-col justify-start items-start w-full gap-1">
        <p className="font-semibold text-theme">Wall of Interests</p>
      </header> */}
      <div ref={wallRef} className="relative w-full h-full images-wall">
        {imgs?.map((rect) => (
          <img
            key={rect.data.id}
            src={rect.data.download_url}
            alt={rect.data.author}
            style={{
              position: "absolute",
              left: `${rect.x}px`,
              top: `${rect.y}px`,
              width: `${rect.width}px`,
              height: `${rect.height}px`,
              objectFit: "cover",
            }}
          />
        ))}
      </div>
    </section>
  );
}

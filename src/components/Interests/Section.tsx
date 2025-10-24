import { useImages } from "@/hooks/useImages";
import { useSelectedImageStore } from "@/stores/useSelectedImageStore";
import type { GalleryImage, Rect } from "@/types/types";
import { MaxRectsPacker } from "maxrects-packer";
import gsap from "gsap";
import { useEffect, useState, useRef, useLayoutEffect } from "react";
import "./interests.css";

export default function Interests() {
  const ids = useSelectedImageStore((s) => s.selectedIds);
  const { useFetchImagesByIds } = useImages();
  const [rects, setRects] = useState<Rect<GalleryImage>[]>();
  const wallRef = useRef<HTMLDivElement>(null);

  const { data: images, isFetching, isError } = useFetchImagesByIds(ids);

  useEffect(() => {
    if (!isFetching && images && images.length > 0) {
      setRects(packImages(images));
    }
  }, [images, isFetching]);

  // maxRectsPacker 로직을 이용해 이미지의 최적 위치를 반환
  function packImages(images: GalleryImage[]): Rect<GalleryImage>[] {
    const wall = wallRef.current;
    if (!wall) return [];

    const gap = 50; //이미지 사이 간격 값
    const packer = new MaxRectsPacker(
      wall.clientWidth,
      wall.clientHeight - 100,
      gap,
      {
        smart: false,
        square: false,
      }
    );

    for (const img of images) {
      // 랜덤 비율로 이미지를 축소 & 디바이스 너비에 따라 배율 조절
      const randomRatio =
        window.innerWidth < 539
          ? Math.floor(Math.random() * (50 - 20 + 1)) + 20
          : Math.floor(Math.random() * (30 - 15 + 1)) + 15;

      // 배율대로 축소하되 최소 너비는 70으로 보장
      const scaledWidth = Math.max(70, img.width / randomRatio);

      packer.add(scaledWidth, scaledWidth / (img.width / img.height), img);
    }

    return packer.bins[0].rects ?? [];
  }

  useLayoutEffect(() => {
    if (!rects?.length) return;

    const ctx = gsap.context(() => {
      const frames = gsap.utils.toArray<HTMLDivElement>(".frame");

      gsap.fromTo(
        frames,
        {
          opacity: 0,
          y: -50,
        },
        {
          opacity: 1,
          y: 0,
          duration: 0.5,
          ease: "back.out(1.7)", // 바운스
          stagger: 0.12, //순서대로 딜레이
          clearProps: "transform", //완료 후 transform 속성을 제거해서 hover 회전이 적용될 수 잇ㄱ게
        }
      );
    }, wallRef);

    return () => ctx.revert();
  }, [rects]);

  const dropAnimation = (frame: HTMLImageElement) => {
    if (!wallRef.current) return;

    const wall = wallRef.current!;
    const wallH = wall.clientHeight;
    const elBottom = frame.offsetTop + frame.offsetHeight;
    const dropDist = Math.max(0, wallH - elBottom);
    const rotZ = gsap.utils.random(-10, 10, 1);
    const rotX = gsap.utils.random(30, 50, 1);

    const tl = gsap.timeline({
      defaults: { ease: "power2.in" },
      //애니메이션 완료 후 리스트에서 클릭된 아이디를 제거
      //onComplete: () => toggleId(id),
    });

    frame.style.zIndex = "50";

    tl.to(frame, {
      y: `+=${dropDist}`,
      rotationZ: rotZ,
      rotationX: rotX,
      duration: 0.9,
    })
      .to(frame, {
        y: "-=5", //살짝 바운스
        rotationX: rotX * 0.9,
        duration: 0.15,
        ease: "power2.out",
      })
      .to(frame, {
        y: "+=12",
        rotationX: 90, //앞으로 쓰러트리기
        rotationZ: rotZ * 0.3,
        opacity: 0,
        duration: 0.6,
        ease: "power1.inOut",
      });

    return () => tl.kill();
  };

  return (
    <section
      aria-label="관심 목록"
      className="w-full h-full relative p-8 text-theme"
    >
      <div ref={wallRef} className="relative w-full h-full images-wall">
        {isFetching ? (
          <div className="absolute inset-0 flex justify-center items-center text-theme">
            Loading...
          </div>
        ) : !images || images?.length === 0 ? (
          <div className="absolute inset-0 flex justify-center items-center text-theme">
            Interests Gallery is Empty 🕳️
          </div>
        ) : (
          rects?.map((rect) => (
            <img
              key={rect.data.id}
              src={`https://picsum.photos/id/${rect.data.id}/500/${Math.trunc(
                500 / (rect.width / rect.height)
              )}`}
              alt={`Frame of ${rect.data.author}'s photo`}
              onClick={(e) => dropAnimation(e.currentTarget)}
              className="frame hover:rotate-1"
              style={{
                position: "absolute",
                left: `${rect.x}px`,
                top: `${rect.y}px`,
                width: `${rect.width}px`,
                height: `${rect.height}px`,
                objectFit: "cover",
              }}
            />
          ))
        )}
      </div>
    </section>
  );
}

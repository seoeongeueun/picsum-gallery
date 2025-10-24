import { useEffect, useRef, useState, useLayoutEffect } from "react";
import { useImages } from "@/hooks/useImages";
import { debounce } from "@/lib/helpers";
import ImageCard from "./ImageCard";
import Spinner from "@/components/Spinner";
import "./gallery.css";
import { throttle } from "@/lib/helpers";

export default function Gallery() {
  const { useInfiniteImages } = useImages();
  const {
    images,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    saveScrollState,
    restoreScrollState,
  } = useInfiniteImages();
  const [layout, setLayout] = useState({ cols: 4, colWidth: 0 });

  const gridRef = useRef<HTMLDivElement>(null);
  const loadMoreRef = useRef<HTMLDivElement>(null);

  // 반응형 열 개수 변경
  useEffect(() => {
    restoreScrollState();

    const updateLayout = () => {
      const container = gridRef.current;
      if (!container) return;

      const width = container.clientWidth;
      let cols = 4;

      if (width < 429) cols = 1;
      else if (width < 539) cols = 2;
      else if (width < 1024) cols = 3;

      const colWidth = width / cols;
      setLayout({ cols, colWidth });
    };

    updateLayout();

    // 계산 최적화를 위해 너비 계산에 디바운스 설정
    const handleResize = debounce(updateLayout, 500);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useLayoutEffect(() => {
    if (isLoading || !images?.length || !gridRef.current) return;
    const start = performance.now();

    const { cols, colWidth } = layout;
    const container = gridRef.current;
    const items = Array.from(container.children) as HTMLElement[];
    const colHeights = new Array(cols).fill(0);

    // 부드러운 레아아웃 적용을 위해
    requestAnimationFrame(() => {
      items.forEach((item) => {
        // 현재 가장 짧은 col의 인덱스를 찾아서 이미지를 배치
        let minCol = 0;
        for (let c = 1; c < cols; c++) {
          if (colHeights[c] < colHeights[minCol]) minCol = c;
        }

        item.style.width = `${colWidth}px`;
        item.style.left = `${minCol * colWidth}px`;
        item.style.top = `${colHeights[minCol]}px`;

        // 이미지의 비율 기반 높이 계산
        const ratio = parseFloat(item.dataset.ratio || "1");
        const height = colWidth / ratio;
        colHeights[minCol] += height;
      });

      container.style.height = `${Math.max(...colHeights)}px`;

      const end = performance.now();
      console.log(
        `Layout pass (${items.length} items): ${(end - start).toFixed(2)} ms`
      );
      requestAnimationFrame(() => restoreScrollState());
    });
  }, [images, isLoading, layout]);

  useEffect(() => {
    if (!loadMoreRef.current) return;

    // 로드 트리거가 화면에 보이는 경우 다음 페이지 로드
    const observer = new IntersectionObserver((entries) => {
      const target = entries[0];
      if (target.isIntersecting && hasNextPage && !isFetchingNextPage) {
        fetchNextPage();
      }
    });

    observer.observe(loadMoreRef.current);
    return () => observer.disconnect();
  }, [fetchNextPage, hasNextPage, isFetchingNextPage]);

  return (
    <>
      <section
        ref={gridRef}
        aria-label="갤러리"
        className="relative w-full flex justify-center items-start overflow-x-hidden"
      >
        {images?.map((img) => (
          <ImageCard key={img.id} img={img} onSaveScroll={saveScrollState} />
        ))}

        <div
          ref={loadMoreRef}
          aria-hidden="true"
          className="absolute bg-transparent h-8 w-full"
        />
      </section>
      <div className="fixed bottom-4 z-40 justify-self-center">
        {isFetchingNextPage && <Spinner />}
      </div>
    </>
  );
}

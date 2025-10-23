import { useEffect, useRef, useState, useLayoutEffect } from "react";
import { useImages } from "@/hooks/useImages";
import { debounce } from "@/lib/helpers";
import { useSelectedImageStore } from "@/stores/useSelectedImageStore";
import "./gallery.css";

export default function Gallery() {
  const { useInfiniteImages } = useImages();
  const { images, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading } =
    useInfiniteImages();
  const [layout, setLayout] = useState({ cols: 4, colWidth: 0 });
  const { toggleId, isSelected } = useSelectedImageStore();

  const gridRef = useRef<HTMLDivElement>(null);
  const loadMoreRef = useRef<HTMLDivElement>(null);

  // 반응형 열 개수 변경
  useEffect(() => {
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
        // 현재 가장 짧은 col의 인덱스를 찾기
        let minCol = 0;
        for (let c = 1; c < cols; c++) {
          if (colHeights[c] < colHeights[minCol]) minCol = c;
        }

        const left = minCol * colWidth;
        item.style.position = "absolute";
        item.style.width = `${colWidth}px`;
        item.style.left = `${left}px`;
        item.style.top = `${colHeights[minCol]}px`;

        // 이미지의 비율 기반 높이 계산
        const ratio = parseFloat(item.dataset.ratio || "1");
        const height = colWidth * ratio;
        colHeights[minCol] += height;
      });

      container.style.position = "relative";
      container.style.height = `${Math.max(...colHeights)}px`;

      const end = performance.now();
      console.log(
        `Layout pass (${items.length} items): ${(end - start).toFixed(2)} ms`
      );
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
        {images?.map((img) => {
          // 원본의 비율을 유지할 수 있도록 미리 계산 후 data에 지정
          const ratio = img.width / img.height;

          return (
            <figure
              key={img.id}
              data-ratio={img.height / img.width}
              style={{
                aspectRatio: ratio,
              }}
              className="group image-card bg-gray-200 overflow-hidden p-1 lg:p-2 bg-clip-content cursor-pointer"
              onClick={() => toggleId(img.id)}
            >
              <img
                src={`https://picsum.photos/id/${img.id}/700/${Math.trunc(
                  700 / ratio
                )}`}
                alt={`Photo by ${img.author}`}
                className="w-full h-full object-cover opacity-0 z-10"
                onLoad={(e) => (e.currentTarget.style.opacity = "1")}
              />
              <figcaption className="absolute inset-0 w-full h-full p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-20 flex flex-row justify-between items-end gap-2">
                <div className="bubble" aria-label="작가명">
                  <span>{img.author}</span>
                </div>
                <div className="bubble" aria-label="이미지 상세보기">
                  <span>🖱️View</span>
                </div>
              </figcaption>
            </figure>
          );
        })}
        <div ref={loadMoreRef} className="bg-transparent h-8 w-full" />
      </section>
    </>
  );
}

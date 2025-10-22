import { useEffect, useRef, useState, useLayoutEffect } from "react";
import { useImages } from "@/hooks/useImages";
import { debounce } from "@/lib/helpers";

export default function MasonryContainer() {
  const { useFetchImagesByPage } = useImages();
  const { data: images, isLoading } = useFetchImagesByPage(10);
  const [layout, setLayout] = useState({ cols: 4, colWidth: 0 });
  const gridRef = useRef<HTMLDivElement>(null);

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

    const { cols, colWidth } = layout;
    const container = gridRef.current;
    const items = Array.from(container.children) as HTMLElement[];
    const colHeights = new Array(cols).fill(0);

    // requestAnimationFrame으로 부드럽게 레이아웃 적용
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
    });
  }, [images, isLoading, layout]);

  return (
    <div
      ref={gridRef}
      className="relative w-full flex justify-center items-start overflow-x-hidden"
    >
      {images?.map((img) => (
        <div
          key={img.id}
          data-ratio={img.height / img.width}
          style={{
            aspectRatio: `${img.width} / ${img.height}`,
          }}
          className="image-card bg-gray-200 overflow-hidden p-1 md:p-2 bg-clip-content"
        >
          <img
            src={img.download_url}
            alt={img.author}
            className="w-full h-full object-cover opacity-0 transition-opacity duration-500"
            onLoad={(e) => (e.currentTarget.style.opacity = "1")}
          />
        </div>
      ))}
    </div>
  );
}

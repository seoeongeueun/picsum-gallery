import type { GalleryImage } from "@/types/types";
import { useNavigate } from "react-router-dom";
import { useSelectedImageStore } from "@/stores/useSelectedImageStore";

export default function ImageCard({ img }: { img: GalleryImage }) {
  const toggleId = useSelectedImageStore((s) => s.toggleId);
  const navigate = useNavigate();

  // 원본의 비율을 유지할 수 있도록 미리 계산 후 data에 지정
  const ratio = img.width / img.height;

  const handleImageClick = (id: string) => {
    toggleId(id);
    navigate(`/image/${img.id}`); //상세 페이지로 이동
  };

  return (
    <figure
      key={img.id}
      data-ratio={ratio}
      style={{
        aspectRatio: ratio,
      }}
      className="group image-card bg-skeleton overflow-hidden p-1 lg:p-2 bg-clip-content pointer-events-none"
    >
      <img
        src={`https://picsum.photos/id/${img.id}/700/${Math.trunc(
          700 / ratio
        )}`}
        srcSet={`
          https://picsum.photos/id/${img.id}/500/${Math.trunc(
          500 / ratio
        )} 500w,
          https://picsum.photos/id/${img.id}/700/${Math.trunc(700 / ratio)} 700w
        `}
        sizes="(max-width: 1024px) 500px, 700px"
        decoding="async"
        alt={`Photo by ${img.author}`}
        className="w-full h-full object-cover opacity-0 z-10 group-hover:brightness-50 cursor-zoom-in pointer-events-auto"
        onClick={() => handleImageClick(img.id)}
        onLoad={(e) => (e.currentTarget.style.opacity = "1")}
        loading="lazy"
      />
      <figcaption
        aria-label="작가명"
        className="absolute bottom-4 left-4 bubble opacity-0 group-hover:opacity-100 z-20"
      >
        <span aria-label="작가명">{img.author}</span>
      </figcaption>
    </figure>
  );
}

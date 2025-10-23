import type { GalleryImage } from "@/types/types";

//페이지 번호로 이미지 목록을 반환
export const fetchImagesByPageFn = async (page: number) => {
  const res = await fetch(`https://picsum.photos/v2/list?page=${page}&limit=9`);
  if (!res.ok)
    throw new Error(`Error: Failed to fetch images from page ${page}`);

  const data = await res.json();
  return data as GalleryImage[];
};

//이미지 id로 단일 이미지 정보를 반환
export const fetchImageByIdFn = async (id: string) => {
  const res = await fetch(`https://picsum.photos/id/${id}/info`);
  if (!res.ok) throw new Error(`Error: Failed to fetch images with id ${id}`);

  const data = await res.json();
  return data as GalleryImage;
};

//유저 시드로 랜덤 이미지 반환
export const fetchImageBySeedFn = async (seed: string) => {
  const res = await fetch(`https://picsum.photos/seed/${seed}/1000`);
  if (!res.ok)
    throw new Error(`Error: Failed to fetch images with seed ${seed}`);

  return res.url;
};

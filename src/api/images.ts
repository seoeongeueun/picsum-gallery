import type { Image } from "@/types/types";

//페이지 번호로 이미지 목록을 반환
export const fetchImagesByPageFn = async (page: number) => {
  const res = await fetch(`https://picsum.photos/v2/list?page=${page}&limit=9`);
  if (!res.ok)
    throw new Error(`Error: Failed to fetch images from page ${page}`);

  const data = await res.json();
  return data as Image[];
};

//이미지 id로 단일 이미지를 반환
export const fetchImagesByIdFn = async (id: string) => {
  const res = await fetch(`https://picsum.photos/id/${id}`);
  if (!res.ok) throw new Error(`Error: Failed to fetch images with id ${id}`);

  const data = await res.json();
  return data as Image;
};

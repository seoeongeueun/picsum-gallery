// picsum 페이지에 작성된 이미지의 기본 리턴 형식
export type GalleryImage = {
  author: string;
  download_url: string;
  height: number;
  id: string;
  url: string;
  width: number;
};

//헤더의 메뉴 타입
export type MenuType = "gallery" | "interests" | "lucky";

export type MenuItem = {
  label: string;
  icon: string;
  value: MenuType;
};

//maxrectspacker에서 사용할 rect 타입
export type Rect<T = unknown> = {
  x: number;
  y: number;
  width: number;
  height: number;
  data: T;
};

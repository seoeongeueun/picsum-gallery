import Gallery from "@/components/Gallery/Section";
import Lucky from "@/components/Lucky/Section";
import Interests from "./components/Interests/Section";
import MenuNav from "@/components/MenuNav";
import { useState } from "react";
import type { MenuType } from "./types/types";

//선택 메뉴에 따라 섹션 컴포넌트 반환
const sections: Record<MenuType, React.JSX.Element> = {
  gallery: <Gallery />,
  lucky: <Lucky />,
  interests: <Interests />,
};

function App() {
  const [menu, setMenu] = useState<MenuType>("gallery");

  // 위로가기 버튼
  const handleScrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="px-2 md:px-4 lg:px-12 w-full h-full flex flex-col items-center justify-start">
      <header className="sticky top-0 pointer-events-none z-50 py-4 flex flex-col items-center justify-center justify-self-center w-full bg-white">
        <h1 className="text-theme p-4 font-paperozi font-extrabold">
          Picsum Gallery
        </h1>
        <MenuNav selected={menu} onSelect={setMenu} />
      </header>

      <main className="w-full h-full">{sections[menu]}</main>
      <footer className="pointer-events-none block float-left fixed bottom-0 p-4 z-50 w-full">
        <button
          type="button"
          onClick={handleScrollToTop}
          aria-label="맨 위로 이동"
          className="pointer-events-auto aspect-square !rounded-full shadow-2xs"
        >
          <span aria-hidden="true" className="mr-1">
            ↑
          </span>
          <span>Top</span>
        </button>
      </footer>
    </div>
  );
}

export default App;

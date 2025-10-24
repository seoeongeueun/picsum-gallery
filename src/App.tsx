import Gallery from "@/components/Gallery/Section";
import Lucky from "@/components/Lucky/Section";
import Interests from "./components/Interests/Section";
import MenuNav from "@/components/MenuNav";
import { useState, useEffect, useRef } from "react";
import type { MenuType } from "./types/types";

//선택 메뉴에 따라 섹션 컴포넌트 반환
const sections: Record<MenuType, React.JSX.Element> = {
  gallery: <Gallery />,
  lucky: <Lucky />,
  interests: <Interests />,
};

function App() {
  const [menu, setMenu] = useState<MenuType>("gallery");
  const headerRef = useRef<HTMLDivElement>(null);

  // 위로가기 버튼
  const handleScrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  useEffect(() => {
    let lastScroll = 0;
    const header = headerRef.current;
    if (!header) return;

    //헤더의 높이를 저장
    document.documentElement.style.setProperty(
      "--header-height",
      `${header.offsetHeight}`
    );

    const handleScrollDetection = () => {
      const current = window.scrollY;

      if (current > lastScroll && current > 20) {
        // 아래로 스크롤할때는 숨김
        header.style.transform = "translateY(-100%)";
      } else if (current < lastScroll) {
        header.style.transform = "translateY(0)";
      }

      lastScroll = current;
    };
    window.addEventListener("scroll", handleScrollDetection);

    return () => window.removeEventListener("scroll", handleScrollDetection);
  }, []);

  return (
    <div className="px-2 md:px-4 lg:px-12 w-full h-full flex flex-col">
      <header
        ref={headerRef}
        className="fixed top-0 transition-transform duration-500 pointer-events-none z-50 py-4 flex flex-col items-center justify-center justify-self-center w-full bg-background"
      >
        <h1 className="text-theme p-4 font-paperozi font-extrabold">
          Picsum Gallery
        </h1>
        <MenuNav selected={menu} onSelect={setMenu} />
      </header>

      <main className="pt-44 w-full h-full">{sections[menu]}</main>
      <footer className="pointer-events-none block float-left fixed bottom-0 p-4 z-50 w-full">
        <button
          type="button"
          onClick={handleScrollToTop}
          aria-label="맨 위로 이동"
          className="pointer-events-auto aspect-square !rounded-full drop-shadow-lg"
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

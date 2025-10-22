import MasonryContainer from "@/components/MasonryContainer";
import LuckySection from "@/components/LuckySection";
import MenuNav from "@/components/MenuNav";
import { useState } from "react";
import type { MenuType } from "./types/types";

function App() {
  const [menu, setMenu] = useState<MenuType>("gallery");

  const handleScrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="px-2 md:px-4 lg:px-12">
      <header className="sticky top-0 pointer-events-none z-50 py-4 flex flex-col items-center justify-center justify-self-center w-fit">
        <h1 className="text-theme p-4 font-paperozi font-extrabold">
          Picsum Lorem
        </h1>
        <MenuNav selected={menu} onSelect={setMenu} />
      </header>

      <main className="w-full">
        {menu === "gallery" && <MasonryContainer />}
        {menu === "lucky" && <LuckySection />}
      </main>
      <footer className="pointer-events-none block float-left fixed bottom-0 pb-4 z-50">
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

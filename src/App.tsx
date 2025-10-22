import MasonryContainer from "./components/MasonryContainer";
import MenuNav from "@/components/MenuNav";
import { useState } from "react";
import type { MenuType } from "./types/types";

function App() {
  const [menu, setMenu] = useState<MenuType>("gallery");

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
      </main>
    </div>
  );
}

export default App;

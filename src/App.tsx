import MasonryContainer from "./components/MasonryContainer";
import MenuNav from "@/components/MenuNav";
import { useState } from "react";
import type { MenuType } from "./types/types";

function App() {
  const [menu, setMenu] = useState<MenuType>("gallery");

  return (
    <div className="px-2 md:px-4 lg:px-12">
      <header className="flex flex-row justify-center items-center">
        <h1 className="text-theme p-4 font-paperozi font-extrabold">
          Picsum Lorem
        </h1>
        <h2 className="mb-2 hidden sm:block">📷</h2>
      </header>
      <MenuNav selected={menu} onSelect={setMenu} />
      <main className="w-full">
        <MasonryContainer />
      </main>
    </div>
  );
}

export default App;

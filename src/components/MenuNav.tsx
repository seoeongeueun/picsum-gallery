import type { MenuType, MenuItem } from "@/types/types";
import clsx from "clsx";

interface MenuNavProps {
  selected: MenuType;
  onSelect: (menu: MenuType) => void;
  onSaveScroll: (y: number) => void;
}

export default function MenuNav({
  selected,
  onSelect,
  onSaveScroll,
}: MenuNavProps) {
  const menus: MenuItem[] = [
    { label: "Gallery", icon: "👀", value: "gallery" },
    { label: "Interests", icon: "🖼️", value: "interests" },
    { label: "I'm Feeling Lucky", icon: "🔮", value: "lucky" },
  ];

  const handleMenuSelect = (value: MenuType) => {
    if (selected === "gallery") onSaveScroll(window.scrollY);
    onSelect(value);
  };

  return (
    <nav
      aria-label="Menu"
      className="pointer-events-auto flex flex-row justify-center items-center gap-2 mb-2 w-full px-1"
    >
      {menus.map(({ label, icon, value }) => (
        <button
          key={value}
          type="button"
          onClick={() => handleMenuSelect(value)}
          aria-current={selected === value ? "page" : undefined}
          className={clsx(selected === value && "active")}
        >
          <span>
            {icon} {label}
          </span>
        </button>
      ))}
    </nav>
  );
}

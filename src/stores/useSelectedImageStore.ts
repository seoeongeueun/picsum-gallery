import { create } from "zustand";

interface SelectedImageStore {
  selectedIds: Set<string>;
  toggleId: (id: string) => void;
  clear: () => void;
  isSelected: (id: string) => boolean;
}

export const useSelectedImageStore = create<SelectedImageStore>((set, get) => ({
  selectedIds: new Set(),
  toggleId: (id) => {
    const tmp = new Set(get().selectedIds); //리렌더 트리거를 위해 새로 set생성

    if (tmp.has(id)) tmp.delete(id);
    else tmp.add(id);

    set({ selectedIds: tmp });
  },
  clear: () => set({ selectedIds: new Set() }),
  isSelected: (id) => get().selectedIds.has(id),
}));

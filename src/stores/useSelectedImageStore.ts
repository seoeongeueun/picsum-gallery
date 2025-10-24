import { create } from "zustand";

interface SelectedImageStore {
  selectedIds: Set<string>;
  maxSelected: number;
  toggleId: (id: string, silent?: boolean) => void;
  clear: () => void;
  isSelected: (id: string) => boolean;
}

export const useSelectedImageStore = create<SelectedImageStore>((set, get) => ({
  selectedIds: new Set(),
  maxSelected: 30, //최대 보관 개수
  toggleId: (id, silent = false) => {
    const tmp = new Set(get().selectedIds);
    const max = get().maxSelected;

    if (tmp.has(id)) tmp.delete(id);
    else {
      if (tmp.size >= max) {
        const oldest = tmp.values().next().value;
        if (oldest) tmp.delete(oldest); //가장 오래된 값을 제거
      }
      tmp.add(id);
    }

    if (!silent) set({ selectedIds: tmp }); //리렌더 트리거를 위해 새 set로 생성
    else get().selectedIds = tmp;
  },
  clear: () => set({ selectedIds: new Set() }),
  isSelected: (id) => get().selectedIds.has(id),
}));

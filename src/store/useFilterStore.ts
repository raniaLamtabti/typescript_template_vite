import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

interface FilterState {
  categoryId?: number;
  isUrgent?: boolean;
  date?: string;
  changeCategory: (categoryId?: number) => void;
  changeUrgent: (isUrgent?: boolean) => void;
  changeDate: (date?: string) => void;
}

export const useFilterStore = create<FilterState>(
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  persist(
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    (set) => ({
      categoryId: undefined,
      isUrgent: undefined,
      date: undefined,
      changeCategory: (newCategoryId) => {
        set({ categoryId: newCategoryId });
      },
      changeUrgent: (isUrgentNew) => {
        set({ isUrgent: isUrgentNew });
      },
      changeDate: (newDate) => set({ date: newDate }),
    }),
    {
      name: "filter-state",
    }
  )
);

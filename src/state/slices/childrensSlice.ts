import type { StateCreator } from "zustand";
import type { childrensSlice } from "../../types/storeTypes";

export const createChildrensSlice: StateCreator<childrensSlice> = (set) => ({
  childrensId: [],
  // filteredChildrensId: [],
  // setFilteredChildrens: (array) => set({ filteredChildrensId: array }),
  setChildrens: (array) => set({ childrensId: array }),
  pushChildren: (child) =>
    set((state) => ({ childrensId: [...state.childrensId, child] })),
  childrensRemove: (id) => {
    set((state) => ({
      childrensId: state.childrensId.filter((child) => child !== id),
    }));
  },
});

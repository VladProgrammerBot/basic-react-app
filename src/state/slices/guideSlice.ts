import type { StateCreator } from "zustand";
import type { filterSlice } from "../../types/storeTypes";

export const createFilterSlice: StateCreator<filterSlice> = (set) => ({
  filter: "",
  setFilter: (text) => set({ filter: text }),
});

import type { StateCreator } from "zustand";
import type { filterSlice } from "../../types/storeTypes";

export const createFilterSlice: StateCreator<filterSlice> = (set) => ({
  filteredElements: [],
  setFilterElements: (elements) => set({ filteredElements: elements }),
});

//////////////
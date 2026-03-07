import type { StateCreator } from "zustand";
import type { filterSlice } from "../../types/storeTypes";

export const createFilterSlice: StateCreator<filterSlice> = (set) => ({
  filteredElements: [],
  filteredElementsId: [],
  setFilterElements: (elements) => {
    return set({
      filteredElements: elements,
      filteredElementsId: elements.map((el) => el.id),
    });
  },
});

//////////////

import type { StateCreator } from "zustand";
import type { keyNaviSlice } from "../../types/storeTypes";

export const createKeyNaviSlice: StateCreator<keyNaviSlice> = (set) => ({
  selectedItemId: null,
  setSelectedItemId: (dir) => set({ selectedItemId: dir }),
});

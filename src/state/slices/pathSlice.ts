import type { StateCreator } from "zustand";
import type { pathSlice } from "../../types/storeTypes";

export const createPathSlice: StateCreator<pathSlice> = (set) => ({
  path: [],
  isMenuOpen: false,
  toggleMenu: () => set((state) => ({ isMenuOpen: !state.isMenuOpen })),
  pushPath: (folder) => set((state) => ({ path: [...state.path, folder] })),
  setPath: (folder) => set({ path: [folder] }),
  reducePath: (index) =>
    set((state) => ({ path: state.path.splice(0, index + 1) })),
});

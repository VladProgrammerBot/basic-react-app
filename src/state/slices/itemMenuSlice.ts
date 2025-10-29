import type { StateCreator } from "zustand";
import type { itemMenuSlice } from "../../types/storeTypes";

export const createMenuSlice: StateCreator<itemMenuSlice> = (set) => ({
    openMenu: null,
    setMenuValue: (value) => set({ openMenu: value }),
})

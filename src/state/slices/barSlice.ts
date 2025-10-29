import type { StateCreator } from "zustand";
import type { barSlice } from "../../types/storeTypes";

export const createBarSlice: StateCreator<barSlice> = (set) => ({
    isBarOpen: false,
    toggleBar: () => set((state) => ({ isBarOpen: !state.isBarOpen })),
    closeBar: () => set({ isBarOpen: false })
})

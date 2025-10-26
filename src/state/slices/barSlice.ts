import type { StateCreator } from "zustand";
import type { barSlice } from "../storeTypes";

export const createBarSlice: StateCreator<barSlice> = (set) => ({
    isBarOpen: false,
    toggleBar: () => set((state) => ({ isBarOpen: !state.isBarOpen })),
})

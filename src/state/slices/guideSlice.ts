import type { StateCreator } from "zustand";
import type { guideSlice } from "../../types/storeTypes";

export const createGuideSlice: StateCreator<guideSlice> = (set) => ({
    isGuideOpen: false,
    setIsGuideOpen: (state) => set({ isGuideOpen: state })
})

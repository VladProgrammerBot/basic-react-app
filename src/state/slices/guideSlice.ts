import type { StateCreator } from "zustand";
import type { guideSlice } from "../../types/storeTypes";

export const createGuideSlice: StateCreator<guideSlice> = (set) => ({
    isGuideOpen: false,
    currentStep: 0,
    setCurrentStep: (state) => set({ currentStep: state }),
    setIsGuideOpen: (state) => set({ isGuideOpen: state })
})

import type { StateCreator } from "zustand";
import type { modeSlice } from "../../types/storeTypes";

export const createModeSlice: StateCreator<modeSlice> = (set) => ({
  mode: "normal",
  setMode: (mode) => set({ mode: mode }),
});

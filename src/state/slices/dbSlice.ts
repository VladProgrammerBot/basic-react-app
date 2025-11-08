import type { dbSlice } from "@/types/storeTypes";
import type { StateCreator } from "zustand";

export const createDBSlice: StateCreator<dbSlice> = (set) => ({
    db: null,
    setDB: (value) => set({ db: value }),
})

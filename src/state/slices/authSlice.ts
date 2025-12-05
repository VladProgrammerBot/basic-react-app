import type { authSlice } from "@/types/storeTypes";
import type { StateCreator } from "zustand";

export const createAuthSlice: StateCreator<authSlice> = (set) => ({
    isLogin: false,
    setIsLogin: (state) => set({ isLogin: state })
})
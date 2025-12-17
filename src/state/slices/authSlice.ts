import type { authSlice } from "@/types/storeTypes";
import type { StateCreator } from "zustand";

export const createAuthSlice: StateCreator<authSlice> = (set) => ({
    isLogin: true,
    setIsLogin: (state) => set({ isLogin: state }),
    isStyled: localStorage.getItem("isNotStyled") === "false" || true,
    setIsStyled: () => set((state) => ({ isStyled: !state.isStyled })),
})
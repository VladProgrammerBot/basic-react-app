import type { authSlice, DesignMode } from "@/types/storeTypes";
import type { StateCreator } from "zustand";

const getInitialDesignMode = (): DesignMode => {
  const designMode = localStorage.getItem("designMode") as DesignMode;
  if (
    designMode &&
    ["normal", "withKeyTips", "Minimalistic"].includes(designMode)
  ) {
    return designMode;
  }

  return "normal";
};

export const createAuthSlice: StateCreator<authSlice> = (set) => ({
  isLogin: true,
  setIsLogin: (state) => set({ isLogin: state }),
  designMode: getInitialDesignMode(),
  setDesignMode: (mode) => {
    localStorage.setItem("designMode", mode);
    set({ designMode: mode });
  },
});

import type { StateCreator } from "zustand";
import type { childrensSlice } from "../storeTypes";

export const createChildrensSlice: StateCreator<childrensSlice> = (set) => ({
    childrensId: [],
    setChildrens: (array) => set({ childrensId: array }),
    pushChildren: (child) =>
        set((state) => ({ childrensId: [...state.childrensId, child] })),
    childrensRemove: (id) => {
        set((state) => ({
            childrensId: state.childrensId.filter((child) => child !== id),
        }));
    },
})

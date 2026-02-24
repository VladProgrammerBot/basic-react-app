import type { StateCreator } from "zustand";
import type { pathSlice } from "../../types/storeTypes";

export const createPathSlice: StateCreator<pathSlice> = (set) => ({
    path: [],
    isMenuOpen: false,
    toggleMenu: () => set((state) => ({ isMenuOpen: !state.isMenuOpen })),
    pushPath: (folder) => set((state) => ({ path: [...state.path, folder] })),
    setPath: (folder) => set({ path: [folder] }),
    reducePath: (index) =>
        set((state) => ({ path: state.path.splice(0, index + 1) })),
    setParentChildrens: (length, childrensId) =>
        set((state) => ({
            path: state.path.map((parent, index) => {
                if (index === length) {
                    return {
                        ...parent,
                        childrens: childrensId,
                    };
                }
                return parent;
            }),
        })),
    removeChild: (id, parentId) => set((state) => {
        return {
            path: state.path.map((parent) => {
                if (parent.id === parentId) {
                    return {
                        ...parent,
                        childrens: parent.childrens.filter((child) => child !== id)
                    }
                }
                return parent
            })
        }
    })
})


//////////
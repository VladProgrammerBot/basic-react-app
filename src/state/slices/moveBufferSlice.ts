import type { StateCreator } from "zustand";
import type { moveBufferSlice } from "../../types/storeTypes";

export const createMoveBufferSlice: StateCreator<moveBufferSlice> = (set) => ({
    moveBuffer: null,
    setBuffer: (id, parent) => {
        set({ moveBuffer: { id: id, parent: parent } })
    },
    resetMoveBuffer: () => set({ moveBuffer: null })
})

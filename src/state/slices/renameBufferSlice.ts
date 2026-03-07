import type { StateCreator } from "zustand";
import type { renameBufferSlice } from "../../types/storeTypes";

export const createRenameSlice: StateCreator<renameBufferSlice> = (set) => ({
  renameBuffer: null,
  setRenameBuffer: (value) => set({ renameBuffer: value }),
});

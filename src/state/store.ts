import { create } from "zustand";
import { createFoldersSlice } from "./slices/foldersSlice"
import type { foldersSlice } from "./storeTypes";

const store = create<foldersSlice>()((...a) => ({
    ...createFoldersSlice(...a),
}))

export default store
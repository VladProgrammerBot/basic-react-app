import { create } from "zustand";
import { createFoldersSlice } from "./slices/foldersSlice"
import type { childrensSlice, foldersSlice, itemMenuSlice, modeSlice, moveBufferSlice, pathSlice } from "./storeTypes";
import { createChildrensSlice } from "./slices/childrensSlice";
import { createMenuSlice } from "./slices/itemMenuSlice";
import { createModeSlice } from "./slices/modeSlice";
import { createMoveBufferSlice } from "./slices/moveBufferSlice";
import { createPathSlice } from "./slices/pathSlice";

const store = create<foldersSlice & childrensSlice & itemMenuSlice & modeSlice & moveBufferSlice & pathSlice>()((...a) => ({
    ...createFoldersSlice(...a),
    ...createChildrensSlice(...a),
    ...createMenuSlice(...a),
    ...createModeSlice(...a),
    ...createMoveBufferSlice(...a),
    ...createPathSlice(...a)
}))

export default store
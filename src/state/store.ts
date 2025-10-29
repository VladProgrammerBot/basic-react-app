import { create } from "zustand";
import { createFoldersSlice } from "./slices/foldersSlice"
import type { barSlice, childrensSlice, foldersSlice, itemMenuSlice, modeSlice, moveBufferSlice, pathSlice, renameBufferSlice } from "../types/storeTypes";
import { createChildrensSlice } from "./slices/childrensSlice";
import { createMenuSlice } from "./slices/itemMenuSlice";
import { createModeSlice } from "./slices/modeSlice";
import { createMoveBufferSlice } from "./slices/moveBufferSlice";
import { createPathSlice } from "./slices/pathSlice";
import { createRenameSlice } from "./slices/renameBufferSlice";
import { type StoreApi, type UseBoundStore } from 'zustand'
import { createBarSlice } from "./slices/barSlice";


type WithSelectors<S> = S extends { getState: () => infer T }
    ? S & { use: { [K in keyof T]: () => T[K] } }
    : never

const createSelectors = <S extends UseBoundStore<StoreApi<object>>>(
    _store: S,
) => {
    const store = _store as WithSelectors<typeof _store>
    store.use = {}
    for (const k of Object.keys(store.getState())) {
        ; (store.use as any)[k] = () => store((s) => s[k as keyof typeof s])
    }

    return store
}

const storeBase = create<foldersSlice & childrensSlice & itemMenuSlice & modeSlice & moveBufferSlice & pathSlice & renameBufferSlice & barSlice>()((...a) => ({
    ...createFoldersSlice(...a),
    ...createChildrensSlice(...a),
    ...createMenuSlice(...a),
    ...createModeSlice(...a),
    ...createMoveBufferSlice(...a),
    ...createPathSlice(...a),
    ...createRenameSlice(...a),
    ...createBarSlice(...a)
}))

const store = createSelectors(storeBase)


export default store
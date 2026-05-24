import { create } from "zustand";
import { createFoldersSlice } from "./slices/foldersSlice";
import type {
  alertsSlice,
  authSlice,
  // childrensSlice,
  foldersSlice,
  filterSlice,
  keyNaviSlice,
  modeSlice,
  moveBufferSlice,
  pathSlice,
  renameBufferSlice,
} from "../types/storeTypes";
// import { createChildrensSlice } from "./slices/childrensSlice";
import { createModeSlice } from "./slices/modeSlice";
import { createMoveBufferSlice } from "./slices/moveBufferSlice";
import { createPathSlice } from "./slices/pathSlice";
import { createRenameSlice } from "./slices/renameBufferSlice";
import { type StoreApi, type UseBoundStore } from "zustand";
import { createAlertsSlice } from "./slices/alertsSlice";
import { createAuthSlice } from "./slices/authSlice";
import { createKeyNaviSlice } from "./slices/keyNaviSlice";
import { createFilterSlice } from "./slices/guideSlice";

type WithSelectors<S> = S extends { getState: () => infer T }
  ? S & { use: { [K in keyof T]: () => T[K] } }
  : never;

const createSelectors = <S extends UseBoundStore<StoreApi<object>>>(
  _store: S,
) => {
  const store = _store as WithSelectors<typeof _store>;
  store.use = {};
  for (const k of Object.keys(store.getState())) {
    (store.use as Record<string, () => unknown>)[k] = () =>
      store((s) => s[k as keyof typeof s]);
  }

  return store;
};

const storeBase = create<
  foldersSlice &
    keyNaviSlice &
    // childrensSlice &
    filterSlice &
    modeSlice &
    moveBufferSlice &
    authSlice &
    pathSlice &
    renameBufferSlice &
    alertsSlice
>()((...a) => ({
  ...createFoldersSlice(...a),
  // ...createChildrensSlice(...a),
  ...createModeSlice(...a),
  ...createMoveBufferSlice(...a),
  ...createPathSlice(...a),
  ...createRenameSlice(...a),
  ...createAlertsSlice(...a),
  ...createAuthSlice(...a),
  ...createKeyNaviSlice(...a),
  ...createFilterSlice(...a),
}));

const store = createSelectors(storeBase);

export default store;

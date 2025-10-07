import { create } from "zustand";
import { childrens } from "../data/template";

type mode = "normal" | "Add Folder";

type State = {
  folders: folder[];
  childrensId: number[];
  path: folder[];
  select: number | null;
  openMenu: number | null;
  mode: mode;
};

type Actions = {
  setChildrens: (array: number[]) => void;
  setSelect: (number: number | null) => void;
  setMenuValue: (value: number | null) => void;
  setMode: (mode: mode) => void;
  pushPath: (folder: folder) => void;
  pushFolder: (folder: folder, childrens: number[], newId: number) => void;
  pushChildren: (child: number) => void;
  reducePath: (index: number) => void;
  setParentChildrens: (index: number, childrensId: number[]) => void;
};

const stateFolders = create<State & Actions>((set) => ({
  folders: childrens,
  childrensId: childrens[0].childrens,
  path: [childrens[0]],
  select: null,
  openMenu: null,
  mode: "normal",
  setChildrens: (array) => set({ childrensId: array }),
  setSelect: (number) => set({ select: number }),
  pushPath: (folder) => set((state) => ({ path: [...state.path, folder] })),
  pushFolder: (folder, childrens, id) =>
    set((state) => ({ folders: [...state.folders.map((item) => {
      if (item.id === folder.parent) {
        return {
          ...item,
          childrens: [...childrens, id]
        }
      }
      return item
    }), folder] })),
  pushChildren: (child) =>
    set((state) => ({ childrensId: [...state.childrensId, child] })),
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
  setMenuValue: (value) => set({ openMenu: value }),
  setMode: (mode) => set({ mode: mode }),
}));

export default stateFolders;

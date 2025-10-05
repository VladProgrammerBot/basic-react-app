import { create } from "zustand";
import { childrens } from "../data/template";

// type path = Pick<folder, "id" | "title">;

type State = {
  folders: folder[];
  childrens: number[] | null;
  path: folder[];
  select: number | null;
  openMenu: number | null
};

type Actions = {
  setChildrens: (array: number[]) => void;
  setSelect: (number: number | null) => void;
  pushPath: (folder: folder) => void;
  reducePath: (index: number) => void
  setMenuValue: (value: number | null) => void;
};

const stateFolders = create<State & Actions>((set) => ({
  folders: childrens,
  childrens: childrens[0].childrens,
  path: [childrens[0]],
  select: null,
  setChildrens: (array) => set({ childrens: array }),
  setSelect: (number) => set({ select: number }),
  pushPath: (folder) => set((state) => ({ path: [...state.path, folder] })),
  reducePath: (index) => set((state) => ({ path: state.path.splice(0, index + 1)})),
  openMenu: null,
  setMenuValue: (value) => set({ openMenu: value})
}));

export default stateFolders;

import { create } from "zustand";
import { childrens } from "../data/template";

type path = Pick<folder, "id" | "title">;

type State = {
  folders: folder[];
  childrens: number[] | null;
  path: path[];
  select: number | null;
};

type Actions = {
  setChildrens: (array: number[]) => void;
  setSelect: (number: number | null) => void;
};

const foldersState = create<State & Actions>((set) => ({
  folders: childrens,
  childrens: childrens.find((child: folder) => child.id === 1).childrens,
  path: [],
  select: null,
  setChildrens: (array) => set({ childrens: array }),
  setSelect: (number) => set({ select: number }),
}));

export default foldersState;

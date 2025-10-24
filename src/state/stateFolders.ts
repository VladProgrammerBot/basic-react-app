import { create } from "zustand";

type mode = "normal" | "Add Folder";

type State = {
  folders: folder[];
  childrensId: number[];
  path: folder[];
  select: number | null;
  openMenu: number | null;
  mode: mode;
  moveBuffer: { id: number; parent: number } | null
};

type Actions = {
  setChildrens: (array: number[]) => void;
  setSelect: (number: number | null) => void;
  setMenuValue: (value: number | null) => void;
  setMode: (mode: mode) => void;
  pushPath: (folder: folder) => void;
  setPath: (folder: folder) => void;
  pushFolder: (folder: folder, childrens: number[], newId: number) => void;
  pushChildren: (child: number) => void;
  reducePath: (index: number) => void;
  setParentChildrens: (index: number, childrensId: number[]) => void;
  foldersRemove: (id: number, parentId: number) => void;
  childrensRemove: (id: number) => void;
  setFolders: (data: folder[]) => void;
  setBuffer: (id: number, parent: number) => void
  setMoveFolder: (id: number, parent: number, futureParent: number) => void
  resetMoveBuffer: () => void
};

const stateFolders = create<State & Actions>((set) => ({
  folders: [],
  childrensId: [],
  path: [],
  select: null,
  openMenu: null,
  mode: "normal",
  moveBuffer: null,
  setFolders: (data) => set({ folders: data }),
  setChildrens: (array) => set({ childrensId: array }),
  setSelect: (number) => set({ select: number }),
  pushPath: (folder) => set((state) => ({ path: [...state.path, folder] })),
  setPath: (folder) => set({ path: [folder] }),
  pushFolder: (folder, childrens, id) =>
    set((state) => ({
      folders: [
        ...state.folders.map((item) => {
          if (item.id === folder.parent) {
            return {
              ...item,
              childrens: [...childrens, id],
            };
          }
          return item;
        }),
        folder,
      ],
    })),
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
  childrensRemove: (id) => {
    set((state) => ({
      childrensId: state.childrensId.filter((child) => child !== id),
    }));
  },
  foldersRemove: (id, parentId) => {
    set((state) => ({
      folders: state.folders
        .filter((folder) => {
          return folder.id !== id;
        })
        .map((folder) => {
          if (folder.id === parentId) {
            return {
              ...folder,
              childrens: folder.childrens.filter((child) => child !== id),
            };
          }
          return folder;
        }),
    }));
  },
  setBuffer: (id, parent) => {
    set({ moveBuffer: { id: id, parent: parent } })
  },
  setMoveFolder: (id, parent, futureParent) => {
    set((state) => ({
      folders: state.folders.map((folder) => {
        if (folder.id === futureParent) {
          return {
            ...folder,
            childrens: [...folder.childrens, id]
          }
        } else if (folder.id === id) {
          return {
            ...folder,
            parent: futureParent
          }
        } else if (folder.id === parent) {
          return {
            ...folder,
            childrens: folder.childrens.filter((child) => child !== id)
          }
        }

        return folder
      })
    }))
  },
  resetMoveBuffer: () => set({ moveBuffer: null })
}));

export default stateFolders;

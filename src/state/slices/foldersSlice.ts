import type { StateCreator } from "zustand";
import type { foldersSlice } from "../../types/storeTypes";

export const createFoldersSlice: StateCreator<foldersSlice> = (set) => ({
  folders: {},
  setFolders: (data) => set({ folders: data }),
  pushFolder: (folder, id, parentId) =>
    set((state) => {
      const newFolders = {
        ...state.folders,
        [folder.id]: folder,
      } as objectFolder;

      // Якщо parentId є, оновлюємо його childrens
      if (parentId) {
        newFolders[parentId] = {
          ...state.folders[parentId],
          childrens: [...(state.folders[parentId]?.childrens || []), id],
        };
      }

      return { folders: newFolders };
    }),
  pushMultipleFolder: (foldersObj, childrens, newChildrens, parentId) => {
    const folders = foldersObj.reduce((acc, user) => {
      const id = String(user.id);
      acc[id] = user;
      return acc;
    }, {} as objectFolder);

    set((state) => ({
      folders: {
        ...state.folders,
        [parentId]: {
          ...state.folders[parentId],
          childrens: [...childrens, ...newChildrens],
        },
        ...folders,
      },
    }));
  },
  foldersRemove: (id, parentId) => {
    set((state) => {
      const { [id]: elem, ...remainingFolders } = state.folders;

      return {
        folders: {
          ...remainingFolders,
          [parentId]: {
            ...remainingFolders[parentId],
            childrens: remainingFolders[parentId].childrens.filter(
              (child) => child !== id,
            ),
          },
        },
      };
    });
  },
  setMoveFolder: (id, parent, futureParent) => {
    set((state) => ({
      folders: {
        ...state.folders,
        [futureParent]: {
          ...state.folders[futureParent],
          childrens: [...state.folders[futureParent].childrens, id],
        },
        [id]: {
          ...state.folders[id],
          parent: futureParent,
          backlinks: state.folders[id].backlinks.map((backlink) =>
            backlink === parent ? futureParent : backlink,
          ),
        },
        [parent]: {
          ...state.folders[parent],
          childrens: state.folders[parent].childrens.filter(
            (child) => child !== id,
          ),
        },
      },
    }));
  },
  setRenameFolder: (id, title) => {
    set((state) => ({
      folders: {
        ...state.folders,
        [id]: {
          ...state.folders[id],
          title: title,
        },
      },
    }));
  },
  setReplaceFolder: (id, newArr) => {
    set((state) => ({
      folders: {
        ...state.folders,
        [id]: {
          ...state.folders[id],
          childrens: newArr,
        },
      },
    }));
  },
  addConnection: (parentId, childId) => {
    set((state) => {
      const newObject = { ...state.folders };

      newObject[parentId] = {
        ...newObject[parentId],
        childrens: [...newObject[parentId].childrens, childId],
      };

      newObject[childId] = {
        ...newObject[childId],
        backlinks: [...newObject[childId].backlinks, parentId],
      };

      return { folders: newObject };
    });
  },
  removeConnection: (parentId, childId) => {
    set((state) => {
      const newObject = { ...state.folders };

      newObject[parentId] = {
        ...newObject[parentId],
        childrens: newObject[parentId].childrens.filter(
          (child) => child !== childId,
        ),
      };

      newObject[childId] = {
        ...newObject[childId],
        backlinks: newObject[childId].backlinks.filter(
          (link) => link !== parentId,
        ),
      };

      return { folders: newObject };
    });
  },
});

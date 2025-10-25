import type { StateCreator } from "zustand";
import type { foldersSlice } from "../storeTypes";

export const createFoldersSlice: StateCreator<foldersSlice> = (set) => ({
    folders: [],
    setFolders: (data) => set({ folders: data }),
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
})
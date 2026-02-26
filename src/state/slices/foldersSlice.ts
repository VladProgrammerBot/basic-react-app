import type { StateCreator } from "zustand";
import type { foldersSlice } from "../../types/storeTypes";

export const createFoldersSlice: StateCreator<foldersSlice> = (set) => ({
    folders: {},
    setFolders: (data) => set({ folders: data }),
    pushFolder: (folder, childrens, id, parentId) =>
        set((state) => ({
            folders: {
                ...state.folders,
                [parentId]: {
                    ...state.folders[parentId],
                    childrens: [...childrens, id]
                },
                [folder.id]: folder,
            }
        })),
    pushMultipleFolder: (foldersObj, childrens, newChildrens, parentId) => {
        const folders = foldersObj.reduce((acc, user) => {
            const id = String(user.id)
            acc[id] = user;
            return acc;
        }, {} as objectFolder);

        set((state) => ({
            folders: {
                ...state.folders,
                [parentId]: {
                    ...state.folders[parentId],
                    childrens: [...childrens, ...newChildrens]
                },
                ...folders
            }
        }))
    },
    foldersRemove: (keysToDelete, id, parentId) => {
        set((state) => {
            const keysToDeleteSet = new Set(keysToDelete);

            const newObject = Object.keys(state.folders)
                .filter(key => !keysToDeleteSet.has(Number(key)))
                .reduce((acc, key) => {
                    acc[key] = state.folders[key];
                    return acc;
                }, {} as objectFolder);

            return {
                folders: {
                    ...newObject,
                    [parentId]: {
                        ...newObject[parentId],
                        childrens: newObject[parentId].childrens.filter((child) => child !== id)
                    }
                }
            }
        });
    },
    setMoveFolder: (id, parent, futureParent) => {
        set((state) => ({
            folders: {
                ...state.folders,
                [futureParent]: {
                    ...state.folders[futureParent],
                    childrens: [...state.folders[futureParent].childrens, id]
                },
                [id]: {
                    ...state.folders[id],
                    parent: futureParent
                },
                [parent]: {
                    ...state.folders[parent],
                    childrens: state.folders[parent].childrens.filter((child) => child !== id)
                }
            }
        }))
    },
    setRenameFolder: (id, title) => {
        set((state) => ({
            folders: {
                ...state.folders,
                [id]: {
                    ...state.folders[id],
                    title: title
                }
            }
        }))
    },
    setReplaceFolder: (id, newArr) => {
        set((state) => ({
            folders: {
                ...state.folders,
                [id]: {
                    ...state.folders[id],
                    childrens: newArr
                }
            }
        }))
    },
    addConnection: (parentId, childId) => {
        set((state) => {
            const newObject = {...state.folders};

            newObject[parentId] = {
                ...newObject[parentId],
                childrens: [...newObject[parentId].childrens, childId]
            }

            newObject[childId] = {
                ...newObject[childId],
                backlinks: [...newObject[childId].backlinks, parentId]
            }

            return { folders: newObject }
        })
    }
})
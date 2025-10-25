export interface foldersSlice {
    folders: folder[]
    pushFolder: (folder: folder, childrens: number[], newId: number) => void;
    setFolders: (data: folder[]) => void;
    setMoveFolder: (id: number, parent: number, futureParent: number) => void
    foldersRemove: (id: number, parentId: number) => void;
}
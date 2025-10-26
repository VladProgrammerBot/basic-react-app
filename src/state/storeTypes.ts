type mode = "normal" | "Add Folder";

export interface foldersSlice {
    folders: folder[]
    pushFolder: (folder: folder, childrens: number[], newId: number) => void;
    setFolders: (data: folder[]) => void;
    setMoveFolder: (id: number, parent: number, futureParent: number) => void
    foldersRemove: (id: number, parentId: number) => void;
    setRenameFolder: (id: number, title: string) => void
}

export interface childrensSlice {
    childrensId: number[];
    setChildrens: (array: number[]) => void;
    pushChildren: (child: number) => void;
    childrensRemove: (id: number) => void;
}

export interface pathSlice {
    path: folder[];
    pushPath: (folder: folder) => void;
    setPath: (folder: folder) => void;
    reducePath: (index: number) => void;
    setParentChildrens: (index: number, childrensId: number[]) => void;
}

export interface itemMenuSlice {
    openMenu: number | null;
    setMenuValue: (value: number | null) => void;
}

export interface modeSlice {
    mode: mode;
    setMode: (mode: mode) => void;
}

export interface moveBufferSlice {
    moveBuffer: { id: number; parent: number } | null
    setBuffer: (id: number, parent: number) => void
    resetMoveBuffer: () => void
}

export interface renameBufferSlice {
    renameBuffer: number | null
    setRenameBuffer: (value: number | null) => void
}

export interface barSlice {
    isBarOpen: boolean,
    toggleBar: () => void,
}


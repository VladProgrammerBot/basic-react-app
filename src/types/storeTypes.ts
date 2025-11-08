type mode = "normal" | "Add Folder";

export interface foldersSlice {
    folders: folder[]
    pushFolder: (folder: folder, childrens: string[], newId: string) => void;
    setFolders: (data: folder[]) => void;
    setMoveFolder: (id: string, parent: string, futureParent: string) => void
    foldersRemove: (id: string, parentId: string) => void;
    setRenameFolder: (id: string, title: string) => void
}

export interface childrensSlice {
    childrensId: string[];
    setChildrens: (array: string[]) => void;
    pushChildren: (child: string) => void;
    childrensRemove: (id: string) => void;
}

export interface pathSlice {
    path: folder[];
    pushPath: (folder: folder) => void;
    setPath: (folder: folder) => void;
    reducePath: (index: number) => void;
    setParentChildrens: (index: number, childrensId: string[]) => void;
}

export interface itemMenuSlice {
    openMenu: string | null;
    setMenuValue: (value: string | null) => void;
}

export interface modeSlice {
    mode: mode;
    setMode: (mode: mode) => void;
}

export interface moveBufferSlice {
    moveBuffer: { id: string; parent: string } | null
    setBuffer: (id: string, parent: string) => void
    resetMoveBuffer: () => void
}

export interface renameBufferSlice {
    renameBuffer: string | null
    setRenameBuffer: (value: string | null) => void
}

export interface barSlice {
    isBarOpen: boolean,
    toggleBar: () => void,
    closeBar: () => void
}

export interface dbSlice {
    db: IDBDatabase | null,
    setDB: (value: IDBDatabase) => void,
}
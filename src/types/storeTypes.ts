type mode = "normal" | "Add Folder" | "AI Generate";

export interface foldersSlice {
    folders: objectFolder
    pushFolder: (folder: folder, childrens: number[], newId: number) => void;
    pushMultipleFolder: (folders: folder[], childrens: number[], newChildrens: number[], parentId: number) => void;
    setFolders: (data: objectFolder) => void;
    setMoveFolder: (id: number, parent: number, futureParent: number) => void
    foldersRemove: (keysToDelete: number[], id: number, parentId: number) => void;
    setRenameFolder: (id: number, title: string) => void;
    setReplaceFolder: (id: number, newArr: number[]) => void;
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
    removeChild: (id: number, parent: number) => void
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
    closeBar: () => void
}

export interface alertsSlice {
    alerts: alert[],
    pushAlert: (alert: alert) => void
    deleteAlert: (id: number) => void
}

export interface authSlice {
    isLogin: boolean,
    setIsLogin: (state: boolean) => void
}

export interface keyNaviSlice {
    selectedItemId: number | null,
    setSelectedItemId: (dir: number | null) => void
}
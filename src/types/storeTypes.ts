type mode =
  | "normal"
  | "Add Folder"
  | "Add Unrelated Folder"
  | "AI Generate"
  | "Filter"
  | "Filter Result";

export interface foldersSlice {
  folders: objectFolder;
  pushFolder: (folder: folder, newId: number, parentId: number | null) => void;
  pushMultipleFolder: (
    folders: folder[],
    childrens: number[],
    newChildrens: number[],
    parentId: number,
  ) => void;
  setFolders: (data: objectFolder) => void;
  setMoveFolder: (id: number, parent: number, futureParent: number) => void;
  foldersRemove: (id: number, parentId: number) => void;
  setRenameFolder: (id: number, title: string) => void;
  setReplaceFolder: (id: number, newArr: number[]) => void;
  addConnection: (parentId: number, childId: number) => void;
  removeConnection: (parentId: number, childId: number) => void;
}

export type path = { id: number; index: number }

export interface pathSlice {
  path: path[];
  isMenuOpen: boolean;
  toggleMenu: () => void;
  pushPath: (folder: path) => void;
  setPath: (folder: path) => void;
  reducePath: (index: number) => void;
}

export interface modeSlice {
  mode: mode;
  setMode: (mode: mode) => void;
}

export interface moveBufferSlice {
  moveBuffer: { id: number; parent: number } | null;
  setBuffer: (id: number, parent: number) => void;
  resetMoveBuffer: () => void;

  IdForNewConnection: null | number;
  setIdForNewConnection: (value: number | null) => void;
}

export interface renameBufferSlice {
  renameBuffer: number | null;
  setRenameBuffer: (value: number | null) => void;
}

export interface barSlice {
  isBarOpen: boolean;
  toggleBar: () => void;
  closeBar: () => void;
}

export interface alertsSlice {
  alerts: alert[];
  pushAlert: (alert: alert) => void;
  deleteAlert: (id: number) => void;
}

export interface authSlice {
  isLogin: boolean;
  setIsLogin: (state: boolean) => void;
  isStyled: boolean;
  setIsStyled: () => void;
}

export interface keyNaviSlice {
  selectedItemId: number | null;
  setSelectedItemId: (dir: number | null) => void;
}

export interface filterSlice {
  filteredElementsId: number[];
  filteredElements: folder[];
  setFilterElements: (elements: folder[]) => void;
}

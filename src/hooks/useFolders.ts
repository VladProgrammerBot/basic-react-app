import foldersState from "../state/stateFolders";

export const useFolders = () => {
  const {
    folders,
    childrensId,
    setChildrens,
    pushPath,
    reducePath,
    pushFolder,
    path,
    pushChildren,
    setParentChildrens,
    setMode,
    foldersRemove,
    childrensRemove,
    setFolders,
    setPath,
  } = foldersState();

  const getFolderById = (id: number) => {
    const data = folders.find((child) => child.id === id);
    return data;
  };

  const moveInto = (id: number) => {
    setParentChildrens(path.length - 1, childrensId);
    const newParent = getFolderById(id);
    if (!newParent) return;
    setChildrens(newParent.childrens);
    pushPath(newParent);
    window.scrollTo(0, 0);
  };

  const moveOut = (data: folder, index: number) => {
    reducePath(index);
    setChildrens(data.childrens);
    window.scrollTo(0, 0);
  };

  const moveFolderVertical = (index: number, dir: number) => {
    const futureIndex = index + dir;
    if (!childrensId || futureIndex + 1 > childrensId.length || futureIndex < 0)
      return;
    const temparr = childrensId;
    const tempIndexValue = temparr[futureIndex];
    temparr[futureIndex] = temparr[index];
    temparr[index] = tempIndexValue;
    setChildrens(temparr);
  };

  const generateId = () => {
    return Math.floor(Math.random() * 5000);
  };

  const addFolder = (value: string): void => {
    setMode("normal");
    const id = generateId();
    const parentId = path[path.length - 1].id;
    pushFolder(
      {
        id: id,
        parent: parentId,
        childrens: [],
        title: value,
      },
      childrensId,
      id
    );
    pushChildren(id);
  };

  const removeFolder = (id: number, parent: number) => {
    foldersRemove(id, parent);
    childrensRemove(id);
  };

  const setFirstState = (data: folder[]) => {
    const parent = data.find((folder) => folder.parent === null);

    if (!parent) return;

    console.log(parent);

    setFolders(data);
    setPath(parent);
    setChildrens(parent.childrens);
  };

  return {
    moveFolderVertical,
    getFolderById,
    moveInto,
    moveOut,
    addFolder,
    removeFolder,
    setFirstState
  };
};

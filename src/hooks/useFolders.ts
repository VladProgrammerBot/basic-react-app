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
    setParentChildrens(path.length - 1, childrensId);
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

  return {
    moveFolderVertical,
    getFolderById,
    moveInto,
    moveOut,
    addFolder,
  };
};

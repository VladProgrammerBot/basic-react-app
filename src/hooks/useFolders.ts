import foldersState from "../state/stateFolders";

export const useFolders = () => {
  const { folders, childrensId, setChildrens, pushPath, reducePath, pushFolder, path, pushChildren, updateFolder } =
    foldersState();

  const getFolderById = (id: number) => {
    const data = folders.find((child) => child.id === id);
    return data;
  };

  const moveInto = (id: number) => {
    const newParent = getFolderById(id);
    if (!newParent) return;

    setChildrens(newParent.childrens);
    pushPath(newParent);
  };

  const moveOut = (data: folder, index: number) => {
    reducePath(index);
    setChildrens(data.childrens);
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
    return Math.floor(Math.random() * 5000)
  }

  const addFolder = (value: string): void => {
    const id = generateId()
    const parentId = path[path.length-1].id
    pushFolder({
      id: id,
      parent: parentId,
      childrens: [],
      title: value
    })
    pushChildren(id)
    updateFolder(parentId)
  };

  return {
    moveFolderVertical,
    getFolderById,
    moveInto,
    moveOut,
    addFolder,
  };
};

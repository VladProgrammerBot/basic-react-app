import store from "@/state/store";
import { useItemDB } from "../db/useItemDB";

export const useItem = () => {
  const {
    folders,
    childrensId,
    setChildrens,
    pushPath,
    path,
    setParentChildrens,
    setRenameFolder,
    renameBuffer,
    setRenameBuffer
  } = store();

  const renameFolderDB = useItemDB()

  const getFolderById = (id: string) => {
    const data = folders.find((child) => child.id === id);
    return data;
  };

  const moveInto = (id: string) => {
    setParentChildrens(path.length - 1, childrensId);
    const newParent = getFolderById(id);
    if (!newParent) return;
    setChildrens(newParent.childrens);
    pushPath(newParent);
    window.scrollTo(0, 0);
  };

  const renameFolder = async (title: string) => {
    if (!renameBuffer) return
    setRenameFolder(renameBuffer, title)
    setRenameBuffer(null)

    renameFolderDB(renameBuffer, title)
  }

  return {
    moveInto,
    renameFolder
  };
};

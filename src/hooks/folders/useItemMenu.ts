import store from "@/state/store";
import { useItemMenuDB } from "../db/useItemMenuDB";

export const useItemMenu = () => {
  const {
    foldersRemove,
    childrensRemove,
  } = store();

  const { removeFolderDB } = useItemMenuDB()

  const removeFolder = async (id: string, parent: string) => {
    removeFolderDB(id, parent)
    foldersRemove(id, parent);
    childrensRemove(id);
  };

  return {
    removeFolder,
  };
};

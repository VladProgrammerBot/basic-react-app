import store from "@/state/store";
import { useItemMenuDB } from "../db/useItemMenuDB";
const api = import.meta.env.VITE_API;

export const useItemMenu = () => {
  const {
    foldersRemove,
    childrensRemove,
  } = store();

  const { removeFolderDB } = useItemMenuDB()

  const removeFolder = async (id: number, parent: number) => {
    removeFolderDB(id, parent)
    foldersRemove(id, parent);
    childrensRemove(id);
  };

  return {
    removeFolder,
  };
};

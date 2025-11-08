import { useMemo } from "react";
import store from "@/state/store";
import { useDB } from "../db/useDB";
import { useFoldersDB } from "../db/useFoldersDB";
const api = import.meta.env.VITE_API;

export const useFolders = () => {
  const {
    folders,
    childrensId,
    pushFolder,
    path,
    pushChildren,
    setMode,
    moveBuffer,
    setMoveFolder,
    resetMoveBuffer,
  } = store();
  useDB()
  const { addFolderDB, moveFolderDB } = useFoldersDB()

  const generateId = () => {
    return Math.random().toString(16).slice(2);
  };

  const addFolder = async (value: string) => {
    const id = generateId();
    const parentId = path[path.length - 1].id;
    const newFolder = {
      id: id,
      parent: parentId,
      childrens: [],
      title: value,
    }

    addFolderDB(newFolder)
    setMode("normal");
    pushFolder(
      newFolder,
      childrensId,
      id
    );
    pushChildren(id);
  };

  const childrensData = useMemo(() => {
    const sortedChildrens = new Array(childrensId.length);
    const parent = path[path.length - 1]?.id;
    folders?.forEach((folder) => {
      if (folder.parent === parent) {
        sortedChildrens[childrensId.indexOf(folder.id)] = folder;
      }
    });

    return sortedChildrens;
  }, [childrensId, folders]);

  const moveFolder = async () => {
    if (!moveBuffer) return
    
    const futureParent = path[path.length - 1].id
    
    moveFolderDB(moveBuffer.id, moveBuffer.parent, futureParent)
    setMoveFolder(moveBuffer.id, moveBuffer.parent, futureParent)
    pushChildren(moveBuffer.id)
    resetMoveBuffer()
    
  }

  async function copyStructureToClipboard() {
    try {
      await navigator.clipboard.writeText(JSON.stringify(folders));
      console.log('Text copied to clipboard');
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }
  }

  return {
    addFolder,
    childrensData,
    moveFolder,
    copyStructureToClipboard
  };
};

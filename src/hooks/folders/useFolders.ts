import { useMemo } from "react";
import store from "@/state/store";
import { useDB } from "../useDB";
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
  const { pushChildrenDB, pushDB } = useDB()

  const generateId = () => {
    return Math.floor(Math.random() * 30000);
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

    pushChildrenDB(parentId, id)
    pushDB(newFolder)
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

    setMoveFolder(moveBuffer.id, moveBuffer.parent, futureParent)
    pushChildren(moveBuffer.id)
    resetMoveBuffer()

    try {
      await fetch(api + "/folders/move", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: moveBuffer.id,
          parentId: moveBuffer.parent,
          future_parent: futureParent,
          token: localStorage.getItem("token")
        })
      })
    } catch (error) {
      console.log(error)
    }
  }

  return {
    addFolder,
    childrensData,
    moveFolder,
  };
};

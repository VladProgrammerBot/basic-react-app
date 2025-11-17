import { useMemo } from "react";
import store from "@/state/store";
import { useAlerts } from "./useAlerts";
const api = import.meta.env.VITE_API;

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
    moveBuffer,
    setMoveFolder,
    resetMoveBuffer,
    setRenameFolder,
    renameBuffer,
    setRenameBuffer,
    setReplaceFolder
  } = store();

  const { alertError, useAlert } = useAlerts()

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
    return Math.floor(Math.random() * 200000000);
  };

  const addFolder = async (value: string, ref: number | null) => {
    const id = generateId();
    const parentId = path[path.length - 1].id;

    setMode("normal");
    pushFolder(
      {
        id: id,
        parent: parentId,
        childrens: [],
        title: value,
        ref: ref
      },
      childrensId,
      id
    );
    pushChildren(id);

    try {
      await fetch(api + "/folders/add", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: id,
          title: value,
          parent: parentId,
          token: localStorage.getItem("token"),
          ref: ref
        })
      })
    } catch (error) {
      alertError("add folder")
      console.log(error)
    }

  };

  const removeFolder = async (id: number, parent: number) => {
    foldersRemove(id, parent);
    childrensRemove(id);

    try {
      await fetch(api + "/folders/remove", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: id,
          token: localStorage.getItem("token")
        })
      })
    } catch (error) {
      alertError("remove folder")
      console.log(error)
    }
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

  const getFolders = async () => {
    try {
      await fetch(api + "/folders/get", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          token: localStorage.getItem("token")
        })
      })
        .then((res) => res.json())
        .then((data: folder[]) => {
          const parent = data.find((folder) => folder.parent === null);

          if (!parent) return;

          setFolders(data);
          setChildrens(parent.childrens);
          setPath(parent);

          useAlert({
            color: "green",
            text: `Try to add your first folder`
          })
        });
    } catch (error) {
      alertError("get folders")
      console.log(error);
    }
  };

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
      alertError("move folder")
      console.log(error)
    }
  }

  const renameFolder = async (title: string) => {
    if (!renameBuffer) return
    setRenameFolder(renameBuffer, title)
    setRenameBuffer(null)

    try {
      await fetch(api + "/folders/rename", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: renameBuffer,
          title: title,
          token: localStorage.getItem("token")
        })
      })
    } catch (error) {
      alertError("rename folder")
      console.log(error)
    }
  }

  const arrayReplacer = (array: number[], index1: number, index2: number) => {
    if (index1 < 0 || index1 >= array.length || index2 < 0 || index2 >= array.length) return null
    const newArray = [...array]
    const temp = newArray[index1]
    newArray[index1] = newArray[index2]
    newArray[index2] = temp

    return newArray
  }

  const replaceFolders = async (id: number, dir: 1 | -1) => {
    const index = childrensId.indexOf(id)
    const newArray = arrayReplacer(childrensId, index, index - dir)

    if (!newArray) return

    const parentId = path[path.length - 1].id
    setChildrens(newArray)
    setReplaceFolder(parentId, newArray)

    try {
      await fetch(api + "/folders/replace", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: parentId,
          newArr: newArray,
          token: localStorage.getItem("token")
        })
      })
    } catch (error) {
      alertError("replace folder")
      console.log(error)
    }
  }

  return {
    moveFolderVertical,
    getFolderById,
    moveInto,
    moveOut,
    addFolder,
    removeFolder,
    childrensData,
    getFolders,
    moveFolder,
    renameFolder,
    replaceFolders
  };
};

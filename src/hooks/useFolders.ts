import { useMemo } from "react";
import store from "@/state/store";
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
    resetMoveBuffer
  } = store();

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

  const addFolder = async (value: string) => {
    const id = generateId();
    const parentId = path[path.length - 1].id;

    setMode("normal");
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
          token: localStorage.getItem("token")
        })
      }).then((res) => res.json())
        .then((data) => console.log(data))
    } catch (error) {
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
      }).then((res) => res.json())
        .then((data) => console.log(data))
    } catch (error) {
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
        });
    } catch (error) {
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
      }).then((res) => res.json())
        .then((data) => console.log(data))
    } catch (error) {
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
    moveFolder
  };
};

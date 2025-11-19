import store from "@/state/store";
import { useAlerts } from "../useAlerts";
const api = import.meta.env.VITE_API;

export const useFolderManipulation = () => {
  const childrensId = store.use.childrensId();
  const path = store.use.path();

  const {
    setChildrens,
    pushFolder,
    pushChildren,
    setMode,
    foldersRemove,
    childrensRemove,
    setReplaceFolder
  } = store();

  const { alertError } = useAlerts()

  const generateId = () => {
    return Math.floor(Math.random() * 200000000);
  };

  const arrayReplacer = (array: number[], index1: number, index2: number) => {
    if (index1 < 0 || index1 >= array.length || index2 < 0 || index2 >= array.length) return null
    const newArray = [...array]
    const temp = newArray[index1]
    newArray[index1] = newArray[index2]
    newArray[index2] = temp

    return newArray
  }

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
    removeFolder,
    addFolder,
    replaceFolders
  };
};
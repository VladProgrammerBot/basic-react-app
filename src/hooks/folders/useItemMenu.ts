import store from "@/state/store";
import { useAlerts } from "../useAlerts";
import { useRef } from "react";
const api = import.meta.env.VITE_API;

export const useFolderManipulation = () => {
  const childrensId = store.use.childrensId();
  const path = store.use.path();
  const markdownBuffer = useRef<string>("")

  const {
    folders,
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
          newId: id,
          title: value,
          id: parentId,
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

  async function addTextToClipboard(text: string) {
    if (!navigator.clipboard) {
      console.error('Clipboard API not available or on an insecure context.');
      alert('Clipboard API not supported. Please use a modern browser over HTTPS.');
      return;
    }

    try {
      await navigator.clipboard.writeText(text);
      // console.log(`Successfully copied to clipboard: "${text}"`);
    } catch (err) {
      console.error('Failed to copy text: ', err);
      alert('Could not copy text. Check the browser console for details.');
    }
  }

  const generateStructure = (id: number, parents: number) => {
    const folder = folders.find((folder) => folder.id === id)
    if (!folder) return

    markdownBuffer.current = markdownBuffer.current + "  ".repeat(parents) + "* " + folder?.title + "\n"

    const childrens = folder.childrens
    if (childrens.length > 0) {
      childrens.forEach((child) => {
        generateStructure(child, parents + 1)
      })
    }
  }

  const copyMarkdown = (id: number) => {
    markdownBuffer.current = ""
    generateStructure(id, 0)

    addTextToClipboard(markdownBuffer.current)
  }

  return {
    removeFolder,
    addFolder,
    replaceFolders,
    copyMarkdown
  };
};
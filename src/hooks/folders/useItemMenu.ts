import store from "@/state/store";
import { useRef } from "react";
import { addTextToClipboard } from "@/utils/addToClipboard";
import { useChildrens } from "./useChildrens";
import { fetchApi } from "./useApi";

export const useFolderManipulation = () => {
  const path = store.use.path();
  const markdownBuffer = useRef<string>("");
  const isLogin = store.use.isLogin();
  const childrensId = useChildrens();
  const removeConnection = store.use.removeConnection();

  const {
    folders,
    pushFolder,
    setMode,
    foldersRemove,
    setReplaceFolder,
    setSelectedItemId,
  } = store();

  const generateId = () => {
    return Math.floor(Math.random() * 200000000);
  };

  const arrayReplacer = (array: number[], index1: number, index2: number) => {
    if (
      index1 < 0 ||
      index1 >= array.length ||
      index2 < 0 ||
      index2 >= array.length
    )
      return null;
    const newArray = [...array];
    const temp = newArray[index1];
    newArray[index1] = newArray[index2];
    newArray[index2] = temp;

    return newArray;
  };

  const addFolder = async (value: string, ref: number | null) => {
    const id = generateId();
    const parentId = path[path.length - 1].id;

    setMode("normal");
    pushFolder(
      {
        id: id,
        childrens: [],
        title: value,
        ref: ref,
        backlinks: [parentId],
      },
      id,
      parentId,
    );
    setSelectedItemId(childrensId.length);

    if (!isLogin) return;

    await fetchApi({
      method: "POST",
      path: "/folders/add",
      body: {
        newId: id,
        title: value,
        id: parentId,
        ref: ref,
      },
      auth: true,
    });
  };

  const addUnrelatedFolder = async (value: string, ref: number | null) => {
    const id = generateId();

    setMode("normal");
    pushFolder(
      {
        id: id,
        childrens: [],
        title: value,
        ref: ref,
        backlinks: [],
      },
      id,
      null,
    );
    setSelectedItemId(childrensId.length);

    if (!isLogin) return;

    await fetchApi({
      method: "POST",
      path: "/folders/add-unrelated",
      body: {
        title: value,
        id: id,
        ref: ref,
      },
      auth: true,
    });
  };

  const removeFolder = async (id: number) => {
    const parent = path[path.length - 1].id;

    if (folders[id].childrens.length !== 0 || folders[id].backlinks.length > 1)
      return;
    foldersRemove(id, parent);

    console.log(1);
    
    if (!isLogin) return;

    await fetchApi({
      method: "DELETE",
      path: "/folders/remove",
      body: {
        id: id,
      },
      auth: true,
    });
  };

  const handleRemoveConnection = async (id: number) => {
    const parent = path[path.length - 1].id;

    removeConnection(parent, id);
    await fetchApi({
      method: "POST",
      path: "/folders/remove-connection",
      body: {
        id: parent,
        childId: id,
      },
      auth: true,
    });
  };

  const replaceFolders = async (id: number, dir: 1 | -1) => {
    const index = childrensId.indexOf(id);
    const newArray = arrayReplacer(childrensId, index, index - dir);

    if (!newArray) return;

    const parentId = path[path.length - 1].id;
    setReplaceFolder(parentId, newArray);

    if (!isLogin) return;

    await fetchApi({
      method: "POST",
      path: "/folders/replace",
      body: {
        id: parentId,
        newArr: newArray,
      },
      auth: true,
    });
  };

  const generateStructure = (id: number, parents: number) => {
    const folder = folders[id];
    if (!folder) return;

    markdownBuffer.current =
      markdownBuffer.current +
      "  ".repeat(parents) +
      "* " +
      folder?.title +
      "\n";

    const childrens = folder.childrens;
    if (childrens.length > 0) {
      childrens.forEach((child) => {
        generateStructure(child, parents + 1);
      });
    }
  };

  const copyMarkdown = (id: number) => {
    markdownBuffer.current = "";
    generateStructure(id, 0);
    addTextToClipboard(markdownBuffer.current);
  };

  return {
    removeFolder,
    addFolder,
    replaceFolders,
    copyMarkdown,
    handleRemoveConnection,
    addUnrelatedFolder,
  };
};

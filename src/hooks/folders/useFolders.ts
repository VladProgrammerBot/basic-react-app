import { useMemo } from "react";
import store from "@/state/store";
import { useAlerts } from "../useAlerts";
const api = import.meta.env.VITE_API;

export const useFolders = () => {
  const folders = store.use.folders();
  const childrensId = store.use.childrensId();
  const path = store.use.path();
  const pushChildren = store.use.pushChildren();
  const pushMultipleFolder = store.use.pushMultipleFolder()
  const setMode = store.use.setMode()

  const { alertError } = useAlerts()

  const childrensData = useMemo(() => {
    const sortedChildrens = new Array(0);
    childrensId.forEach((child) => {

      const data = folders[child]
      sortedChildrens.push({
        ...data
      })
    })

    return sortedChildrens;
  }, [childrensId, folders, path]);

  const generateFolders = async (prompt: string) => {
    const token = localStorage.getItem("token")
    const id = path[path.length - 1].id

    try {
      await fetch(api + "/folders/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: id,
          prompt: prompt,
          token: token
        })
      })
        .then(res => res.json())
        .then(data => {
          setMode("normal")
          pushMultipleFolder(data.data, childrensId, data.mainParentChildrens, id)
          pushChildren(data.mainParentChildrens[0])
        })
    } catch (error) {
      alertError("generate folders")
      console.log(error);
    }
  }

  return {
    childrensData,

    generateFolders
  };
};
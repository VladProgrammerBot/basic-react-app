import { useMemo } from "react";
import store from "@/state/store";
import { useAlerts } from "../useAlerts";
const api = import.meta.env.VITE_API;
import { RiGeminiFill } from "react-icons/ri";
import { FaPaste } from "react-icons/fa";
import { usePath } from "@/hooks/folders/usePath";
import { BsPlus } from "react-icons/bs";
import { useEffect } from "react";
import { useItem } from "./useItem";

export const useFolders = () => {
  const mode = store.use.mode()
  const folders = store.use.folders();
  const childrensId = store.use.childrensId();
  const path = store.use.path();
  const pushChildren = store.use.pushChildren();
  const pushMultipleFolder = store.use.pushMultipleFolder()
  const setMode = store.use.setMode()
  const renameBuffer = store.use.renameBuffer()
  const moveBuffer = store.use.moveBuffer()
  const setSelectedItemId = store.use.setSelectedItemId()
  const selectedItemId = store.use.selectedItemId()

  const { moveFolder } = usePath()
  const { alertError } = useAlerts()
  const { moveInto } = useItem()
  const { moveOut } = usePath()


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
    }
  }

  const buttons = [
    {
      title: "Add",
      icon: <BsPlus fontSize={25} />,
      func: () => setMode("Add Folder"),
      cond: true
    },
    {
      title: "Generate",
      icon: <RiGeminiFill />,
      func: () => setMode("AI Generate"),
      cond: true
    },
    {
      title: "Paste",
      icon: <FaPaste />,
      func: moveFolder,
      cond: moveBuffer
    }
  ]

  const Hotkeys = (e: KeyboardEvent) => {
    if (mode !== "normal" || renameBuffer) return

    if (e.key === "j") {
      if (selectedItemId === null) {
        return setSelectedItemId(0)
      }
      if (selectedItemId < childrensId.length - 1) {
        return setSelectedItemId(selectedItemId + 1)
      }
    }

    if (e.key === "k") {
      if (selectedItemId === null) {
        return setSelectedItemId(childrensId.length - 1)
      }
      if (selectedItemId > 0) {
        return setSelectedItemId(selectedItemId - 1)
      }
    }

    if (e.key === "l" && typeof selectedItemId === "number") return moveInto(childrensId[selectedItemId])
    if (e.key === "h" && path.length !== 1) return moveOut(path[path.length - 2].childrens, path.length - 2)

    if (e.key === "K") return setSelectedItemId(0)
    if (e.key === "J") return setSelectedItemId(childrensId.length - 1)
    if (e.key === "H" && path.length !== 1) return moveOut(path[0].childrens, 0)

    if (e.key === "a") {
      e.preventDefault()
      return setMode("Add Folder")
    }
  }

  useEffect(() => {
    document.addEventListener('keydown', Hotkeys)
    return () => {
      document.removeEventListener('keydown', Hotkeys)
    }
  }, [mode, selectedItemId, childrensId])

  return {
    childrensData,
    generateFolders,
    buttons
  };
};
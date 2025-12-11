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
import { useFolderManipulation } from "./useItemMenu";

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
  const setBuffer = store.use.setBuffer()

  const { moveFolder } = usePath()
  const { alertError } = useAlerts()
  const { moveInto } = useItem()
  const { moveOut } = usePath()
  const { removeFolder, replaceFolders, addFolder } = useFolderManipulation()


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
      cond: true,
      Hotkeys: "a"
    },
    {
      title: "Generate",
      icon: <RiGeminiFill />,
      func: () => setMode("AI Generate"),
      cond: true,
      Hotkeys: "g"
    },
    {
      title: "Paste",
      icon: <FaPaste />,
      func: moveFolder,
      cond: moveBuffer,
      Hotkeys: "m"
    }
  ]

  const Hotkeys = (e: KeyboardEvent) => {
    if (mode !== "normal" || renameBuffer || e.repeat) return
    const selectedId = typeof selectedItemId === "number" ? childrensId[selectedItemId] : null

    if (e.code === "KeyJ") {
      if (e.shiftKey && selectedId) replaceFolders(selectedId, -1)
      if (selectedItemId === null) {
        return setSelectedItemId(0)
      }
      if (selectedItemId < childrensId.length - 1) {
        return setSelectedItemId(selectedItemId + 1)
      }
    }

    if (e.code === "KeyK") {
      if (e.shiftKey && selectedId) replaceFolders(selectedId, 1)
      if (selectedItemId === null) {
        return setSelectedItemId(childrensId.length - 1)
      }
      if (selectedItemId > 0) {
        return setSelectedItemId(selectedItemId - 1)
      }
    }

    if (e.code === "KeyH" && path.length !== 1) {
      if (e.shiftKey) return moveOut(path[0].childrens, 0)

      setSelectedItemId(path[path.length - 1].index ?? 0)
      moveOut(path[path.length - 2].childrens, path.length - 2)
      return
    }

    if (e.code === "KeyA") {
      e.preventDefault()
      return setMode("Add Folder")
    }

    if (e.code === "KeyG") {
      e.preventDefault()
      return setMode("AI Generate")
    }

    if (!selectedId) return
    const selectedFolder = folders[selectedId]

    if (e.code === "KeyD") {
      if (selectedItemId === childrensId.length - 1) {
        setSelectedItemId(childrensId.length - 2)
      }
      return removeFolder(selectedId)
    }

    if (e.code === "KeyM") {
      if (moveBuffer === null) {
        return setBuffer(selectedId, path[path.length - 1].id)
      }
      return moveFolder()
    }

    if (e.code === "KeyR" && !e.shiftKey && !e.ctrlKey && !e.altKey && !e.metaKey) {
      return addFolder(selectedFolder.title + " (ref)", selectedId)
    }

    if (e.code === "KeyL" && typeof selectedItemId === "number") {
      return moveInto(selectedFolder.ref ?? selectedId, selectedItemId)
    }
  }

  useEffect(() => {
    document.addEventListener('keydown', Hotkeys)
    return () => {
      document.removeEventListener('keydown', Hotkeys)
    }
  }, [mode, selectedItemId, childrensId, childrensData, moveBuffer, renameBuffer, folders])

  return {
    childrensData,
    generateFolders,
    buttons
  };
};
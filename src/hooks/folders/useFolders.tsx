import { useMemo } from "react";
import store from "@/state/store";
import { useAlerts } from "../useAlerts";
const api = import.meta.env.VITE_API;
import { FaPaste } from "react-icons/fa";
import { usePath } from "@/hooks/folders/usePath";
import { RiGeminiFill } from "react-icons/ri";
import { IoMdAdd } from "react-icons/io";
import { useChildrens } from "./useChildrens";

export const useFolders = () => {
  const folders = store.use.folders();
  const childrensId = useChildrens();
  const pushMultipleFolder = store.use.pushMultipleFolder();
  const setMode = store.use.setMode();
  const path = store.use.path();
  const moveBuffer = store.use.moveBuffer();
  const mode = store.use.mode();
  const isUserSearching = mode === "Filter" || mode === "Filter Result";

  const { moveFolder } = usePath();
  const { alertError, useAlert } = useAlerts();

  const childrensData = useMemo(() => {
    const sortedChildrens = new Array(0);
    childrensId.forEach((child) => {
      const data = folders[child];

      if (data) {
        sortedChildrens.push({
          ...data,
        });
      } else {
        sortedChildrens.push({
          backlinks: [],
          childrens: [],
          id: child,
          title: "[Not found]",
          ref: null,
        } as folder);
      }
    });

    return sortedChildrens as folder[];
  }, [childrensId, folders, path]);

  const generateFolders = async (prompt: string) => {
    const token = localStorage.getItem("token");
    const id = path[path.length - 1].id;

    try {
      await fetch(api + "/folders/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: id,
          prompt: prompt,
          token: token,
        }),
      })
        .then((res) => res.json())
        .then((data) => {
          setMode("normal");
          pushMultipleFolder(
            data.data,
            childrensId,
            data.mainParentChildrens,
            id,
          );
          // pushChildren(data.mainParentChildrens[0])
        });
    } catch (error) {
      alertError("generate folders");
    }
  };

  const buttons = [
    {
      // title: "Add",
      icon: <IoMdAdd />,
      func: () => setMode("Add Folder"),
      cond: true,
      Hotkeys: "a",
    },
    {
      title: "Generate",
      icon: <RiGeminiFill />,
      func: () =>
        localStorage.getItem("token")
          ? setMode("AI Generate")
          : useAlert({ color: "blue", text: "Log in to use AI features." }),
      cond: true,
      Hotkeys: "g",
    },
    {
      title: "Paste",
      icon: <FaPaste />,
      func: moveFolder,
      cond: moveBuffer,
      Hotkeys: "m",
    },
  ];

  // const elements =
  //   isUserSearching
  //     ? filteredElements
  //     : childrensData;

  return {
    childrensData,
    generateFolders,
    buttons,
    // elements,
    isUserSearching,
  };
};
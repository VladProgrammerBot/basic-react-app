import store from "@/state/store";
import { useAlerts } from "../useAlerts";
import { useEffect } from "react";
import { fetchApi } from "./useApi";
// import { useKeyboardShortcuts } from "./useKeyboard";

const api = import.meta.env.VITE_API;

export const useEdit = () => {
  const { alertError } = useAlerts();
  const setFolders = store.use.setFolders();
  const setPath = store.use.setPath();
  const setIsLogin = store.use.setIsLogin();
  const folders = store.use.folders();

  //

  const thereAreFolders = Object.keys(folders).length !== 0;
  const isUserLoggedIn = localStorage.getItem("token") !== null;

  useEffect(() => {
    const handleContextMenu = (e: MouseEvent) => e.preventDefault();
    document.addEventListener("contextmenu", handleContextMenu);
    if (thereAreFolders) return;
    if (isUserLoggedIn) {
      setIsLogin(true);
      getUsersFolders();
    } else {
      setIsLogin(false);
      getTemplateFolders();
    }
    return () => document.removeEventListener("contextmenu", handleContextMenu);
  }, []);

  const setFoldersToState = (data: folder[], rootId: number) => {
    const folders = data.reduce((acc, user) => {
      const id = String(user.id);
      acc[id] = user;
      return acc;
    }, {} as objectFolder);

    const parent = folders[rootId];

    setFolders(folders);
    setPath({ id: parent.id, index: 0 });
  };

  const createMinStructure = () => {
    const folder = {
      id: 1,
      title: "Root",
      parent: null,
      childrens: [],
      backlinks: [],
      ref: null,
    };

    setFolders({ folder });
    setPath({ id: folder.id, index: 0 });
    setIsLogin(false);
  };

  const getUsersFolders = async () => {
    await fetchApi({
      method: "POST",
      path: "/folders/get",
      auth: true,
      onSuccess: (data) => {
        const token = localStorage.getItem("token");
        if (!token) return;
        const payload = token.split(".");
        const { userId } = JSON.parse(atob(payload[1]));
        setFoldersToState(data, userId);
      },
      onError: () => {
        alertError("get folders");
        createMinStructure();
      },
    });
  };

  const getTemplateFolders = async () => {
    try {
      await fetch(api + "/folders/template", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((res) => res.json())
        .then((data) => {
          setFoldersToState(data.folders, data.rootId);
        });
    } catch (error) {
      alertError("get folders");
      createMinStructure();
    }
  };

  return {
    thereAreFolders,
  };
};

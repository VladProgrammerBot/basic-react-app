import store from "@/state/store";
import { useAlerts } from "../useAlerts";
import { useEffect, useCallback } from "react";
import { fetchApi } from "./useApi";

export const useWorkspace = () => {
  const { alertError } = useAlerts();
  const setFolders = store.use.setFolders();
  const setPath = store.use.setPath();
  const setIsLogin = store.use.setIsLogin();
  const folders = store.use.folders();
  
  const thereAreFolders = Object.keys(folders).length !== 0;
  const isUserLoggedIn = localStorage.getItem("token") !== null;

  const preventContextMenu = useCallback(() => {
    const handleContextMenu = (e: MouseEvent) => e.preventDefault();
    document.addEventListener("contextmenu", handleContextMenu);
    return () => document.removeEventListener("contextmenu", handleContextMenu);
  }, []);

  useEffect(() => {
    if (!thereAreFolders) {
      setIsLogin(isUserLoggedIn);
      if (isUserLoggedIn) {
        getUsersFolders();
      } else {
        getTemplateFolders();
      }
    }
    return preventContextMenu();
  }, []);

  const setFoldersToState = useCallback((data: folder[], rootId: number) => {
    const folders = data.reduce((acc, user) => {
      const id = String(user.id);
      acc[id] = user;
      return acc;
    }, {} as objectFolder);

    const parent = folders[rootId];

    setFolders(folders);
    setPath({ id: parent.id, index: 0 });
  }, [setFolders, setPath]);

  const createMinStructure = useCallback(() => {
    const rootFolder: folder = {
      id: 1,
      title: "Root",
      childrens: [],
      backlinks: [],
      ref: null,
    };

    setFolders({ 1: rootFolder });
    setPath({ id: rootFolder.id, index: 0 });
    setIsLogin(false);
  }, [setFolders, setPath, setIsLogin]);

  const getUserId = useCallback(() => {
    const token = localStorage.getItem("token");
    if (!token) return null;
    try {
      const payload = token.split(".")[1];
      const { userId } = JSON.parse(atob(payload));
      return userId as number;
    } catch {
      return null;
    }
  }, []);

  const getUsersFolders = useCallback(async () => {
    await fetchApi({
      method: "POST",
      path: "/folders/get",
      auth: true,
      onSuccess: (data: folder[]) => {
        const userId = getUserId();
        if (!userId) return;
        setFoldersToState(data, userId);
      },
      onError: () => {
        alertError("get folders");
        createMinStructure();
      },
    });
  }, [alertError, createMinStructure, getUserId, setFoldersToState]);

  const getTemplateFolders = useCallback(async () => {
    await fetchApi({
      method: "GET",
      path: "/folders/template",
      auth: false,
      onSuccess: (data: { folders: folder[]; rootId: number }) => {
        setFoldersToState(data.folders, data.rootId);
      },
      onError: () => {
        alertError("get folders");
        createMinStructure();
      },
    });
  }, [alertError, createMinStructure, setFoldersToState]);

  return {
    thereAreFolders,
  };
};

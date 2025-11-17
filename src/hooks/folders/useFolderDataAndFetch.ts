// useFolderDataAndFetch.ts
import store from "@/state/store";
import { useAlerts } from "../useAlerts";
const api = import.meta.env.VITE_API;

// Врахуйте, що 'folder' повинен бути визначений типом в іншому місці або переданий
// type folder = any; // Якщо тип 'folder' не визначений тут

export const useFolderDataAndFetch = () => {
  const { setFolders, setChildrens, setPath } = store();
  const { alertError, useAlert } = useAlerts();

  const getFolders = async () => {
    try {
      const response = await fetch(api + "/folders/get", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token: localStorage.getItem("token") })
      });
      const data: folder[] = await response.json(); // Припускаючи, що 'folder' визначено
      
      const parent = data.find((folder) => folder.parent === null);

      if (!parent) return;

      setFolders(data);
      setChildrens(parent.childrens);
      setPath(parent);

      useAlert({
        color: "green",
        text: `Try to add your first folder`
      });
    } catch (error) {
      alertError("get folders");
      console.log(error);
    }
  };

  return {
    getFolders,
  };
};
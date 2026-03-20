import store from "@/state/store";
import { useAlerts } from "../useAlerts";
import { useChildrens } from "./useChildrens";
import { useButtons } from "./useButtons";
import { usePath } from "./usePath";
const api = import.meta.env.VITE_API;

export const useItem = () => {
  const { alertError } = useAlerts();

  const childrensId = useChildrens();
  const renameBuffer = store.use.renameBuffer();
  const setMode = store.use.setMode();
  const pushPath = store.use.pushPath();
  const setRenameFolder = store.use.setRenameFolder();
  const setRenameBuffer = store.use.setRenameBuffer();
  const isGuideOpen = store.use.isLogin();
  const moveBuffer = store.use.moveBuffer();
  const { handleAddConnection } = useButtons();
  const { moveFolder } = usePath();

  const moveInto = (id: number, index: number) => {
    console.log(id, childrensId)
    if (childrensId.length === 0) return;

    setMode("normal");
    pushPath({ id, index });
    window.scrollTo(0, 0);
  };

  const renameFolder = async (title: string) => {
    if (!renameBuffer) return;
    setRenameFolder(renameBuffer, title);
    setRenameBuffer(null);

    if (!isGuideOpen) return;
    try {
      await fetch(api + "/folders/rename", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: renameBuffer,
          title: title,
          token: localStorage.getItem("token"),
        }),
      });
    } catch (error) {
      alertError("rename folder");
    }
  };

  const addConnection = () => {
    if (!moveBuffer) return;
    if (moveBuffer.parent === null) {
      handleAddConnection();
    }
    moveFolder();
  };

  return { moveInto, renameFolder, addConnection };
};

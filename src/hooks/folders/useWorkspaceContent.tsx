import { useItem } from "./useItem";
import { generateId } from "../generateId";
import { fetchApi } from "./useApi";
import store from "@/state/store";
import { useChildrens } from "./useChildrens";
import { useKeyboardShortcuts } from "./useKeyboard";

export const useWorkspaceContent = () => {
  const { moveInto } = useItem();
  const isLogin = store.use.isLogin();
  const childrensId = useChildrens();
  const setMode = store.use.setMode();
  const pushFolder = store.use.pushFolder();
  const setSelectedItemId = store.use.setSelectedItemId();

  useKeyboardShortcuts();

  const addUnrelatedFolder = async (value: string) => {
    const id = generateId();

    setMode("normal");
    pushFolder(
      {
        id: id,
        childrens: [],
        title: value,
        ref: null,
        backlinks: [],
      },
      id,
      null,
    );
    setSelectedItemId(childrensId.length);
    moveInto(id, 0);

    if (!isLogin) return;

    await fetchApi({
      method: "POST",
      path: "/folders/add-unrelated",
      body: {
        title: value,
        id: id,
        ref: null,
      },
      auth: true,
    });
  };

  return {
    addUnrelatedFolder,
  };
};

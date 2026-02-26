import store from "@/state/store";
import { useEffect } from "react";
import { useItem } from "./useItem";
import { useFolderManipulation } from "./useItemMenu";
import { usePath } from "./usePath";
import { addTextToClipboard } from "@/utils/addToClipboard";
import { useChildrens } from "./useChildrens";
import { useButtons } from "./useButtons";

export const useKeyboard = () => {
  const mode = store.use.mode();
  const setSelectedItemId = store.use.setSelectedItemId();
  const selectedItemId = store.use.selectedItemId();
  const setBuffer = store.use.setBuffer();
  const resetMoveBuffer = store.use.resetMoveBuffer();
  const renameBuffer = store.use.renameBuffer();
  const setIdForNewConnection = store.use.setIdForNewConnection();
  const IdForNewConnection = store.use.IdForNewConnection();
  const folders = store.use.folders();
  const moveBuffer = store.use.moveBuffer();
  const setMode = store.use.setMode();
  const path = store.use.path();
  const setRenameBuffer = store.use.setRenameBuffer();
  const toggleMenu = store.use.toggleMenu();
  const childrensId = useChildrens();

  const { moveInto } = useItem();
  const { moveOut, moveFolder } = usePath();
  const { removeFolder, replaceFolders, addFolder, copyMarkdown } =
    useFolderManipulation();
  const { handleAddConnection } = useButtons();

  const Hotkeys = (e: KeyboardEvent) => {
    if (e.code === "Escape") {
      setMode("normal");
      setSelectedItemId(null);
    }

    if ((mode !== "normal" && mode !== "Filter Result") || renameBuffer) return;
    const selectedId =
      typeof selectedItemId === "number" ? childrensId[selectedItemId] : null;

    if (e.code === "KeyJ") {
      if (selectedItemId === null) {
        return setSelectedItemId(0);
      }
      if (e.shiftKey && selectedId && !e.repeat) replaceFolders(selectedId, -1);
      if (selectedItemId < childrensId.length - 1) {
        return setSelectedItemId(selectedItemId + 1);
      }
    }

    if (e.code === "KeyK") {
      if (selectedItemId === null) {
        return setSelectedItemId(childrensId.length - 1);
      }
      if (e.shiftKey && selectedId && !e.repeat) replaceFolders(selectedId, 1);
      if (selectedItemId > 0) {
        return setSelectedItemId(selectedItemId - 1);
      }
    }

    if (e.repeat) return;
    const parentId = path[path.length - 1].id

    if (e.code === "KeyH" && path.length !== 1) {
      if (e.shiftKey) return moveOut(0);
      return moveOut(path.length - 2);
    }

    if (e.code === "KeyA") {
      e.preventDefault();
      return setMode("Add Folder");
    }

    if (e.code === "KeyG") {
      e.preventDefault();
      return setMode("AI Generate");
    }

    if (e.code === "KeyM") {
      if (e.shiftKey) return resetMoveBuffer();
      if (moveBuffer === null && selectedId) {
        return setBuffer(selectedId, parentId);
      }
      return moveFolder();
    }

    if (e.code === "KeyP") {
      toggleMenu();
    }

    if (
      e.code === "KeyS" &&
      !e.shiftKey &&
      !e.ctrlKey &&
      !e.altKey &&
      !e.metaKey
    ) {
      e.preventDefault();
      return setMode("Filter");
    }

    if (
      e.code === "KeyR" &&
      !e.shiftKey &&
      !e.ctrlKey &&
      !e.altKey &&
      !e.metaKey
    ) {
      if (typeof IdForNewConnection === "number") {
        return handleAddConnection(parentId, IdForNewConnection);
      }
      return setIdForNewConnection(selectedId);
    }

    if (!selectedId) return;
    const selectedFolder = folders[selectedId];

    if (e.code === "KeyL" && typeof selectedItemId === "number") {
      setSelectedItemId(0);
      return moveInto(selectedFolder.ref ?? selectedId, selectedItemId);
    }

    if (e.code === "KeyE") {
      e.preventDefault();
      setRenameBuffer(selectedId);
    }

    if (e.code === "KeyD" && e.shiftKey) {
      if (selectedItemId === childrensId.length - 1) {
        setSelectedItemId(childrensId.length - 2);
      }
      return removeFolder(selectedId);
    }

    if (e.code === "KeyC" && !e.ctrlKey && !e.altKey && !e.metaKey) {
      if (e.shiftKey) {
        return copyMarkdown(parentId);
      }

      e.preventDefault();
      return addTextToClipboard(selectedFolder.title);
    }
  };

  useEffect(() => {
    document.addEventListener("keydown", Hotkeys);
    return () => {
      document.removeEventListener("keydown", Hotkeys);
    };
  }, [
    mode,
    selectedItemId,
    childrensId,
    moveBuffer,
    renameBuffer,
    folders,
    path,
    toggleMenu,
    setSelectedItemId,
    setBuffer,
    resetMoveBuffer,
    setMode,
    setRenameBuffer,
    moveInto,
    moveOut,
    moveFolder,
    removeFolder,
    replaceFolders,
    addFolder,
    copyMarkdown,
  ]);
};

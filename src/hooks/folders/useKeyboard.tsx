import store from "@/state/store";
import { useEffect } from "react";
import { useItem } from "./useItem";
import { useFolderManipulation } from "./useItemMenu";
import { usePath } from "./usePath";
import { addTextToClipboard } from "@/utils/addToClipboard";
import { useChildrens } from "./useChildrens";
import { useButtons } from "./useButtons";

export const useKeyboardShortcuts = () => {
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
  const {
    removeFolder,
    replaceFolders,
    addFolder,
    copyMarkdown,
    handleRemoveConnection,
  } = useFolderManipulation();
  const { handleAddConnection } = useButtons();

  const Hotkeys = (e: KeyboardEvent) => {
    if (e.code === "Escape") {
      setMode("normal");
      setSelectedItemId(null);
      setRenameBuffer(null);
    }

    if (
      (mode !== "normal" && mode !== "Filter Result" && mode !== "Backlinks") ||
      renameBuffer
    )
      return;
    const selectedId =
      typeof selectedItemId === "number" ? childrensId[selectedItemId] : null;

    const isLastItem = selectedItemId === childrensId.length - 1;
    const isFirstItem = selectedItemId === 0;
    const isNotSelected = selectedItemId === null;

    if (e.code === "KeyJ") {
      if (isNotSelected) {
        return setSelectedItemId(0);
      }
      if (e.shiftKey && selectedId && !e.repeat) {
        replaceFolders(selectedId, -1);
      }
      setSelectedItemId(isLastItem ? 0 : selectedItemId + 1);
    }

    if (e.code === "KeyK") {
      if (isNotSelected) {
        return setSelectedItemId(childrensId.length - 1);
      }
      if (e.shiftKey && selectedId && !e.repeat) {
        replaceFolders(selectedId, 1);
      }
      setSelectedItemId(isFirstItem ? childrensId.length - 1 : selectedItemId - 1);
    }

    // if (e.code === "KeyK") {
    //   if (selectedItemId === null) {
    //     setSelectedItemId(childrensId.length - 1);
    //     return;
    //   }

    //   if (e.shiftKey && selectedId && !e.repeat) {
    //     replaceFolders(selectedId, 1);
    //     return;
    //   }

    //   setSelectedItemId(selectedItemId === 0 ? childrensId.length - 1 : selectedItemId - 1);
    // }

    if (e.repeat) return;
    const parentId = path[path.length - 1].id;
    const parent = folders[parentId];

    if (e.code === "KeyB") {
      if (parent.backlinks.length === 0) return;
      if (mode === "Backlinks") return setMode("normal");
      setSelectedItemId(0);
      return setMode("Backlinks");
    }

    if (e.code === "KeyH" && path.length !== 1) {
      if (e.shiftKey) return moveOut(0);
      return moveOut(path.length - 2);
    }

    if (e.code === "KeyA") {
      e.preventDefault();
      if (e.shiftKey) return setMode("Add Unrelated Folder");
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
      if (mode === "Backlinks") {
        return moveInto(parent.backlinks[selectedItemId], 0);
      }
      return moveInto(selectedFolder.ref ?? selectedId, selectedItemId);
    }

    if (e.code === "KeyE") {
      e.preventDefault();
      setRenameBuffer(selectedId);
    }

    if (e.code === "KeyD") {
      if (!e.shiftKey) {
        handleRemoveConnection(selectedId);
      }
      if (selectedItemId === childrensId.length - 1) {
        setSelectedItemId(childrensId.length - 2);
      }
      return removeFolder(selectedId);
    }

    if (e.code === "KeyC" && !e.ctrlKey && !e.altKey && !e.metaKey) {
      // if (e.shiftKey) {
      //   navigator.clipboard.writeText("text/markdown");
      //   return copyMarkdown(parentId);
      // }

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

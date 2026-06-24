import { Navigation } from "./Navigation";
import { SearchInput } from "./SearchInput";
import { MenuButton } from "../ui-elements/MenuButton";
import { MenuBar } from "./MenuBar";
import { IoMdAdd } from "react-icons/io";
import store from "@/state/store";
import { ItemTitle } from "./ItemTitle";
import { useMemo, useCallback } from "react";

export const Header = () => {
  const mode = store.use.mode();
  const designMode = store.use.designMode();
  const setMode = store.use.setMode();
  const isSearch = mode === "Filter" || mode === "Filter Result";

  const { showFullNavigation, showSearchBar, showMinimalTitle } = useMemo(
    () => ({
      showFullNavigation: designMode !== "Minimalistic" && !isSearch,
      showSearchBar: designMode !== "Minimalistic" || isSearch,
      showMinimalTitle: designMode === "Minimalistic" && !isSearch,
    }),
    [designMode, isSearch],
  );

  const handleAddFolder = useCallback(
    () => setMode("Add Unrelated Folder"),
    [setMode],
  );

  return (
    <div className="fixed bg-neutral-900 top-0 left-0 right-0 z-10 max-w-xl mx-auto pt-2 px-2 flex justify-between">
      {!isSearch && <Navigation />}
      {showMinimalTitle && (
        <div className="flex-1 flex items-center overflow-hidden text-nowrap rounded-xl p-1">
          <ItemTitle />
        </div>
      )}
      {showSearchBar && <SearchInput />}
      {showFullNavigation && (
        <MenuButton
          onClick={handleAddFolder}
          icon={<IoMdAdd />}
          hotkey="Shift+A"
        />
      )}
      <MenuBar />
    </div>
  );
};

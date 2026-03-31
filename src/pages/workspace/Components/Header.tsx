import { Navigation } from "./Navigation";
import { SearchInput } from "./SearchInput";
import { MenuButton } from "../ui-elements/MenuButton";
import { Bar } from "./Bar";
import { IoMdAdd } from "react-icons/io";
import store from "@/state/store";
import { ItemTitle } from "./ItemTitle";

export const Header = () => {
  const mode = store.use.mode();
  const designMode = store.use.designMode();
  const isSearch = mode === "Filter" || mode === "Filter Result";
  const fullNavigation = designMode !== "Minimalistic" && !isSearch;
  const searchBar = designMode !== "Minimalistic" || isSearch;
  const setMode = store.use.setMode();

  return (
    <div className="fixed top-0 left-0 right-0 z-10">
      <div className="max-w-xl mx-auto p-2">
        <div className="flex justify-between max-w-xl gap-1">
          {!isSearch && <Navigation />}
          {designMode === "Minimalistic" && !isSearch && (
            <div className="flex-1 flex items-center bg-neutral-800 overflow-hidden text-nowrap rounded-xl p-1">
              <ItemTitle />
            </div>
          )}
          {searchBar && <SearchInput />}
          {fullNavigation && (
            <MenuButton
              onClick={() => setMode("Add Unrelated Folder")}
              icon={<IoMdAdd />}
              hotkey="Shift+A"
            />
          )}
          <Bar />
        </div>
      </div>
    </div>
  );
};

import { Navigation } from "./Navigation";
import { SearchInput } from "./SearchInput";
import { MenuButton } from "../ui-elements/MenuButton";
import { Bar } from "./Bar";
import { IoMdAdd } from "react-icons/io";
import store from "@/state/store";

export const Header = () => {
  const mode = store.use.mode();
  const isStyled = store.use.isStyled();
  const isSearch = mode === "Filter" || mode === "Filter Result";
  const fullNavigation = isStyled && !isSearch;
  const searchBar = isStyled || isSearch;
  const setMode = store.use.setMode();

  return (
    <div className="fixed top-0 left-0 right-0 z-10">
      <div className="max-w-xl mx-auto p-2">
        <div className="flex justify-between gap-1">
          {fullNavigation && <Navigation />}
          {searchBar && <SearchInput />}
          {fullNavigation && <MenuButton onClick={() => setMode("Add Unrelated Folder")} icon={<IoMdAdd />} hotkey="Shift+A" />}
          {isStyled && <Bar />}
        </div>
      </div>
    </div>
  );
};

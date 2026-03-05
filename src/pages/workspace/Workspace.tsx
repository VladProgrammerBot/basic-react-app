import { IoMdAdd } from "react-icons/io";
import { useEffect } from "react";
import { ItemContent } from "./Components/ItemContent";
import { SearchedItems } from "./Components/SearchedItems";
import { SearchInput } from "./Components/SearchInput";
import { MenuButton } from "./ui-elements/MenuButton";
import { Navigation } from "./Components/Navigation";
import { Bar } from "./Components/Bar";

export const Workspace = () => {
  const isSearch = false;
  const isMinimalist = false;

  useEffect(() => {
    const handleContextMenu = (e: MouseEvent) => e.preventDefault();
    document.addEventListener("contextmenu", handleContextMenu);
    return () => document.removeEventListener("contextmenu", handleContextMenu);
  }, []);

  const fullNavigation = !isMinimalist && !isSearch;
  const searchBar = !isMinimalist || isSearch;

  return (
    <div className="p-2 max-w-xl mx-auto">
      {/* <div className="loader translate-1/2 right-1/2 bottom-1/2 fixed"></div> */}
      <div className="flex justify-between mb-1 gap-1">
        {fullNavigation && <Navigation />}
        {searchBar && <SearchInput />}
        {fullNavigation && <MenuButton icon={<IoMdAdd />} hotkey="Shift+A" />}
        <Bar />
      </div>
      {isSearch ? <SearchedItems /> : <ItemContent />}
    </div>
  );
};

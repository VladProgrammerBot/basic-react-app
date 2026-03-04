import { IoMdAdd } from "react-icons/io";
import { useEffect } from "react";
import { ItemContent } from "./ItemContent";
import { SearchedItems } from "./SearchedItems";
import { SearchInput } from "./SearchInput";
import { MenuButton } from "./Button";
import { Navigation } from "./Navigation";

export const Experements = () => {
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
      <div className="flex justify-between mb-1 gap-1">
        {fullNavigation && <Navigation />}
        {searchBar && <SearchInput />}
        {fullNavigation && <MenuButton icon={<IoMdAdd />} hotkey="Shift+A" />}
      </div>
      {isSearch ? <SearchedItems /> : <ItemContent />}
    </div>
  );
};

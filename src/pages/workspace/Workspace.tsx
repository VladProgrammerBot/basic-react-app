import { IoMdAdd } from "react-icons/io";
import { ItemContent } from "./Components/ItemContent";
import { SearchedItems } from "./Components/SearchedItems";
import { SearchInput } from "./Components/SearchInput";
import { MenuButton } from "./ui-elements/MenuButton";
import { Navigation } from "./Components/Navigation";
import { Bar } from "./Components/Bar";
import { Input } from "./ui-elements/Input";
import store from "@/state/store";
import { useFolderManipulation } from "@/hooks/folders/useItemMenu";
import { useKeyboardShortcuts } from "@/hooks/folders/useKeyboard";

export const Workspace = () => {
  const mode = store.use.mode();
  const isStyled = store.use.isStyled();
  const isSearch = mode === "Filter" || mode === "Filter Result";
  const fullNavigation = isStyled && !isSearch;
  const searchBar = isStyled || isSearch;
  const { addUnrelatedFolder } = useFolderManipulation();
  useKeyboardShortcuts();

  return (
    <>
      <div className="flex justify-between mb-1 gap-1">
        {fullNavigation && <Navigation />}
        {searchBar && <SearchInput />}
        {fullNavigation && <MenuButton icon={<IoMdAdd />} hotkey="Shift+A" />}
        <Bar />
      </div>
      {mode === "Add Unrelated Folder" ? (
        <Input 
          mode="Add Unrelated Folder"
          submitFunction={addUnrelatedFolder}
          placeholder="Add unrelated folder"
          hotkey="U"
          setModeOnFocus="Add Unrelated Folder"
          setModeOnBlur="normal"
        />
      ) : (
        isSearch ? <SearchedItems /> : <ItemContent />
      )}
    </>
  );
};

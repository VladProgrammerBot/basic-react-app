import { SearchedItems } from "./Components/SearchedItems";
import { ItemContent } from "./Components/ItemContent";
import { Header } from "./Components/Header";
import { Input } from "./ui-elements/Input";
import store from "@/state/store";
import { useFolderManipulation } from "@/hooks/folders/useItemMenu";
import { useKeyboardShortcuts } from "@/hooks/folders/useKeyboard";

export const Workspace = () => {
  const mode = store.use.mode();
  const isSearch = mode === "Filter" || mode === "Filter Result";
  const { addUnrelatedFolder } = useFolderManipulation();
  useKeyboardShortcuts();

  return (
    <>
      <Header />
      <div className={"mt-13"}>
        {mode === "Add Unrelated Folder" ? (
          <Input
            mode="Add Unrelated Folder"
            submitFunction={addUnrelatedFolder}
            placeholder="Add unrelated folder"
            setModeOnFocus="Add Unrelated Folder"
            setModeOnBlur="normal"
          />
        ) : isSearch ? (
          <SearchedItems />
        ) : (
          <ItemContent />
        )}
      </div>
    </>
  );
};

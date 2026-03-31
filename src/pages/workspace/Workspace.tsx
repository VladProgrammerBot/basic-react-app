import { SearchedItems } from "./Components/SearchedItems";
import { ItemContent } from "./Components/ItemContent";
import { Header } from "./Components/Header";
import { Input } from "./ui-elements/ItemInput";
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
      <div className="mt-14 lg:mt-12">
        {mode === "Add Unrelated Folder" ? (
          <Input
          submitFunction={addUnrelatedFolder}
          placeholder="Add unrelated folder"
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

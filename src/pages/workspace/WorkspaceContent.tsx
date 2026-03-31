import { SearchedItems } from "./Components/SearchedItems";
import { ItemContent } from "./Components/ItemContent";
import { Input } from "./ui-elements/ItemInput";
import store from "@/state/store";
import { useWorkspaceContent } from "@/hooks/folders/useWorkspaceContent";

export const WorkspaceContent = () => {
  const mode = store.use.mode();
  const isSearchMode = mode === "Filter" || mode === "Filter Result";
  const isAddNoteMode = mode === "Add Unrelated Folder";
  const { addUnrelatedFolder } = useWorkspaceContent();

  return (
    <div className="mt-14 lg:mt-12">
      {isAddNoteMode ? (
        <Input
          submitFunction={addUnrelatedFolder}
          placeholder="Add unrelated folder"
        />
      ) : isSearchMode ? (
        <SearchedItems />
      ) : (
        <ItemContent />
      )}
    </div>
  );
};
import { Item } from "./Item";
import { useFolders } from "@/hooks/folders/useFolders";
import { useKeyboard } from "@/hooks/folders/useKeyboard";
import { Buttons } from "./buttons/Buttons";
import store from "@/state/store";
import { SearchInput } from "./buttons/SearchInput";

export const Folders = () => {
  const { childrensData } = useFolders();
  const mode = store.use.mode();
  const filteredElements = store.use.filteredElements();

  useKeyboard();

  const elements = mode === "Filter" ? filteredElements : childrensData;

  return (
    <div
      className={`h-fit mt-13.5 pb-[50vh] space-y-1 max-w-4xl mx-auto max-lg:px-2 border-neutral-300 dark:border-neutral-700`}
    >
      {mode === "Filter" && <SearchInput />}
      {elements.map((data, index) => {
        return <Item key={data.id} data={data} index={index} />;
      })}

      <Buttons />
    </div>
  );
};

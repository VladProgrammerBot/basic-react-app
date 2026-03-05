import { Item } from "./Item";
import { useFolders } from "@/hooks/folders/useFolders";
import { Buttons } from "./buttons/Buttons";
import store from "@/state/store";
import { SearchInput } from "./buttons/SearchInput";

export const Folders = () => {
  const { elements, isUserSearching } = useFolders();

  return (
    <div
      className={`h-fit mt-13.5 pb-[50vh] space-y-1 max-w-4xl mx-auto max-lg:px-2 border-neutral-300 dark:border-neutral-700`}
    >
      {isUserSearching && <SearchInput />}
      {elements.map((data: folder, index) => {
        return <Item key={data.id} data={data} index={index} />;
      })}
      <Buttons />
    </div>
  );
};

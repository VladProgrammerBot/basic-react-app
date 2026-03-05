import { Item } from "./Item";
import { useFolders } from "@/hooks/folders/useFolders";
import { Buttons } from "./Buttons";
import { SearchInput } from "./SearchInput";

export const Folders = () => {
  const { childrensData, isUserSearching } = useFolders();

  return (
    <div
      className={`h-fit mt-13.5 pb-[50vh] space-y-1 max-w-4xl mx-auto max-lg:px-2 border-neutral-300 dark:border-neutral-700`}
    >
      {isUserSearching && <SearchInput />}
      {childrensData.map((data: folder, index: number) => {
        return <Item key={data.id} data={data} index={index} />;
      })}
      <Buttons />
    </div>
  );
};

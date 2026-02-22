import { Item } from "./Item";
import { useFolders } from "@/hooks/folders/useFolders";
import { useKeyboard } from "@/hooks/folders/useKeyboard";
import { Buttons } from "./buttons/Buttons";

export const Folders = () => {
  const { childrensData,  } = useFolders();

  useKeyboard();

  return (
    <div
      className={`h-fit mt-13.5 pb-[50vh] space-y-1 max-w-4xl mx-auto max-lg:px-2 border-neutral-300 dark:border-neutral-700`}
    >
      {childrensData?.map((data, index) => {
        return <Item key={data.id} data={data} index={index} />;
      })}

      <Buttons />
    </div>
  );
};

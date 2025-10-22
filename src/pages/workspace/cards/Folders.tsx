import { useOutsideClick } from "@/hooks/useOutsideClick";
import { SortableItem } from "./SortableItem";
import { useFolders } from "@/hooks/useFolders";

export const Folders = () => {
  const wrapperRef = useOutsideClick();
  const { childrensData } = useFolders()

  return (
    <div className="space-y-2 h-fit mb-[90vh]" ref={wrapperRef}>
      {childrensData?.map((data, index: number) => {
        return <SortableItem key={data.id} data={data} folderIndex={index} />;
      })}
      <div className="w-full min-h-14 border-2 border-neutral-800 rounded-4xl flex justify-center items-center text-neutral-700 cursor-pointer duration-150 hover:text-neutral-600 hover:border-neutral-700">+ New</div>
    </div>
  );
};

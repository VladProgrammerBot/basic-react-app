import { useOutsideClick } from "@/hooks/useOutsideClick";
import { SortableItem } from "./SortableItem";
import { useFolders } from "@/hooks/useFolders";

export const Folders = () => {
  const wrapperRef = useOutsideClick();
  const { childrensData } = useFolders()

  return (
    <div className="border-t-1 border-neutral-800 h-fit" ref={wrapperRef}>
      {childrensData?.map((data, index: number) => {
        return <SortableItem key={data.id} data={data} folderIndex={index} />;
      })}
    </div>
  );
};

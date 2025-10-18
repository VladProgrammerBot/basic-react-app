import { useOutsideClick } from "@/hooks/useOutsideClick";
import { SortableItem } from "./SortableItem";
import { useFolders } from "@/hooks/useFolders";

export const Folders = () => {
  const wrapperRef = useOutsideClick();
  const { childrensData } = useFolders()

  return (
    <div className="border-t-1 border-neutral-700 h-fit mb-12" ref={wrapperRef}>
      {childrensData?.map((data, index: number) => {
        return <SortableItem key={data.id} data={data} folderIndex={index} />;
      })}
    </div>
  );
};

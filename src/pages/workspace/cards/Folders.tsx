import { useOutsideClick } from "@/hooks/useOutsideClick";
import { SortableItem } from "./SortableItem";
import { useFolders } from "@/hooks/useFolders";
import { ItemLayout } from "./ItemLayout";
import stateFolders from "@/state/stateFolders";
import { InputForm } from "./InputForm";

export const Folders = () => {
  const wrapperRef = useOutsideClick();
  const { childrensData } = useFolders()
  const { setMode, mode } = stateFolders()

  return (
    <div className="space-y-2 h-fit mb-[60vh]" ref={wrapperRef}>
      {childrensData?.map((data, index: number) => {
        return <SortableItem key={data.id} data={data} folderIndex={index} />;
      })}

      <ItemLayout>
        {mode === "normal" ? (
          <div onClick={() => setMode("Add Folder")} className="w-full h-14 flex justify-center items-center text-neutral-700 hover:text-neutral-500">
            + New
          </div>
        ) : (
          <InputForm />
        )}
      </ItemLayout>
    </div>
  );
};

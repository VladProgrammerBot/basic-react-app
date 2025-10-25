import { useOutsideClick } from "@/hooks/useOutsideClick";
import { Item } from "./Item";
import { useFolders } from "@/hooks/useFolders";
import { ItemLayout } from "./ItemLayout";
import { InputForm } from "./InputForm";
import store from "@/state/store";

export const Folders = () => {
  const wrapperRef = useOutsideClick();
  const { childrensData } = useFolders()
  const setMode = store(state => state.setMode)
  const mode = store(state => state.mode)

  return (
    <div className="space-y-2 h-fit pb-[60vh]" ref={wrapperRef}>
      {childrensData?.map((data) => {
        return <Item key={data.id} data={data} />;
      })}

      <ItemLayout className="px-2">
        {mode === "normal" ? (
          <div onClick={() => setMode("Add Folder")} className="w-full h-14 flex justify-center items-center text-neutral-400 hover:text-neutral-500 dark:text-neutral-700 dark:hover:text-neutral-500">
            + New
          </div>
        ) : (
          <InputForm />
        )}
      </ItemLayout>
    </div>
  );
};

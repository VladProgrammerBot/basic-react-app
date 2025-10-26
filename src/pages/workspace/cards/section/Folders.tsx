import { useOutsideClick } from "@/hooks/useOutsideClick";
import { Item } from "./Item";
import { useFolders } from "@/hooks/useFolders";
import { ItemLayout } from "./ItemLayout";
import { InputForm } from "./InputForm";
import store from "@/state/store";

export const Folders = () => {
  const wrapperRef = useOutsideClick();
  const { childrensData, addFolder, moveFolder } = useFolders()
  const setMode = store(state => state.setMode)
  const mode = store(state => state.mode)
  const moveBuffer = store.use.moveBuffer()

  return (
    <div className="space-y-2 h-fit pb-[60vh]" ref={wrapperRef}>
      {childrensData?.map((data) => {
        return <Item key={data.id} data={data} />;
      })}

      {moveBuffer && (
        <ItemLayout onClick={moveFolder} className="w-full h-14 flex justify-center items-center text-neutral-400 hover:text-neutral-500 dark:text-neutral-700 dark:hover:text-neutral-500">
          Paste
        </ItemLayout>
      )}
      <ItemLayout>
        {mode === "normal" ? (
          <div onClick={() => setMode("Add Folder")} className="w-full h-14 flex justify-center items-center text-neutral-400 hover:text-neutral-500 dark:text-neutral-700 dark:hover:text-neutral-500">
            + New
          </div>
        ) : (
          <InputForm submitTitle="+ Add" cancelFunc={() => setMode("normal")} submitFunc={addFolder} />
        )}
      </ItemLayout>
    </div>
  );
};

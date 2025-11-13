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
  const path = store.use.path()

  return (
    <div className="h-fit mt-16 dark:mt-13 rounded-3xl bg-white shadow-sm shadow-neutral-400 dark:shadow-none dark:bg-neutral-900 overflow-hidden" ref={wrapperRef}>
      {childrensData?.map((data) => {
        return <Item key={data.id} data={data} />;
      })}

      {moveBuffer && moveBuffer.parent !== path[path.length - 1].id && moveBuffer.id !== path[path.length - 1].id && (
        <ItemLayout onClick={moveFolder} className="w-full h-14 flex justify-center items-center opacity-50 hover:opacity-100">
          Paste
        </ItemLayout>
      )}
      <ItemLayout className="border-none">
        {mode === "normal" ? (
          <div onClick={() => setMode("Add Folder")} className="cursor-pointer w-full h-14 flex justify-center items-center hover:text-neutral-800 dark:hover:text-white text-neutral-500 duration-150">
            + New
          </div>
        ) : (
          <InputForm submitTitle="+ Add" cancelFunc={() => setMode("normal")} submitFunc={addFolder} />
        )}
      </ItemLayout>
    </div>
  );
};

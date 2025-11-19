import { Item } from "./Item";
import { useFolders } from "@/hooks/folders/useFolders";
import { ItemLayout } from "./ItemLayout";
import { InputForm } from "./InputForm";
import store from "@/state/store";
import { useFolderManipulation } from "@/hooks/folders/useItemMenu";

export const Folders = () => {
  const { childrensData, moveFolder } = useFolders()
  const { addFolder } = useFolderManipulation()
  const setMode = store(state => state.setMode)
  const mode = store(state => state.mode)
  const moveBuffer = store.use.moveBuffer()
  const path = store.use.path()

  return (
    <div className="h-fit mt-[53px] rounded-md border-1 border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-900 overflow-hidden">

      {childrensData?.map((data) => {
        return (
          <Item key={data.id} data={data} />
        )
      })}

      {moveBuffer && moveBuffer.parent !== path[path.length - 1].id && moveBuffer.id !== path[path.length - 1].id && (
        <ItemLayout filled onClick={moveFolder} className="w-full h-14 flex justify-center items-center hover:text-neutral-500 dark:hover:text-white text-neutral-400">
          Paste
        </ItemLayout>
      )}
      <ItemLayout className="border-none">
        {mode === "normal" ? (
          <div onClick={() => setMode("Add Folder")} className="cursor-pointer w-full hover:bg-neutral-200 dark:hover:bg-neutral-800 h-14 flex justify-center items-center hover:text-neutral-500 dark:hover:text-white text-neutral-400 duration-150">
            + Add Folder
          </div>
        ) : (
          <InputForm submitTitle="+ Add" cancelFunc={() => setMode("normal")} submitFunc={addFolder} />
        )}
      </ItemLayout>
    </div>
  );
};

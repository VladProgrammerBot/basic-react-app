import { Item } from "./Item";
import { useFolders } from "@/hooks/folders/useFolders";
import { ItemLayout } from "./ItemLayout";
import { InputForm } from "./InputForm";
import store from "@/state/store";
import { useFolderManipulation } from "@/hooks/folders/useItemMenu";
import { Button } from "@/components/ui/button";
import { RiGeminiFill } from "react-icons/ri";

export const Folders = () => {
  const { childrensData, moveFolder } = useFolders()
  const { addFolder } = useFolderManipulation()
  const setMode = store(state => state.setMode)
  const mode = store(state => state.mode)
  const moveBuffer = store.use.moveBuffer()
  const path = store.use.path()
  const isStart = childrensData.length > 0 || mode === "Add Folder"
  return (
    <div>
      <div className={`h-fit mt-13 rounded-md ${isStart && "border-1"} border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-900 overflow-hidden`}>
        {childrensData?.map((data, index) => {
          return (
            <Item key={data.id} data={data} index={index} />
          )
        })}

        {moveBuffer && moveBuffer.parent !== path[path.length - 1].id && moveBuffer.id !== path[path.length - 1].id && (
          <ItemLayout filled onClick={moveFolder} className="w-full h-14 flex justify-center items-center hover:text-neutral-500 dark:hover:text-white text-neutral-400">
            Paste
          </ItemLayout>
        )}
        {mode === "Add Folder" && (
          <InputForm submitTitle="+ Add" cancelFunc={() => setMode("normal")} submitFunc={addFolder} />
        )}
      </div>
      <ItemLayout className="border-none">
        {mode === "normal" && (
          <div className={`flex w-full justify-between items-center gap-2 ${isStart && "py-2"}`}>
            <Button variant={"outline"} className="flex-1 min-w-fit" onClick={() => setMode("Add Folder")}>+ Add</Button>
            <Button variant={"outline"} className="flex-1 min-w-fit"><RiGeminiFill />Generate</Button>
          </div>
        )}
      </ItemLayout>
    </div>
  );
};

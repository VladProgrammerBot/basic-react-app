import { Item } from "./Item";
import { useFolders } from "@/hooks/folders/useFolders";
import { ItemLayout } from "./ItemLayout";
import { InputForm } from "./InputForm";
import store from "@/state/store";
import { useFolderManipulation } from "@/hooks/folders/useItemMenu";
import { RiGeminiFill } from "react-icons/ri";
import { Button } from "@/components/ui/button";

export const Folders = () => {
  const { childrensData, moveFolder, generateFolders } = useFolders()
  const { addFolder } = useFolderManipulation()
  const setMode = store(state => state.setMode)
  const mode = store.use.mode()
  const moveBuffer = store.use.moveBuffer()
  const path = store.use.path()
  const isStart = childrensData.length > 0 || mode !== "normal"
  const isPaste = moveBuffer && moveBuffer.parent !== path[path.length - 1].id && moveBuffer.id !== path[path.length - 1].id

  return (
    <div>
      <div className={`h-fit mt-13 rounded-md border-1 border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-900 overflow-hidden`}>
        {childrensData?.map((data, index) => {
          return (
            <Item key={data.id} data={data} index={index} />
          )
        })}

        {isPaste && (
          <ItemLayout filled onClick={moveFolder} className={`${!isStart && "border-none"} w-full h-14 flex justify-center items-center hover:text-neutral-500 dark:hover:text-white text-neutral-400`}>
            Paste
          </ItemLayout>
        )}
        {mode === "Add Folder" && (
          <InputForm submitTitle="+ Add" cancelFunc={() => setMode("normal")} submitFunc={addFolder} />
        )}
        {mode === "AI Generate" && (
          <InputForm placeholder="Enter your prompt" submitTitle="Generate" cancelFunc={() => setMode("normal")} submitFunc={(value) => {
            generateFolders(value)
          }} />
        )}
        {mode === "normal" && (
          <ItemLayout className={`${!isStart && !isPaste && "border-none"} flex w-full justify-between items-center items-stretch`}>
            {mode === "normal" && (
              <>
                <Button variant={"outline"} className="flex-1 min-w-fit rounded-none border-0 border-r-1 flex gap-2 items-center justify-center cursor-pointer duration-150" onClick={() => setMode("Add Folder")}>
                  <p>+ Add</p>
                </Button>
                <Button variant={"outline"} className="flex-1 min-w-fit rounded-none border-none flex gap-2 items-center justify-center cursor-pointer duration-150" onClick={() => setMode("AI Generate")}><RiGeminiFill />Generate</Button>
              </>
            )}
          </ItemLayout>
        )}
      </div>
    </div>
  );
};

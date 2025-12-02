import { Item } from "./Item";
import { useFolders } from "@/hooks/folders/useFolders";
// import { ItemLayout } from "./ItemLayout";
import { InputForm } from "./InputForm";
import store from "@/state/store";
import { useFolderManipulation } from "@/hooks/folders/useItemMenu";
import { RiGeminiFill } from "react-icons/ri";
import { FaPaste } from "react-icons/fa";
import { usePath } from "@/hooks/folders/usePath";
import { BsPlus } from "react-icons/bs";
// import { Button } from "@/components/ui/button";

export const Folders = () => {
  const { childrensData, generateFolders } = useFolders()
  const { addFolder } = useFolderManipulation()
  const setMode = store(state => state.setMode)
  const mode = store.use.mode()
  const { moveFolder } = usePath()
  const isStart = childrensData.length > 0 || mode !== "normal"
  const moveBuffer = store.use.moveBuffer()

  return (
    <div className={`h-fit mt-10 ${isStart && "border-"} bg-whit border-neutral-300 dark:border-neutral-700 overflow-hidden`}>
      {childrensData?.map((data, index) => {
        return (
          <Item key={data.id} data={data} index={index} />
        )
      })}

      {/* {isPaste && (
          <ItemLayout filled onClick={moveFolder} className={`${!isStart && "border-none"} w-full h-14 flex justify-center items-center hover:text-neutral-500 dark:hover:text-white text-neutral-400`}>
            Paste
          </ItemLayout>
        )} */}
      {mode === "Add Folder" && (
        <InputForm submitTitle="+ Add" cancelFunc={() => setMode("normal")} submitFunc={addFolder} />
      )}
      {mode === "AI Generate" && (
        <InputForm placeholder="Enter your prompt" submitTitle="Generate" cancelFunc={() => setMode("normal")} submitFunc={(value) => {
          generateFolders(value)
        }} />
      )}
      {/* {mode === "normal" && (
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
        )} */}
      {mode === "normal" && <div className="mt-2 flex">{[
        {
          title: "Add",
          icon: <BsPlus fontSize={25} />,
          func: () => setMode("Add Folder"),
          cond: true
        },
        {
          title: "Generate",
          icon: <RiGeminiFill />,
          func: () => setMode("AI Generate"),
          cond: true
        },
        {
          title: "Paste",
          icon: <FaPaste />,
          func: moveFolder,
          cond: moveBuffer
        }
      ].map((button, index) => {
        if (button.cond) {

          return (
            <button key={index} onClick={button.func} className={`flex-1 flex items-center justify-center text-center gap-1 py-2 px-4 ${index !== 0 && "border-l-1"} border-neutral-200 hover:text-black dark:border-neutral-800 cursor-pointer duration-150 text-neutral-500 hover:bg-neutral-200 dark:hover:text-white dark:hover:bg-neutral-800`}>
              {button.icon} {button.title}
            </button>
          )
        } else {
          return ""
        }
      })}</div>}
    </div>
  );
};

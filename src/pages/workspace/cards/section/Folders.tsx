import { Item } from "./Item";
import { useFolders } from "@/hooks/folders/useFolders";
import { InputForm } from "./InputForm";
import store from "@/state/store";
import { useFolderManipulation } from "@/hooks/folders/useItemMenu";
import { RiGeminiFill } from "react-icons/ri";
import { FaPaste } from "react-icons/fa";
import { usePath } from "@/hooks/folders/usePath";
import { BsPlus } from "react-icons/bs";

export const Folders = () => {
  const { childrensData, generateFolders } = useFolders()
  const { addFolder } = useFolderManipulation()
  const setMode = store(state => state.setMode)
  const mode = store.use.mode()
  const { moveFolder } = usePath()
  const moveBuffer = store.use.moveBuffer()

  return (
    <div className={`h-fit mt-11 sm:mt-13 border-neutral-300 dark:border-neutral-700`}>
      <div className="rounded-md overflow-hidden">
        {childrensData?.map((data, index) => {
          return (
            <Item key={data.id} data={data} index={index} />
          )
        })}
      </div>

      {mode === "Add Folder" && (
        <InputForm submitTitle="+ Add" cancelFunc={() => setMode("normal")} submitFunc={addFolder} />
      )}
      {mode === "AI Generate" && (
        <InputForm placeholder="Enter your prompt" submitTitle="Generate" cancelFunc={() => setMode("normal")} submitFunc={(value) => {
          generateFolders(value)
        }} />
      )}
      {mode === "normal" && <div className="mt-2 flex gap-2 max-md:px-2">{[
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
            <button key={index} onClick={button.func} className={`flex-1 rounded-md flex items-center justify-center text-center gap-1 py-2 px-4 border-1 border-neutral-200 hover:text-black dark:border-neutral-800 cursor-pointer duration-150 text-neutral-500 hover:bg-neutral-200 dark:hover:text-white dark:hover:bg-neutral-800`}>
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

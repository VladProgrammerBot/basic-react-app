import { Item } from "./Item";
import { useFolders } from "@/hooks/folders/useFolders";
import { InputForm } from "./InputForm";
import store from "@/state/store";
import { useFolderManipulation } from "@/hooks/folders/useItemMenu";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { useKeyboard } from "@/hooks/folders/useKeyboard";
import { Button } from "@/components/ui/button";

export const Folders = () => {
  const { childrensData, generateFolders, buttons } = useFolders()
  const { addFolder } = useFolderManipulation()
  const setMode = store(state => state.setMode)
  const mode = store.use.mode()

  useKeyboard()

  return (
    <div className={`h-fit mt-13 border-neutral-300 dark:border-neutral-700`}>
      {childrensData?.map((data, index) => {
        return (
          <Item key={data.id} data={data} index={index} />
        )
      })}
      {mode === "Add Folder" && (
        <InputForm submitTitle="+ Add" cancelFunc={() => setMode("normal")} submitFunc={addFolder} />
      )}
      {mode === "AI Generate" && (
        <InputForm placeholder="Enter your prompt" submitTitle="Generate" cancelFunc={() => setMode("normal")} submitFunc={(value) => {
          generateFolders(value)
        }} />
      )}
      {mode === "normal" && <div className="mt-2 flex gap-2 max-md:px-2">{buttons.map((button, index) => {
        if (button.cond) {
          return (
            <Tooltip key={index}>
              <TooltipTrigger asChild className="flex-1" onClick={button.func} >
                <Button className="w-full">
                  {button.icon} {button.title}
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                {button.Hotkeys}
              </TooltipContent>
            </Tooltip>
          )
        } else {
          return ""
        }
      })}</div>}
    </div>
    
  );
};
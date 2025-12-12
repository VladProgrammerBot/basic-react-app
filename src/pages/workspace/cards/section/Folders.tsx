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
              <TooltipTrigger className="flex-1" onClick={button.func} >
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
      {/* <button className="flex items-center px-5 py-2 text-sm font-bold uppercase tracking-widest bg-neon-cyan text-gray-900 border-2 border-cyan-400 rounded-sm shadow-xl hover:bg-cyan-400 transition-all duration-300 action-btn glow-effect">
            <svg viewBox="0 0 24 24" className="w-5 h-5 mr-3" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <line x1="12" y1="5" x2="12" y2="19"></line>
                <line x1="5" y1="12" x2="19" y2="12"></line>
            </svg>
            <span className="btn-text">НОВИЙ ЕЛЕМЕНТ</span>
        </button> */}
    </div>
    
  );
};
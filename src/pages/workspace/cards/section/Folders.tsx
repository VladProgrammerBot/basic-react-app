import { Item } from "./Item";
import { useFolders } from "@/hooks/folders/useFolders";
import { InputForm } from "./InputForm";
import store from "@/state/store";
import { useFolderManipulation } from "@/hooks/folders/useItemMenu";
import { useKeyboard } from "@/hooks/folders/useKeyboard";
import { Button } from "@/components/ui/button";

export const Folders = () => {
  const { childrensData, generateFolders } = useFolders();
  const { addFolder } = useFolderManipulation();
  const setMode = store((state) => state.setMode);
  const mode = store.use.mode();

  useKeyboard();

  return (
    <div
      className={`h-fit mt-13 mb-[50vh] space-y-1 max-md:px-2 border-neutral-300 dark:border-neutral-700`}
    >
      {childrensData?.map((data, index) => {
        return <Item key={data.id} data={data} index={index} />;
      })}
      {mode === "Add Folder" && (
        <InputForm
          submitTitle="+ Add"
          cancelFunc={() => setMode("normal")}
          submitFunc={addFolder}
        />
      )}
      {mode === "AI Generate" && (
        <InputForm
          placeholder="Enter your prompt"
          submitTitle="Generate"
          cancelFunc={() => setMode("normal")}
          submitFunc={(value) => {
            generateFolders(value);
          }}
        />
      )}
      {/* {mode === "normal" && (
        <div className={`flex gap-1`}>
          {buttons.map((button, index) => {
            if (button.cond) {
              return (
                <Tooltip key={index}>
                  <TooltipTrigger asChild onClick={button.func}>
                    <Button variant="outline" size={"icon"} className="py-3 md:py-2 relative">
                      {button.icon} {button.title}
                      {!button.title && currentStep === 2 && (
                        <Tip className="left-2 items-start" text="Click to add new paragraph" />
                      )}
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>{button.Hotkeys}</TooltipContent>
                </Tooltip>
              );
            } else {
              return "";
            }
          })}
        </div>
      )} */}
      {/* <div className="border-b-1 border-neutral-700 w-full my-4"></div> */}
      {mode === "normal" && (
        <Button onClick={() => setMode("Add Folder")} variant={"outline"} className="w-full max-md:py-3">
          + New note
        </Button>
      )}
    </div>
  );
};

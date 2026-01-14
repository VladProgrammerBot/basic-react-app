import { Item } from "./Item";
import { useFolders } from "@/hooks/folders/useFolders";
import { InputForm } from "./InputForm";
import store from "@/state/store";
import { useFolderManipulation } from "@/hooks/folders/useItemMenu";
import { useKeyboard } from "@/hooks/folders/useKeyboard";
import { Button } from "@/components/ui/button";
import { FaPaste } from "react-icons/fa";
import { usePath } from "@/hooks/folders/usePath";

export const Folders = () => {
  const { childrensData, generateFolders } = useFolders();
  const { addFolder } = useFolderManipulation();
  const setMode = store((state) => state.setMode);
  const mode = store.use.mode();
  const renameBuffer = store.use.renameBuffer();
  const { moveFolder } = usePath();
  const moveBuffer = store.use.moveBuffer();

  useKeyboard();

  return (
    <div
      className={`h-fit mt-13 mb-[50vh] space-y-1 max-md:px-2 border-neutral-300 dark:border-neutral-700`}
    >
      {childrensData?.map((data, index) => {
        return <Item key={data.id} data={data} index={index} />;
      })}
      {mode === "Add Folder" && (
        <div className="border-1 dark:border-neutral-700 border-neutral-300 rounded-md">
          <InputForm
            submitTitle="+ Add"
            cancelFunc={() => setMode("normal")}
            submitFunc={addFolder}
          />
        </div>
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
      {!moveBuffer && mode === "normal" && renameBuffer === null && (
        <Button
          onClick={() => setMode("Add Folder")}
          variant={"outline"}
          className="w-full max-md:py-3"
        >
          + New note
        </Button>
      )}
      {moveBuffer && (
        <Button
          onClick={moveFolder}
          variant={"outline"}
          className="w-full max-md:py-3"
        >
          <FaPaste /> Paste
        </Button>
      )}
    </div>
  );
};

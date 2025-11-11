import { useOutsideClick } from "@/hooks/useOutsideClick";
import { Item } from "./Item";
import { useFolders } from "@/hooks/folders/useFolders";
import { ItemLayout } from "./ItemLayout";
import { InputForm } from "./InputForm";
import store from "@/state/store";
import { Button } from "@/components/ui/button";

export const Folders = () => {
  const wrapperRef = useOutsideClick();
  const { childrensData, addFolder, moveFolder, copyStructureToClipboard, importData } = useFolders()
  const setMode = store(state => state.setMode)
  const mode = store(state => state.mode)
  const moveBuffer = store.use.moveBuffer()
  const path = store.use.path()

  return (
    <div className="space-y-2 h-fit pt-15" ref={wrapperRef}>
      {childrensData?.map((data) => {
        return <Item key={data.id} data={data} />;
      })}

      {moveBuffer && moveBuffer.parent !== path[path.length - 1].id && moveBuffer.id !== path[path.length - 1].id && (
        <ItemLayout onClick={moveFolder} className="w-full h-14 flex justify-center items-center text-neutral-400 hover:text-neutral-500 dark:text-neutral-700 dark:hover:text-neutral-500">
          Paste
        </ItemLayout>
      )}
      <ItemLayout>
        {mode === "normal" ? (
          <div onClick={() => setMode("Add Folder")} className="w-full h-14 flex justify-center items-center text-neutral-400 hover:text-neutral-500 dark:text-neutral-700 dark:hover:text-neutral-500">
            + New
          </div>
        ) : (
          <InputForm submitTitle="+ Add" cancelFunc={() => setMode("normal")} submitFunc={addFolder} />
        )}
      </ItemLayout>
      <Button onClick={copyStructureToClipboard}>copy</Button>
      <Button onClick={importData}>paste</Button>
    </div>
  );
};

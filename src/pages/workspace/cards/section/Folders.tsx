import { useOutsideClick } from "@/hooks/useOutsideClick";
import { Item } from "./Item";
import { useFolders } from "@/hooks/useFolders";
import { ItemLayout } from "./ItemLayout";
import { InputForm } from "./InputForm";
import store from "@/state/store";

export const Folders = () => {
  const wrapperRef = useOutsideClick();
  const { childrensData, addFolder, moveFolder } = useFolders()
  const setMode = store(state => state.setMode)
  const mode = store(state => state.mode)
  const moveBuffer = store.use.moveBuffer()
  const path = store.use.path()

  return (
    <div className="h-fit mt-15 rounded-3xl bg-neutral-800/50 overflow-hidden" ref={wrapperRef}>
      {childrensData?.map((data) => {
        return <Item key={data.id} data={data} />;
      })}

      {moveBuffer && moveBuffer.parent !== path[path.length - 1].id && moveBuffer.id !== path[path.length - 1].id && (
        <ItemLayout onClick={moveFolder} className="w-full h-14 flex justify-center items-center opacity-50 hover:opacity-100">
          Paste
        </ItemLayout>
      )}
      <ItemLayout className="border-none">
        {mode === "normal" ? (
          <div onClick={() => setMode("Add Folder")} className="w-full h-14 flex justify-center items-center text-neutral-400 text-white opacity-30 hover:opacity-100 duration-300">
            + New
          </div>
        ) : (
          <InputForm submitTitle="+ Add" cancelFunc={() => setMode("normal")} submitFunc={addFolder} />
        )}
      </ItemLayout>
    </div>
  );
};

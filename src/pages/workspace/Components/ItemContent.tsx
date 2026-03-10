import { ConnectedItem } from "./ConnectedItem";
import { TipForRelated } from "./TipForRelated";
import { Input } from "../ui-elements/ItemInput";
import { ItemTitle } from "./ItemTitle";
import { useFolders } from "@/hooks/folders/useFolders";
import store from "@/state/store";
import { IoMdAdd } from "react-icons/io";
import { Hotkey } from "../ui-elements/HotKeyTip";
import { useFolderManipulation } from "@/hooks/folders/useItemMenu";

export const ItemContent = () => {
  const designMode = store.use.designMode();
  const mode = store.use.mode();
  const setMode = store.use.setMode();
  const containterStyles =
    designMode !== "Minimalistic"
      ? "sm:rounded-xl sm:p-2 sm:bg-neutral-800"
      : "";

  const { childrensData } = useFolders();
  const { addFolder } = useFolderManipulation();

  return (
    <div className={containterStyles}>
      {designMode !== "Minimalistic" && <ItemTitle />}
      <TipForRelated />
      <ul className="flex flex-col gap-1 mt-2 mb-1">
        {childrensData.map((data, index) => (
          <ConnectedItem key={index} data={data} index={index} />
        ))}
      </ul>
      {mode === "Add Folder" && (
        <Input submitFunction={addFolder} placeholder="Add folder" />
      )}
      {designMode !== "Minimalistic" && mode === "normal" && (
        <button
          onClick={() => setMode("Add Folder")}
          className="w-full flex items-center justify-center text-neutral-500 duration-150 cursor-pointer border h-12 lg:h-10 rounded-xl border-neutral-600 border-dashed"
        >
          <IoMdAdd />
          <Hotkey is="A" />
        </button>
      )}
    </div>
  );
};

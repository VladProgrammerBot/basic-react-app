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
      ? "sm:rounded-xl m-0 p-0"
      : "";

  const { childrensData } = useFolders();
  const { addFolder } = useFolderManipulation();

  return (
    <div className={containterStyles}>
      {designMode !== "Minimalistic" && <ItemTitle />}
      <TipForRelated />
      <ul className="flex flex-col gap-1 mb-1">
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
          className="w-full text-neutral-400 gap-1 flex items-center justify-center duration-150 cursor-pointer h-12 lg:h-10 rounded-xl hover:bg-neutral-700"
        >
          <IoMdAdd /> Related item
          <Hotkey is="A" />
        </button>
      )}
    </div>
  );
};

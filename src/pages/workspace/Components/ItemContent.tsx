import { ConnectedItem } from "./ConnectedItem";
import { TipForRelated } from "./TipForRelated";
import { Input } from "../ui-elements/Input";
import { ItemTitle } from "./ItemTitle";
import { useFolders } from "@/hooks/folders/useFolders";
import store from "@/state/store";

export const ItemContent = () => {
  const designMode = store.use.designMode();
  const mode = store.use.mode();
  const containterStyles =
    designMode !== "Minimalistic" ? "rounded-xl p-2 bg-neutral-800" : "";

  const { childrensData } = useFolders();

  return (
    <div className={containterStyles}>
      {designMode !== "Minimalistic" && <ItemTitle />}
      <TipForRelated />
      <ul className="space-y-1 my-1">
        {childrensData.map((data, index) => (
          <ConnectedItem key={index} data={data} index={index} />
        ))}
      </ul>
      {(designMode !== "Minimalistic" || mode === "Add Folder") && (
        <Input hotkey="A" />
      )}
    </div>
  );
};

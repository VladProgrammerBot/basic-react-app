import { ConnectedItem } from "./ConnectedItem";
import { TipForRelated } from "./TipForRelated";
import { Input } from "../ui-elements/Input";
import { ItemTitle } from "./ItemTitle";
import { useFolders } from "@/hooks/folders/useFolders";

export const ItemContent = () => {
  const isMinimalist = false;
  const containterStyles = !isMinimalist
    ? "rounded-xl p-2 border border-neutral-700 bg-neutral-800"
    : "";

  const { childrensData } = useFolders();

  return (
    <div className={containterStyles}>
      <ItemTitle />
      <TipForRelated />
      <ul className="space-y-1 mt-1">
        {childrensData.map((data, index) => (
          <ConnectedItem key={index} data={data} index={index} />
        ))}
      </ul>
      {!isMinimalist && <Input hotkey="A" />}
    </div>
  );
};

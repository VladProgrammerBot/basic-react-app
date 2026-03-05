import store from "@/state/store";
import { ConnectedItem } from "./ConnectedItem";
import { TipForRelated } from "./TipForRelated";

export const SearchedItems = () => {
  const filteredElements = store.use.filteredElements();
  console.log(filteredElements)

  return (
    <ul className="space-y-1">
      <TipForRelated />
      {filteredElements.map((data, index) => {
        return (
            <ConnectedItem data={data} index={index} />
        );
      })}
    </ul>
  );
};

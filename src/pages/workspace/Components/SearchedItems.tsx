import store from "@/state/store";
import { ConnectedItem } from "./ConnectedItem";
import { TipForRelated } from "./TipForRelated";
import { useEffect } from "react";

export const SearchedItems = () => {
  const filteredElements = store.use.filteredElements();
  const setSelectedItemId = store.use.setSelectedItemId();

  useEffect(() => {
    setSelectedItemId(0);
  }, [setSelectedItemId]);

  return (
    <ul className="space-y-1">
      <TipForRelated />
      {filteredElements.map((data, index) => {
        return (
            <ConnectedItem key={data.id} data={data} index={index} />
        );
      })}
    </ul>
  );
};

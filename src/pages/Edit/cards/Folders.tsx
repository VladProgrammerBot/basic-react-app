import { useOutsideClick } from "@/hooks/useOutsideClick";
import { SortableItem } from "./SortableItem";

import foldersState from "@/state/stateFolders";

export const Folders = () => {
  const { childrens, select } = foldersState();
  const wrapperRef = useOutsideClick();

  return (
    <div
      className="border-t-1 border-neutral-800"
      ref={wrapperRef}
    >
      {childrens?.map((id: number) => {
        return <SortableItem key={id} id={id} select={select} />;
      })}
    </div>
  );
};

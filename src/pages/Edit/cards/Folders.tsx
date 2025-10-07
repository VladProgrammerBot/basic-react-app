import { useOutsideClick } from "@/hooks/useOutsideClick";
import { SortableItem } from "./SortableItem";

import foldersState from "@/state/stateFolders";
import { useMemo } from "react";

export const Folders = () => {
  const { childrensId, folders, path } = foldersState();
  const wrapperRef = useOutsideClick();

  const childrensData = useMemo(() => {
    const sortedChildrens = new Array(childrensId.length);
    folders.forEach((folder) => {
      if (folder.parent === path[path.length - 1].id) {
        sortedChildrens[childrensId.indexOf(folder.id)] = folder;
      }
    });
    // console.log(sortedChildrens);
    return sortedChildrens;
  }, [childrensId, folders, path]);

  return (
    <div className="border-x-1 border-t-1 border-neutral-800" ref={wrapperRef}>
      {childrensData.map((data, index: number) => {
        return <SortableItem key={data.id} data={data} folderIndex={index} />;
      })}
    </div>
  );
};

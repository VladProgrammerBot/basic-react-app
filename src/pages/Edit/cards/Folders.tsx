import { useOutsideClick } from "@/hooks/useOutsideClick";
import { SortableItem } from "./SortableItem";

import foldersState from "@/state/stateFolders";
import { useMemo } from "react";

export const Folders = () => {
  const { childrensId, folders, path } = foldersState();
  const wrapperRef = useOutsideClick();
  // console.log(1)

  const childrensData = useMemo(() => {
    const sortedChildrens = new Array(childrensId.length);
    const parent = path[path.length - 1].id
    // let tempChildrens = [] as number[]
    folders.forEach((folder) => {
      if (folder.parent === parent) {
        sortedChildrens[childrensId.indexOf(folder.id)] = folder;
      } else if (folder.id === parent) {
        // console.log(folder)
        // tempChildrens = folder.childrens
      }
    });
    // setChildrens(tempChildrens)

    return sortedChildrens;
  }, [childrensId, folders]);

  return (
    <div className="border-x-1 border-t-1 border-neutral-800 h-fit" ref={wrapperRef}>
      {childrensData.map((data, index: number) => {
        return <SortableItem key={data.id} data={data} folderIndex={index} />;
      })}
    </div>
  );
};

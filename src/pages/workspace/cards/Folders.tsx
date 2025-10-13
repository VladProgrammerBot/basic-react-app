import { useOutsideClick } from "@/hooks/useOutsideClick";
import { SortableItem } from "./SortableItem";

import foldersState from "@/state/stateFolders";
import { useEffect, useMemo } from "react";
import { useFolders } from "@/hooks/useFolders";

export const Folders = () => {
  const { childrensId, folders, path } = foldersState();
  const { setFirstState } = useFolders();
  const wrapperRef = useOutsideClick();

  const childrensData = useMemo(() => {
    const sortedChildrens = new Array(childrensId.length);
    const parent = path[path.length - 1]?.id;
    folders?.forEach((folder) => {
      if (folder.parent === parent) {
        sortedChildrens[childrensId.indexOf(folder.id)] = folder;
      }
    });

    return sortedChildrens;
  }, [childrensId, folders]);

  const getFolders = async () => {
    const api = import.meta.env.VITE_API_LOCAL;

    try {
      await fetch(api + "/folders", {
        method: "GET",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((res) => res.json())
        .then((data) => setFirstState(data));
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (folders.length === 0) {
      getFolders();
    }
  }, []);

  return (
    <div className="border-t-1 border-neutral-800 h-fit" ref={wrapperRef}>
      {childrensData?.map((data, index: number) => {
        return <SortableItem key={data.id} data={data} folderIndex={index} />;
      })}
    </div>
  );
};

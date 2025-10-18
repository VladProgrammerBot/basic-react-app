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
    const api = import.meta.env.VITE_API;

    try {
      await fetch(api + "/folders/get", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          token: localStorage.getItem("token")
        })
      })
        .then((res) => res.json())
        .then((data) => setFirstState(data));
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getFolders();
  }, []);

  return (
    <div className="border-t-1 border-neutral-800 h-fit" ref={wrapperRef}>
      {childrensData?.map((data, index: number) => {
        return <SortableItem key={data.id} data={data} folderIndex={index} />;
      })}
    </div>
  );
};

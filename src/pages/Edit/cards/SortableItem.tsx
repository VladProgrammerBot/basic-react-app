import { useFolders } from "@/hooks/useFolders";
import { useEffect, useState } from "react";
import { RiDeleteBinLine } from "react-icons/ri";
import stateFolders from "@/state/stateFolders";
import { BsThreeDotsVertical } from "react-icons/bs";
import { FaAngleDown, FaAngleUp } from "react-icons/fa";

export function SortableItem(props: {
  select: number | null;
  id: number;
  folderIndex: number;
}) {
  const { getFolderById, moveFolderVertical, moveInto } = useFolders();
  const [data, setData] = useState<folder>();
  const { openMenu, setMenuValue } = stateFolders();
  const itemStyles =
    "bg-neutral-800 hover:bg-neutral-700 duration-150 border-neutral-700 flex-1 flex gap-2 items-center justify-center";

  useEffect(() => {
    setData(getFolderById(props.id));
  }, []);

  return (
    <div
      className={`cursor-pointer shadow-neutral-900 relative justify-between border-b-1 border-neutral-800 flex`}
    >
      <div
        className={`flex py-2 relative items-center ${
          openMenu !== props.id && "hover:bg-neutral-800/80"
        } w-full duration-150`}
        onClick={() => {
          if (openMenu !== props.id) {
            setMenuValue(null);
            moveInto(props.id);
          }
        }}
        onContextMenu={() => setMenuValue(props.id)}
      >
        <div className="px-1 text-neutral-600 w-8 min-w-8 text-center">
          {data && data?.childrens.length > 0 && data.childrens.length}
        </div>
        <p
          className={`text-white duration-300 select-none ${
            openMenu === props.id && "opacity-50"
          }`}
        >
          {data?.title}
        </p>
        <div
          className={` w-0 min-w-0 duration-300 overflow-x-hidden flex absolute h-full right-0 text-white text-lg shadow-sm shadow-neutral-950 ${
            openMenu === props.id && "w-60 min-w-60"
          }`}
        >
          <div
            onClick={() => moveFolderVertical(props.folderIndex, -1)}
            className={itemStyles}
          >
            <FaAngleUp />
          </div>
          <div
            onClick={() => moveFolderVertical(props.folderIndex, 1)}
            className={itemStyles}
          >
            <FaAngleDown />
          </div>
          <div
            onClick={() => moveFolderVertical(props.folderIndex, -1)}
            className={itemStyles}
          >
            <RiDeleteBinLine />
          </div>
        </div>
      </div>
      <div
        onClick={() => setMenuValue(openMenu === props.id ? null : props.id)}
        className="text-lg text-white hover:bg-neutral-800 border-l-1 border-neutral-800 duration-150 flex items-center px-1"
      >
        <BsThreeDotsVertical />
      </div>
    </div>
  );
}

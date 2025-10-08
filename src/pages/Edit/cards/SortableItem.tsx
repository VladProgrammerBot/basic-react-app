import { useFolders } from "@/hooks/useFolders";
import { RiDeleteBinLine } from "react-icons/ri";
import stateFolders from "@/state/stateFolders";
import { BsThreeDotsVertical } from "react-icons/bs";
import { FaAngleDown, FaAngleUp } from "react-icons/fa";
import { IoAddOutline, IoAirplane } from "react-icons/io5";

export function SortableItem({
  data,
  folderIndex,
}: {
  data: folder;
  folderIndex: number;
}) {
  const { moveFolderVertical, moveInto, removeFolder } = useFolders();
  const { openMenu, setMenuValue } = stateFolders();
  const itemStyles =
    "bg-neutral-800 hover:bg-neutral-700 duration-150 border-neutral-700 flex-1 flex gap-2 items-center justify-center";

  return (
    <div
      className={`cursor-pointer shadow-neutral-900 relative justify-between border-b-1 border-neutral-800 flex`}
    >
      <div
        className={`flex py-2 relative items-center ${
          openMenu !== data.id && "hover:bg-neutral-800/80"
        } w-full duration-150`}
        onClick={() => {
          if (openMenu !== data.id) {
            setMenuValue(null);
            moveInto(data.id);
          }
        }}
        onContextMenu={() => setMenuValue(data.id)}
      >
        <div className="px-1 text-neutral-600 w-8 min-w-8 text-center">
          {data && data?.childrens.length > 0 && data.childrens.length}
        </div>
        <p
          className={`text-white duration-300 select-none ${
            openMenu === data.id && "opacity-50"
          }`}
        >
          {data?.title}
        </p>
        <div
          className={` w-0 min-w-0 duration-300 overflow-x-hidden flex absolute h-full right-0 text-white text-lg shadow-sm shadow-neutral-950 ${
            openMenu === data.id && "w-60 min-w-60"
          }`}
        >
          <div
            onClick={() => moveFolderVertical(folderIndex, -1)}
            className={itemStyles}
          >
            <IoAddOutline />
          </div>
          <div
            onClick={() => moveFolderVertical(folderIndex, 1)}
            className={itemStyles}
          >
            <IoAirplane />
          </div>
          <div
            onClick={() => moveFolderVertical(folderIndex, -1)}
            className={itemStyles}
          >
            <FaAngleUp />
          </div>
          <div
            onClick={() => moveFolderVertical(folderIndex, 1)}
            className={itemStyles}
          >
            <FaAngleDown />
          </div>
          <div
            onClick={() => removeFolder(data.id, data.parent)}
            className={itemStyles}
          >
            <RiDeleteBinLine />
          </div>
        </div>
      </div>
      <div
        onClick={() => setMenuValue(openMenu === data.id ? null : data.id)}
        className="text-lg text-white hover:bg-neutral-800 border-l-1 border-neutral-800 duration-150 flex items-center px-1"
      >
        <BsThreeDotsVertical />
      </div>
    </div>
  );
}

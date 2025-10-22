import { useFolders } from "@/hooks/useFolders";
import { RiDeleteBinLine } from "react-icons/ri";
import stateFolders from "@/state/stateFolders";
import { BsThreeDotsVertical } from "react-icons/bs";
import { FaAngleDown, FaAngleUp } from "react-icons/fa";
import { IoAddOutline, IoAirplane } from "react-icons/io5";
import { ItemLayout } from "./ItemLayout";

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
    "bg-neutral-100 hover:bg-neutral-300 dark:bg-neutral-900 dark:hover:bg-neutral-700 duration-150 flex-1 flex gap-2 items-center justify-center";

  return (
    <ItemLayout
      filled
      className={`px-3 flex ${
        openMenu !== data.id && "hover:bg-neutral-300 dark:hover:bg-neutral-900 duration-150"}
      `}
    >
      <div
        className={`flex py-2 relative items-center space-x-2 w-full`}
        onClick={() => {
          if (openMenu !== data.id) {
            setMenuValue(null);
            moveInto(data.id);
          }
        }}
        onContextMenu={() => setMenuValue(data.id)}
      >
        <div className="text-neutral-500 w-8 min-w-8 text-center">
          {data && data?.childrens.length > 0 && data.childrens.length}
        </div>
        <p
          className={`text-black dark:text-white duration-300 select-none ${
            openMenu === data.id && "opacity-50"
          }`}
        >
          {data?.title}
        </p>
        <div
          className={`w-0 min-w-0 duration-300 overflow-x-hidden flex absolute h-full right-0 dark:text-white text-lg shadow-sm shadow-neutral-500 dark:shadow-neutral-950 ${
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
            onClick={() => data.childrens.length === 0 && removeFolder(data.id, data.parent)}
            className={itemStyles}
          >
            <RiDeleteBinLine />
          </div>
        </div>
      </div>
      <div
        onClick={() => setMenuValue(openMenu === data.id ? null : data.id)}
        className="text-lg px-1 text-black dark:text-white flex items-center"
      >
        <BsThreeDotsVertical />
      </div>
    </ItemLayout>
  );
}

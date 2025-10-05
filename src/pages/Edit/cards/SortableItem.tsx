import { useFolders } from "@/hooks/useFolders";
import { useEffect, useState } from "react";
import { RiArrowRightSLine, RiDeleteBinLine } from "react-icons/ri";
import { LuPencil } from "react-icons/lu";
import stateFolders from "@/state/stateFolders";
import { FaAngleUp } from "react-icons/fa";
import { FaAngleDown } from "react-icons/fa";
import { IoIosMove } from "react-icons/io";
import { BsThreeDotsVertical } from "react-icons/bs";
import { menuData } from "@/data/sidebar";

export function SortableItem(props: {
  select: number | null;
  id: number;
  className?: string;
}) {
  const { getFolderById } = useFolders();
  const [data, setData] = useState<folder>();
  const [touch, setTouch] = useState<{ x: number; y: number } | null>();
  const { openMenu, setMenuValue } = stateFolders();
  const { moveInto } = useFolders();

  useEffect(() => {
    setData(getFolderById(props.id));
  }, []);

  return (
    <div
      className={`${props.className} cursor-pointer shadow-neutral-900 relative justify-between border-b-1 border-neutral-800 flex`}
    >
      <div
        className={`flex py-2 relative items-center ${
          openMenu !== props.id && "hover:bg-neutral-800/50"
        } w-full duration-200`}
        onClick={() => {
          setMenuValue(null);
          if (openMenu !== props.id) moveInto(props.id);
        }}
        onContextMenu={() => setMenuValue(props.id)}
      >
        <div className="px-1 text-neutral-500">
          {data?.childrens.length ? (
            <RiArrowRightSLine fontSize={24} />
          ) : (
            <div className="w-6"></div>
          )}
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
            openMenu === props.id && "w-70 min-w-70"
          }`}
        >
          {menuData.map((item) => {
            return (
              <div className="bg-neutral-800/50 hover:bg-neutral-700/50 duration-150 border-l-1 border-neutral-800 flex-1 flex gap-2 items-center justify-center">
                {item}
              </div>
            );
          })}
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

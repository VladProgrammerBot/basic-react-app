import { useFolders } from "@/hooks/useFolders";
import { useEffect, useState } from "react";
import { RiArrowRightSLine, RiDeleteBinLine } from "react-icons/ri";
import { LuPencil } from "react-icons/lu";
import stateFolders from "@/state/stateFolders";
import { FaAngleUp } from "react-icons/fa";
import { FaAngleDown } from "react-icons/fa";
import { IoIosMove } from "react-icons/io";

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
      onClick={() => {
        setMenuValue(null);
        if (openMenu !== props.id) moveInto(props.id);
      }}
      onContextMenu={() => setMenuValue(props.id)}
      onTouchStart={(e) =>
        setTouch({ x: e.changedTouches[0].pageX, y: e.changedTouches[0].pageY })
      }
      onTouchEnd={() => setTouch(null)}
      onTouchMove={(e) => {
        if (touch) {
          const moveX = e.changedTouches[0].pageX - touch.x;
          const moveY = e.changedTouches[0].pageY - touch.y;

          if (moveX < 0 && Math.abs(moveX) > Math.abs(moveY)) {
            setMenuValue(props.id);
            setTouch(null);
          } else {
            setMenuValue(null);
            setTouch(null);
          }
        }
      }}
      className={`${props.className} hover:bg-neutral-800 cursor-pointer duration-200 shadow-neutral-900 relative justify-between border-b-1 border-neutral-800 flex`}
    >
      <div className="flex py-2 items-center pr-4 ">
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
      </div>
      <div
        className={`bg-neutral-800 w-0 min-w-0 duration-300 overflow-x-hidden flex absolute h-full right-0 text-white text-lg ${
          openMenu === props.id && "w-70 min-w-70"
        }`}
      >
        <div
          className="flex-1 bg-green-500 flex gap-2 items-center justify-center"
          onTouchStart={() => console.log("menu")}
        >
          <IoIosMove />
        </div>
        <div
          className="flex-1 bg-blue-500 flex gap-2 border-r-1 border-blue-600  items-center justify-center"
          onTouchStart={() => console.log("menu")}
        >
          <FaAngleUp />
        </div>
        <div
          className="flex-1 bg-blue-500 flex gap-2 items-center justify-center"
          onTouchStart={() => console.log("menu")}
        >
          <FaAngleDown />
        </div>
        <div
          className="flex-1 bg-orange-500 flex gap-2 items-center justify-center"
          onTouchStart={() => console.log("menu")}
        >
          <LuPencil />
        </div>
        <div className="flex-1 bg-red-500 flex items-center gap-2 justify-center">
          <RiDeleteBinLine />
        </div>
      </div>
    </div>
  );
}

import { useFolders } from "@/hooks/useFolders";
import stateMenu from "@/state/stateMenu";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { useEffect, useState } from "react";
import { RiArrowRightSLine } from "react-icons/ri";

export function SortableItem(props: {
  select: number | null;
  id: number;
  className?: string;
}) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: props.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };
  const { getFolderById } = useFolders();
  const [data, setData] = useState<folder>();
  const [touch, setTouch] = useState<{ x: number; y: number } | null>();
  const { openMenu, setMenuValue } = stateMenu();

  useEffect(() => {
    setData(getFolderById(props.id));
  }, []);

  return (
    <div
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
      className={`${props.className} ${
        isDragging && "opacity-30 select-none"
      } border-black/0 hover:hadow-md shadow-neutral-900 ${
        props.select === data?.id ? "bg-neutral-800" : "hover:bg-neutral-900"
      } cursor-pointer justify-between border-b-1 border-neutral-800 flex`}
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
    >
      <div className="flex py-2 items-center pr-4 ">
        <div className="p-1 text-neutral-500">
          {data?.childrens.length ? (
            <RiArrowRightSLine fontSize={24} />
          ) : (
            <div className="w-[24px]"></div>
          )}
        </div>
        <p className="text-white overflow-x-hidden">{data?.title}</p>
      </div>
      <div
        className={`bg-blue-500 w-0 duration-300 overflow-x-hidden flex ${
          openMenu === props.id && "w-1/2"
        }`}
      >
        <div className="flex-1 bg-green-500" onTouchStart={() => console.log("menu")}>a</div>
        <div className="flex-1 bg-amber-600">b</div>
      </div>
    </div>
  );
}

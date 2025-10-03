import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import type { folder } from "../types/folder";
import { RiArrowRightSLine } from "react-icons/ri";

export function SortableItem(props: {
  select: number | null;
  data: folder | undefined | null;
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

  return (
    <div
        onClick={() => console.log(1)}
      className={`${props.className} ${
        isDragging && "opacity-30 select-none"
      } uration-200 border-black/0 hover:shadow-md shadow-neutral-900 hover:bg-neutral-800 ${
        props.select === props.data?.id && "bg-neutral-800"
      } py-2 pr-4 cursor-pointer border-b-1 border-neutral-800 flex items-center`}
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
    >
      <div className="p-1 text-neutral-500">
        {props.data?.childrens.length ? <RiArrowRightSLine fontSize={24}/> : <div className="w-[24px]"></div>}
      </div>
      <p className="text-white">{props.data?.title}</p>
    </div>
  );
}

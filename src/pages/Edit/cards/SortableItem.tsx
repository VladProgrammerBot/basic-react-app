import { useFolders } from "@/hooks/useFolders";
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

  useEffect(() => {
    setData(getFolderById(props.id));
  }, []);

  return (
    <div
      className={`${props.className} ${
        isDragging && "opacity-30 select-none"
      } border-black/0 hover:hadow-md shadow-neutral-900  ${
        props.select === data?.id ? "bg-neutral-800" : "hover:bg-neutral-900"
      } py-2 pr-4 cursor-pointer border-b-1 border-neutral-800 flex items-center`}
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
    >
      <div className="p-1 text-neutral-500">
        {data?.childrens.length ? (
          <RiArrowRightSLine fontSize={24} />
        ) : (
          <div className="w-[24px]"></div>
        )}
      </div>
      <p className="text-white">{data?.title}</p>
    </div>
  );
}

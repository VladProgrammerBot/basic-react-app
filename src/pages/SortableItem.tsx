import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import type { folder } from "../types/folder";

export function SortableItem(props: {
    select: number | null,
    data: folder | undefined | null
    id: number
}) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } =
    useSortable({ id: props.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div
      className={`${isDragging && "opacity-30"} border-black/0 hover:bg-neutral-700 ${props.select === props.data?.id && 'bg-neutral-700'} p-2 border-b-1 border-neutral-700`}
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
    >
      {props.data?.title}
    </div>
  );
}

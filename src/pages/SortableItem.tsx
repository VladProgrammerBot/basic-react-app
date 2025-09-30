import React from "react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

export function SortableItem(props) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } =
    useSortable({ id: props.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging && "50%",
  };

  return (
    <div
    onDragEnd={() => console.log(1)
    }
      className={`border-b-1 border-b-neutral-700 bg-neutral-800 `}
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
    >
      {props.data.title}
    </div>
  );
}

import { useState } from "react";
import { parent, data } from "../data/template";
import type { folder } from "../types/folder";

import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragOverlay,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";

import { SortableItem } from "./SortableItem";
import { restrictToVerticalAxis } from "@dnd-kit/modifiers";

export const Edit = () => {
  const [parentData, setParent] = useState<folder>(parent);
  const [childrens, setChildrens] = useState<folder[]>(data);
  const [select, setSelect] = useState<number | null>();

  const [items, setItems] = useState(parent.childrens);
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  function handleDragEnd(event) {
    const { active, over } = event;

    if (active.id !== over.id) {
      setItems((items) => {
        const oldIndex = items.indexOf(active.id);
        const newIndex = items.indexOf(over.id);

        return arrayMove(items, oldIndex, newIndex);
      });
    }
  }

  const getFolderById = (id: number) => {
    const data = childrens.find((child) => child.id === id);
    return data;
  };

  return (
    <div className="cursor-grabbing h-screen p-2">
      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragEnd={handleDragEnd}
        modifiers={[restrictToVerticalAxis]}
        onDragStart={(e) => setSelect(e.active.id)}
      >
        <SortableContext items={items} strategy={verticalListSortingStrategy}>
          {items.map((id) => {
            const data = getFolderById(id)
            return <SortableItem key={id} id={id} data={data} />;
          })}
        </SortableContext>
        <DragOverlay>
          <SortableItem key={4} id={4} data={getFolderById(select)} />
        </DragOverlay>
      </DndContext>
    </div>
  );
};

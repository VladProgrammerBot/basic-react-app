import { useState } from "react";
import { parent, childrens } from "../data/template";

import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragOverlay,
  type DragEndEvent,
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
  // const [parentData, setParent] = useState<folder>(parent);
  // const [childrens, setChildrens] = useState<folder[]>(data);
  const [select, setSelect] = useState<number | null>(null);

  const [items, setItems] = useState(parent.childrens);
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event;

    if (active.id !== over?.id && over) {
      setItems((items) => {
        const oldIndex = items.indexOf(Number(active.id));
        const newIndex = items.indexOf(Number(over.id));

        return arrayMove(items, oldIndex, newIndex);
      });
    }
  }

  const getFolderById = (id: number) => {
    const data = childrens.find((child) => child.id === id);
    return data;
  };

  return (
    <div className="cursor-grabbing h-screen p-2 max-w-4xl m-auto bg-neutral-800">
      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragEnd={handleDragEnd}
        modifiers={[restrictToVerticalAxis]}
        onDragStart={(e) => setSelect(Number(e.active.id))}
        onDragCancel={() => console.log(1)}
      >
        <SortableContext items={items} strategy={verticalListSortingStrategy}>
          {items.map((id) => {
            const data = getFolderById(id);
            return (
              <SortableItem key={id} id={id} data={data} select={select} />
            );
          })}
        </SortableContext>
        <DragOverlay>
          {select && (
            <SortableItem
              key={999}
              id={999}
              data={getFolderById(select)}
              select={select}
            />
          )}
        </DragOverlay>
      </DndContext>
    </div>
  );
};

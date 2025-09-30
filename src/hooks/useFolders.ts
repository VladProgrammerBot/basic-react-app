import { useState } from "react";
import { parent, childrens } from "../data/template";

import {
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  type DragEndEvent,
} from "@dnd-kit/core";
import {
  arrayMove,
  sortableKeyboardCoordinates,
} from "@dnd-kit/sortable";

export const useFolders = () => {
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

  return {select, setSelect, items, sensors, handleDragEnd, getFolderById}
}
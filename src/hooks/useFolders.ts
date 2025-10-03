import {
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  type DragEndEvent,
} from "@dnd-kit/core";
import { arrayMove, sortableKeyboardCoordinates } from "@dnd-kit/sortable";
import foldersState from "../state/foldersState";

export const useFolders = () => {
  const { folders, childrens, setChildrens } = foldersState();

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event;
    if (!childrens || !setChildrens) return;

    if (active.id !== over?.id && over) {
      const oldIndex = childrens.indexOf(Number(active.id));
      const newIndex = childrens.indexOf(Number(over.id));

      setChildrens(arrayMove(childrens, oldIndex, newIndex));
    }
  }

  const getFolderById = (id: number) => {
    const data = folders.find((child) => child.id === id);
    return data;
  };

  return { sensors, handleDragEnd, getFolderById };
};

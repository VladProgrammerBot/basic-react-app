import {
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  type DragEndEvent,
} from "@dnd-kit/core";
import { arrayMove, sortableKeyboardCoordinates } from "@dnd-kit/sortable";
import foldersState from "../state/stateFolders";

export const useFolders = () => {
  const { folders, childrens, setChildrens, select, pushPath, reducePath } = foldersState();

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

  const moveInto = () => {
    if (!select) return;
    const newParent = getFolderById(select);
    if (!newParent) return;

    setChildrens(newParent.childrens);
    pushPath(newParent)
  };

  const moveOut = (data: folder, index: number) => {
    // pushPath(data)
    reducePath(index)
    setChildrens(data.childrens)
  }

  return { sensors, handleDragEnd, getFolderById, moveInto, moveOut };
};

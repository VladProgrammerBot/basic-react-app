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
  const { folders, childrens, setChildrens, pushPath, reducePath } =
    foldersState();

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

  const moveInto = (id: number) => {
    // if (!select) return;
    const newParent = getFolderById(id);
    if (!newParent) return;

    setChildrens(newParent.childrens);
    pushPath(newParent);
  };

  const moveOut = (data: folder, index: number) => {
    reducePath(index);
    setChildrens(data.childrens);
  };

  const moveFolderVertical = (index: number, dir: number) => {
    const futureIndex = index + dir;
    if (!childrens || futureIndex + 1 > childrens.length || futureIndex < 0)
      return;
    const temparr = childrens;
    const tempIndexValue = temparr[futureIndex];
    temparr[futureIndex] = temparr[index];
    temparr[index] = tempIndexValue;
    setChildrens(temparr);
  };

  const addFolder = (value: string): void => {
    console.log(value)
  };

  return {
    sensors,
    moveFolderVertical,
    handleDragEnd,
    getFolderById,
    moveInto,
    moveOut,
    addFolder,
  };
};

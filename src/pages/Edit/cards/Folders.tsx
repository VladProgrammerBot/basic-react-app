import { DndContext, closestCenter, DragOverlay } from "@dnd-kit/core";
import {
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { SortableItem } from "./SortableItem";
import { useOutsideClick } from "@/hooks/useOutsideClick";
import { useFolders } from "@/hooks/useFolders";
import { restrictToVerticalAxis } from "@dnd-kit/modifiers";
import foldersState from "@/state/stateFolders";

export const Folders = () => {
  const { sensors, handleDragEnd, moveInto } = useFolders();
  const { childrens, select, setSelect } = foldersState();
  const wrapperRef = useOutsideClick();

  return (
    <div
      className="border-t-1 border-neutral-800 max-w-4xl mx-auto"
      onDoubleClick={() => moveInto()}
      ref={wrapperRef}
    >
      {childrens?.map((id: number) => {
        return <SortableItem key={id} id={id} select={select} />;
      })}
    </div>
  );
};

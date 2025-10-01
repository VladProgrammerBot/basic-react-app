import { DndContext, closestCenter, DragOverlay } from "@dnd-kit/core";
import {
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { SortableItem } from "./SortableItem";
import { useOutsideClick } from "../hooks/useOutsideClick";
import { useFolders } from "../hooks/useFolders";
import { restrictToVerticalAxis } from "@dnd-kit/modifiers";

export const Folders = () => {
  const { select, setSelect, items, sensors, handleDragEnd, getFolderById } =
  useFolders();
  const wrapperRef = useOutsideClick();

  return (
    <div
      className="max-w-4xl m-auto max-lg:px-2"
      onDoubleClick={() => console.log(1)}
      ref={wrapperRef}
    >
      <div className="">
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
                className="duration-0"
              />
            )}
          </DragOverlay>
        </DndContext>
      </div>
    </div>
  );
};

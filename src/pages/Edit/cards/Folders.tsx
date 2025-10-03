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
            className="max-w-4xl m-auto max-lg:px-2"
            onDoubleClick={() => moveInto()}
            ref={wrapperRef}
        >
            <DndContext
                sensors={sensors}
                collisionDetection={closestCenter}
                onDragEnd={handleDragEnd}
                modifiers={[restrictToVerticalAxis]}
                onDragStart={(e) => setSelect(Number(e.active.id))}
                onDragCancel={() => console.log(1)}
            >
                {childrens && (
                    <SortableContext
                        items={childrens}
                        strategy={verticalListSortingStrategy}
                    >
                        {childrens?.map((id: number) => {
                            return (
                                <SortableItem key={id} id={id} select={select} />
                            );
                        })}
                    </SortableContext>
                )}
                <DragOverlay>
                    {select && (
                        <SortableItem
                            key={999}
                            id={select}
                            select={select}
                            className="duration-0"
                        />
                    )}
                </DragOverlay>
            </DndContext>
        </div>
    );
};

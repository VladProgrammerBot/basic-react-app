import { DndContext, closestCenter, DragOverlay } from "@dnd-kit/core";
import { FaArrowsRotate } from "react-icons/fa6";
import { RiPencilFill } from "react-icons/ri";
import {
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { FaRegTrashAlt } from "react-icons/fa";

import { SortableItem } from "./SortableItem";
import { restrictToVerticalAxis } from "@dnd-kit/modifiers";
import { useFolders } from "../hooks/useFolders";
import { RiArrowRightSLine } from "react-icons/ri";

export const Edit = () => {
  const { select, setSelect, items, sensors, handleDragEnd, getFolderById } =
    useFolders();
  const path = ["Home", "programming", "project", "architecture"];
  const menu = [
    {
      icon: <FaRegTrashAlt fontSize={20} />,
      title: "Remove",
    },
    {
      icon: <RiPencilFill fontSize={20} />,
      title: "Change",
    },
    {
      icon: <FaArrowsRotate fontSize={20} />,
      title: "Replace",
    },
  ];

  return (
    <div className="h-screen p-2 max-w-4xl m-auto bg-neutral-800">
      <div className="flex">
        {[1,2,3,4].map((elem) => {
          return (
            <div className="hover:text-shadow-md text-shadow-neutral-500 px-4 rounded-lg bg-neutral-900 hover:bg-neutral-800 cursor-pointer duration-150 border-2 border-neutral-800 hover:border-neutral-700">
              {elem}
            </div>
          )
        })}
      </div>
      <div className="flex p-1 px-3 bg-neutral-900 rounded-lg my-2 flex-wrap">
        {path.map((elem, index) => {
          return (
            <div className="flex items-center" key={index}>
              {index !== 0 && (
                <RiArrowRightSLine fontSize={24} className="text-neutral-500" />
              )}
              <div
                className={` ${
                  path.length - 1 !== index &&
                  "text-neutral-500 hover:text-neutral-300 duration-150 cursor-pointer"
                }`}
              >
                {elem}
              </div>
            </div>
          );
        })}
      </div>
      {/* <div className="flex justify-end gap-2 mb-2">
        {menu.map((elem, index) => {
          return (
            <button className={`cursor-pointer flex items-center gap-2 px-2 py-1 rounded-lg border-neutral-900 border-2 duration-150 hover:bg-neutral-700 ${!select && "text-neutral-500"}`} key={index}>
              {elem.icon} {elem.title}
            </button>
          );
        })}
      </div> */}
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
  );
};

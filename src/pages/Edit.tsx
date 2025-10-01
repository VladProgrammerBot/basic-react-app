import { DndContext, closestCenter, DragOverlay } from "@dnd-kit/core";
import { FaArrowsRotate } from "react-icons/fa6";
import { RiPencilFill } from "react-icons/ri";
import {
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { IoMove } from "react-icons/io5";
import { GoPencil } from "react-icons/go";

import { IoSearchOutline } from "react-icons/io5";
import { SortableItem } from "./SortableItem";
import { restrictToVerticalAxis } from "@dnd-kit/modifiers";
import { useFolders } from "../hooks/useFolders";
import { RiArrowRightSLine } from "react-icons/ri";
import { GoTrash } from "react-icons/go";
import { BsPlusLg } from "react-icons/bs";
import { useEffect } from "react";

export const Edit = () => {
  const { select, setSelect, items, sensors, handleDragEnd, getFolderById } =
    useFolders();
  const path = ["Home", "programming", "project", "architecture"];
  const menu = [
    {
      icon: <GoTrash />,
      title: "Remove",
    },
    {
      icon: <GoPencil />,
      title: "Change",
    },
    {
      icon: <IoMove />,
      title: "Replace",
    },
    {
      icon: <BsPlusLg color="white" fontSize={20} />,
      title: "Add",
    },
    {
      icon: <IoSearchOutline color="white" />,
      title: "Add",
    },
  ];

  function useOutsideAlerter(ref) {
    useEffect(() => {
      /**
       * Alert if clicked on outside of element
       */
      function handleClickOutside(event) {
        if (ref.current && !ref.current.contains(event.target)) {
          alert("You clicked outside of me!");
        }
      }
      // Bind the event listener
      document.addEventListener("mousedown", handleClickOutside);
      return () => {
        // Unbind the event listener on clean up
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }, [ref]);
  }

  return (
    <div className="h-screen space-y-2 m-auto">
      <div className="bg-neutral-800 max-lg:px-2 py-2 shadow-md shadow-neutral-950">
        <div className="max-w-4xl m-auto flex p-1 flex-wrap">
          {path.map((elem, index) => {
            return (
              <div className="flex items-center" key={index}>
                {index !== 0 && (
                  <RiArrowRightSLine
                    fontSize={24}
                    className="text-neutral-500"
                  />
                )}
                <div
                  className={` ${
                    path.length - 1 !== index
                      ? "text-neutral-500 hover:text-neutral-300 duration-150 cursor-pointer underline underline-offset-2"
                      : "text-white"
                  }`}
                >
                  {elem}
                </div>
              </div>
            );
          })}
        </div>
      </div>
      <div className="shadow-md shadow-neutral-950 flex border-r-neutral-700 max-lg:mx-2 bg-neutral-800 mx-auto max-w-4xl justify-center rounded-lg overflow-clip">
        {menu.map((elem, index) => {
          return (
            <button
              className={`flex items-center gap-2 py-2 text-lg duration-200 text-neutral-700 ${
                select && "text-white hover:bg-neutral-700 cursor-pointer"
              }`}
              key={index}
            >
              <div
                className={`border-neutral-700 px-4 ${
                  index !== 0 && "border-l-1"
                }`}
              >
                {elem.icon}
              </div>
            </button>
          );
        })}
      </div>
      {/* </div> */}
      <div
        className="max-w-4xl m-auto max-lg:px-2"
        onDoubleClick={() => console.log(1)}
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
            <SortableContext
              items={items}
              strategy={verticalListSortingStrategy}
            >
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
    </div>
  );
};

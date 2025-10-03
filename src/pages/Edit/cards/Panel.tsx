import { IoMove } from "react-icons/io5";
import { GoPencil } from "react-icons/go";
import { IoSearchOutline } from "react-icons/io5";
import { GoTrash } from "react-icons/go";
import { BsPlusLg } from "react-icons/bs";
import { RxQuestionMark } from "react-icons/rx";

export const Panel = () => {
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
      title: "Search",
    },
    {
      icon: <RxQuestionMark />,
      title: "Help",
    },
  ];

  return (
    <div className="flex flex-col duration-300 bg-neutral-800 justify-center h-full overflow-x-hidden w-14 lg:w-50 px-1">
      {menu.map((elem, index) => {
        return (
          <button
            className={`flex items-center rounded-md text-lg duration-300 text-white hover:bg-neutral-700 py-3 cursor-pointer`}
            key={index}
          >
            <p className="min-w-12 flex justify-center w-12">
              {elem.icon}
            </p>
            <p className="pl-2">
              {elem.title}
            </p>
          </button>
        );
      })}
    </div>
  );
};

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
      key: "ctrl+d",
    },
    {
      icon: <GoPencil />,
      title: "Change",
      key: "c",
    },
    {
      icon: <IoMove />,
      title: "Replace",
      key: "r",
    },
    {
      icon: <BsPlusLg color="white" fontSize={20} />,
      title: "Add",
      key: "a",
    },
    {
      icon: <IoSearchOutline color="white" />,
      title: "Search",
      key: "s",
    },
    {
      icon: <RxQuestionMark />,
      title: "Help",
      key: "?",
    },
  ];

  return (
    <div className="flex flex-col duration-300 bg-neutral-800 justify-between h-full overflow-x-hidden w-14 hover:w-70 lg:w-70">
      <div></div>
      <div className="w-full">
        {menu.map((elem, index) => {
          return (
            <button
              className={`flex w-full items-center text-lg duration-300 text-white hover:bg-neutral-700 py-3 cursor-pointer px-1 justify-between`}
              key={index}
            >
              <div className="flex items-center">
                <p className="min-w-12 flex justify-center w-12">{elem.icon}</p>
                <p className="pl-2 w-fit">{elem.title}</p>
              </div>
              <p className="text-neutral-500 text-sm px-4">{elem.key}</p>
            </button>
          );
        })}
      </div>
      <div></div>
    </div>
  );
};

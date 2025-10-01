import { IoMove } from "react-icons/io5";
import { GoPencil } from "react-icons/go";
import { IoSearchOutline } from "react-icons/io5";
import { GoTrash } from "react-icons/go";
import { BsPlusLg } from "react-icons/bs";

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
      title: "Add",
    },
  ];

  return (
    <div className="mb-4 shadow-md shadow-neutral-950 flex border-r-neutral-700 max-lg:mx-2 bg-neutral-800 mx-auto max-w-4xl justify-center rounded-lg overflow-clip">
      {menu.map((elem, index) => {
        return (
          <button
            className={`flex items-center gap-2 py-2 text-lg duration-200 text-white hover:bg-neutral-700 cursor-pointer`}
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
  );
};

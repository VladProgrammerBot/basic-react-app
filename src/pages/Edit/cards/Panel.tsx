import { FaRegUser } from "react-icons/fa6";
import { useState, type JSX } from "react";
import { menu } from "@/data/sidebar";
import { MdOutlineKeyboardDoubleArrowLeft, MdOutlineKeyboardDoubleArrowRight } from "react-icons/md";
import { LuSettings } from "react-icons/lu";

export const Panel = () => {
  const [isOpen, setIsOpen] = useState<boolean>();
//try to fix bugs with domen view by change ios styles
  return (
    <div
      className={`flex text-white py-2 flex-col duration-300 bg-neutral-800 px-1 justify-between h-full overflow-x-hidden w-13 ${
        isOpen && "w-60 max-w-full"
      }`}
    >
      <div
        className={`w-full flex pr-[px] justify-end cursor-pointer`}
        onClick={() => setIsOpen(!isOpen)}
      >
        <div className="duration-150 hover:bg-neutral-700 p-3 rounded-md">
          {isOpen ? (
            <MdOutlineKeyboardDoubleArrowLeft fontSize={20} />
          ) : (
            <MdOutlineKeyboardDoubleArrowRight fontSize={20} />
          )}
        </div>
      </div>
      <div className="w-full">
        {menu.map((elem: item, index) => {
          return <Item elem={elem} key={index} />;
        })}
      </div>
      <div>
        <Item
          elem={{
            icon: <LuSettings fontSize={20}/>,
            title: "Settings",
          }}
        />
        <Item
          elem={{
            icon: <FaRegUser fontSize={19}/>,
            title: "User228",
          }}
        />
      </div>
    </div>
  );
};

interface item {
  icon: JSX.Element;
  title?: string;
  key?: string;
}

const Item = ({ elem }: { elem: item }) => {
  return (
    <button
      className={`flex w-full items-center rounded-md duration-150 hover:bg-neutral-700 py-3 cursor-pointer px-1 justify-between`}
    >
      <div className="flex items-center">
        <p className="min-w-9 flex justify-center w-9">{elem.icon}</p>
        <p className="pl-2 w-fit">{elem.title}</p>
      </div>
      <p className="text-neutral-500 text-sm px-6">{elem.key}</p>
    </button>
  );
};

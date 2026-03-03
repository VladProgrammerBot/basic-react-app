import { IoSearchOutline } from "react-icons/io5";
import { HiArrowTurnDownRight, HiArrowTurnRightDown } from "react-icons/hi2";
import { MdKeyboardArrowRight } from "react-icons/md";
import { IoMdAdd } from "react-icons/io";
import { useEffect, useState } from "react";

export const Experements = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    document.addEventListener("contextmenu", (e) => e.preventDefault());
  }, []);

  return (
    <div className="p-2 max-w-xl mx-auto">
      <div className="flex justify-between mb-1 gap-1">
        <div className="flex flex-1 items-center gap-2 pl-4 p-2 border border-neutral-700 bg-neutral-800 rounded-xl">
          <IoSearchOutline size={25} />
          <input
            type="text"
            placeholder="Search item"
            className="outline-none w-full bg-transparent"
          />
          <Hotkey is="S" />
        </div>
        <div className="flex gap-1 items-center px-4 border border-neutral-600 bg-neutral-800 hover:bg-neutral-700 duration-150 cursor-pointer rounded-xl">
          <IoMdAdd />
          <Hotkey is="Shift+A" />
        </div>
      </div>
      <div className="rounded-xl border border-neutral-700 bg-neutral-100 dark:bg-neutral-800">
        <div className="px-4 overflow-x-scroll flex items-center border-b mb-2 border-neutral-700">
          {["Root", "...", "Global plan", "pet-project"].map((item, index) => {
            return (
              <>
                <div>{index !== 0 && <MdKeyboardArrowRight size={25} />}</div>
                <span className="rounded-xl py-2 text-nowrap flex-nowrap">
                  {item}
                </span>
              </>
            );
          })}
          {<Hotkey is="H" />}
        </div>
        <div className="p-2">
          <div className="flex mb-2 text-sm items-center">
            <button className="flex items-center gap-1 p-1 px-2 rounded-2xl bg-neutral-700 text-neutral-400">
              2<HiArrowTurnDownRight />
              <Hotkey is="B" />
            </button>
            <p className="font-bold text-xl px-2">What is programming?</p>
            <p className="text-neutral-400">Menu on right click</p>
          </div>
          <ul className="space-y-1">
            {[
              "Kanban",
              "Ideas",
              "Запамятай: жодних машин!!!",
              "Спробувати зробити лідирующі інструменти (у кожен момент) чіткішими та прагнути максимуму гучності у важливих частинах як у анімалс, там де баси високі ліди мають бути гучними",
            ].map((num, index) => (
              <li
                key={num}
                onContextMenu={() => setIsMenuOpen(true)}
                className={`flex items-center hover:bg-neutral-600 bg-neutral-700 duration-150 cursor-pointer w-full rounded-xl`}
              >
                <p className="flex-1 p-2 px-4">{num}</p>
                {index !== 2 && (
                  <span className="text-sm p-2 text-neutral-400 flex items-center">
                    <HiArrowTurnRightDown />
                    10
                  </span>
                )}
                {index == 0 && <Hotkey is="J" />}
              </li>
            ))}
          </ul>
          <div className="border border-white/20 rounded-xl border-dashed flex items-center w-full mt-1 ">
            <Hotkey is="A" />
            <input
              className="outline-none w-full placeholder:text-white/30 px-4 flex-1"
              placeholder="Add note and connect to it"
            />
            <button className="py-1 px-4 m-1 cursor-pointer flex rounded-xl bg-neutral-700 border border-neutral-600">
              +
              <Hotkey is="Enter" />
            </button>
          </div>
        </div>
      </div>
      {isMenuOpen && (
        <div className="fixed bottom-0 left-1/2 -translate-1/2 bg-neutral-800 border border-neutral-700 p-4 rounded-xl">
          {[
            "Move Up",
            "Move Down",
            "Connect to another item",
            "Disconnect this item",
            "Connect this to another",
            "Copy Markdown",
            "Edit text",
            "Delete item",
          ].map((elem) => {
            return <div>{elem}</div>;
          })}
        </div>
      )}
    </div>
  );
};

const Hotkey = ({ is }: { is: string }) => {
  return (
    <div
      className={`text-green-500 bg-green-500/10 text-sm mx-2 w-fit px-2 rounded-full text-nowrap`}
    >
      {is}
    </div>
  );
};

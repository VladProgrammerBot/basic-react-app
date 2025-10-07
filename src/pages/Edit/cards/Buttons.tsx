import stateFolders from "@/state/stateFolders";
import { IoIosSearch } from "react-icons/io";
import { IoAddOutline } from "react-icons/io5";

export const Buttons = () => {
  const { setMode } = stateFolders();

  return (
    <div className="text-white space-x-2 flex justify-end mb-2">
      <button className="hover:bg-neutral-800 border-1 border-neutral-800 duration-150 cursor-pointer py-1 px-4">
        Filter
      </button>
      <button className="over:bg-neutral-800 text-neutral-700 border-1 border-neutral-800 duration-150 ursor-pointer py-1 px-4">
        Paste
      </button>
      <button className="hover:bg-neutral-800 border-1 border-neutral-800 duration-150 cursor-pointer py-1 px-4">
        <IoIosSearch fontSize={20} />
      </button>
      <button
        className="hover:bg-neutral-800 border-1 border-neutral-800 duration-150 cursor-pointer py-1 px-4"
        onClick={() => setMode("Add Folder")}
      >
        <IoAddOutline fontSize={23} />
      </button>
    </div>
  );
};

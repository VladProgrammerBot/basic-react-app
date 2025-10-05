import { Folders } from "./cards/Folders";
import { InputForm } from "./cards/InputForm";
import { IoIosSearch } from "react-icons/io";
import { IoAddOutline } from "react-icons/io5";
import { Path } from "./cards/Path";
import stateFolders from "@/state/stateFolders";

export const Edit = () => {
  const { mode, setMode } = stateFolders();
  document.addEventListener("contextmenu", function (e) {
    e.preventDefault();
  });

  return (
    <div className="h-screen max-w-4xl max-lg:px-2 mx-auto">
      <Path />
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
      <Folders />
      {mode !== "normal" && <InputForm />}
    </div>
  );
};

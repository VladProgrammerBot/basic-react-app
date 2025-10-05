import { IoClose } from "react-icons/io5";

export const InputForm = () => {
  return (
    <div className="bg-black/50 left-0 top-0 p-4 flex items-center justify-center w-screen h-screen fixed">
      <div className="bg-neutral-900 gap-4 w-full max-w-xl flex-col shadow-md p-4 shadow-black flex ounded-lg text-white">
        <div className="flex justify-between">
          <p className="text-2xl font-bold">Add Folder</p>
          <button className="p-2 text-lg cursor-pointer hover:bg-neutral-800">
            <IoClose />
          </button>
        </div>
        <textarea
          placeholder="Enter folder name"
          className="p-2 border-1 min-h-20 max-h-100 border-neutral-800 outline-none ounded-md"
        />
        <button className="border-1 border-neutral-800 py-2 px-4 ounded-lg cursor-pointer hover:bg-neutral-800 duration-200">
          Add
        </button>
      </div>
    </div>
  );
};

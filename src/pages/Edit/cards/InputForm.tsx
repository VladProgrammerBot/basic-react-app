import { useFolders } from "@/hooks/useFolders";
import stateFolders from "@/state/stateFolders";
import { useEffect, useRef } from "react";
import { IoClose } from "react-icons/io5";

export const InputForm = () => {
  const { setMode, mode } = stateFolders();
  const { addFolder } = useFolders()
  const ref = useRef<HTMLTextAreaElement | null>(null);

  //focus input
  useEffect(() => {
    ref.current?.focus()
  }, [])

  return (
    <div className="left-0 top-0 p-4 flex items-center justify-center w-screen h-screen fixed">
      <div className="bg-neutral-900 z-10 gap-4 w-full max-w-xl flex-col shadow-md p-4 shadow-black flex ounded-lg text-white">
        <div className="flex justify-between">
          <p className="text-2xl font-bold">{mode}</p>
          <button
            className="p-2 text-lg cursor-pointer hover:bg-neutral-800"
            onClick={() => setMode("normal")}
          >
            <IoClose />
          </button>
        </div>
        <textarea
          ref={ref}
          placeholder="Enter folder name"
          className="p-2 border-1 min-h-20 max-h-100 border-neutral-800 outline-none ounded-md"
        />
        <button
          onClick={() => ref.current && addFolder(ref.current.value)}
          className="border-1 border-neutral-800 py-2 px-4 ounded-lg cursor-pointer hover:bg-neutral-800 duration-200"
        >
          Submit
        </button>
      </div>
      <div
        className="w-full h-full bg-black/50 absolute"
        onClick={() => setMode("normal")}
      ></div>
    </div>
  );
};

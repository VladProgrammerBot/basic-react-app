import { FiArrowLeft } from "react-icons/fi";
import { RiHistoryFill } from "react-icons/ri";
import { Hotkey } from "./HotKeyTip";

export const Navigation = () => {
  return (
    <div className="bg-neutral-800 flex overflow-hidden rounded-xl border border-neutral-700">
      <button className="flex items-center px-4 gap-1 hover:bg-neutral-700 cursor-pointer duration-150 border-r border-neutral-700">
        <FiArrowLeft />
        <Hotkey is={"H"} />
      </button>
      <button className="flex items-center px-4 gap-1 hover:bg-neutral-700 cursor-pointer duration-150">
        <RiHistoryFill />
        <Hotkey is={"P"} />
      </button>
    </div>
  );
};

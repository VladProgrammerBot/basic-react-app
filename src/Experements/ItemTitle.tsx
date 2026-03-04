import { HiArrowTurnDownRight } from "react-icons/hi2";
import { Hotkey } from "./HotKeyTip";

export const ItemTitle = () => {
  return (
    <div className="flex mb-2 text-sm items-center">
      <button className="flex items-center gap-1 p-1 px-2 rounded-2xl bg-neutral-700 text-neutral-400">
        2{<HiArrowTurnDownRight />}
        <Hotkey is="B" />
      </button>
      <p className="font-bold text-xl px-2">What is programming?</p>
    </div>
  );
};

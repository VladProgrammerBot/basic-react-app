import { HiArrowTurnDownRight } from "react-icons/hi2";
import { Hotkey } from "../ui-elements/HotKeyTip";
import { FaLink } from "react-icons/fa6";
import { Button } from "../ui-elements/Button";

export const ItemTitle = () => {
  return (
    <div className="flex mb-2 text-sm items-center justify-between">
      <span className="flex items-center">
        <Button className="text-neutral-400">
          2{<HiArrowTurnDownRight />}
          <Hotkey is="B" />
        </Button>
        <p className="font-bold text-xl px-2">What is programming?</p>
      </span>
      <Button className="py-2">
        <FaLink fontSize={17} />
        <Hotkey is="R" />
      </Button>
    </div>
  );
};

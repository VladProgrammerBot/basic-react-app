import { Hotkey } from "./HotKeyTip";
import { PiMouseLeftClickFill, PiMouseRightClickFill } from "react-icons/pi";

export const TipForRelated = () => {
  return (
    <div className="flex gap-1">
      <Hotkey icon={<PiMouseLeftClickFill />} is="Show related items" />
      <Hotkey icon={<PiMouseRightClickFill />} is="Context menu" />
      <Hotkey is="j,k to choose item" />
    </div>
  );
};

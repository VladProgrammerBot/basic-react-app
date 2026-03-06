import { FiArrowLeft } from "react-icons/fi";
import { Hotkey } from "../ui-elements/HotKeyTip";
import { HiddenCrumbs } from "@/pages/workspace2/cards/header/hiddenCrumbs";
import store from "@/state/store";
import { usePath } from "@/hooks/folders/usePath";

export const Navigation = () => {
  const path = store.use.path();
  const { moveOut } = usePath();
  return (
    <div className="bg-neutral-800 flex overflow-hidden rounded-xl">
      <button
        onClick={() => path.length !== 1 && moveOut(path.length - 2)}
        className="flex items-center px-4 gap-1 hover:bg-neutral-700 cursor-pointer duration-150 border-r border-neutral-700"
      >
        <FiArrowLeft />
        <Hotkey is={"H"} />
      </button>
      <HiddenCrumbs />
    </div>
  );
};

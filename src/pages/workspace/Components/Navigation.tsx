import { FiArrowLeft } from "react-icons/fi";
import { Hotkey } from "../ui-elements/HotKeyTip";
import { NavigationHistory } from "@/pages/workspace/Components/NavigationHistory";
import store from "@/state/store";
import { usePath } from "@/hooks/folders/usePath";

export const Navigation = () => {
  const path = store.use.path();
  const { moveOut } = usePath();
  const designMode = store.use.designMode();

  return (
    <div className="text-xl flex overflow-hidden">
      {designMode !== "Minimalistic" && (
        <button
          onClick={() => path.length !== 1 && moveOut(path.length - 2)}
          className="flex items-center rounded-xl px-4 gap-1 hover:bg-neutral-700 cursor-pointer duration-150"
        >
          <FiArrowLeft />
          <Hotkey is={"H"} />
        </button>
      )}
      <NavigationHistory />
    </div>
  );
};

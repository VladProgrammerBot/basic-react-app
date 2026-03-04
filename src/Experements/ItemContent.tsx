import { HiArrowTurnDownRight } from "react-icons/hi2";
import { Hotkey } from "./HotKeyTip";
import { ConnectedItem } from "./ConnectedItem";
import { TipForRelated } from "./TipForRelated";

export const ItemContent = () => {
  return (
    <div className="rounded-xl border border-neutral-700 bg-neutral-100 dark:bg-neutral-800">
      <div className="p-2">
        <div className="flex mb-2 text-sm items-center">
          <button className="flex items-center gap-1 p-1 px-2 rounded-2xl bg-neutral-700 text-neutral-400">
            2<HiArrowTurnDownRight />
            <Hotkey is="B" />
          </button>
          <p className="font-bold text-xl px-2">What is programming?</p>
        </div>
        <TipForRelated />
        <ul className="space-y-1 mt-1">
          {[
            "Kanban",
            "Ideas",
            "Запамятай: жодних машин!!!",
            "Спробувати зробити лідирующі інструменти (у кожен момент) чіткішими та прагнути максимуму гучності у важливих частинах як у анімалс, там де баси високі ліди мають бути гучними",
          ].map((title, index) => (
            <ConnectedItem key={index} title={title} />
          ))}
        </ul>
        <div className="border border-white/20 rounded-xl border-dashed flex items-center w-full mt-1 ">
          <Hotkey className="ml-2" is="A" />
          <input
            className="outline-none w-full placeholder:text-white/30 px-4 flex-1"
            placeholder="Add note and connect to it"
          />
          <button className="py-1 px-4 m-1 cursor-pointer flex rounded-xl bg-neutral-700 border border-neutral-600">
            +
            <Hotkey is="Enter" />
          </button>
        </div>
      </div>
    </div>
  );
};

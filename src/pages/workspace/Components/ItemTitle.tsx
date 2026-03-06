import { HiArrowTurnDownRight } from "react-icons/hi2";
import { Hotkey } from "../ui-elements/HotKeyTip";
import { FaLink } from "react-icons/fa6";
import { Button } from "../ui-elements/Button";
import store from "@/state/store";
import { Bar } from "./Bar";

export const ItemTitle = () => {
  const folders = store.use.folders();
  const path = store.use.path();
  const isStyled = store.use.isStyled();
  const item = folders[path[path.length - 1].id];
  const itemBacklinks = (
    <>
      2{isStyled && <HiArrowTurnDownRight />}
      <Hotkey is="B" />
    </>
  );

  return (
    <div className="flex items-start justify-between mb-1">
      <span className="flex items-start">
        <Button className="text-neutral-400">{itemBacklinks}</Button>
        <p className="font-bold text-xl px-2">{item?.title}</p>
      </span>
      {isStyled && (
        <Button className="py-2">
          <FaLink fontSize={17} />
          <Hotkey is="R" />
        </Button>
      )}
      {!isStyled && <Bar />}
    </div>
  );
};

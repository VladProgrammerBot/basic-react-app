import type { ReactNode } from "react";
import { Hotkey } from "./HotKeyTip";

export const Button = ({
  icon,
  hotkey,
}: {
  icon: ReactNode;
  hotkey: string;
}) => {
  return (
    <div className="flex gap-1 items-center px-4 border border-neutral-600 bg-neutral-800 hover:bg-neutral-700 duration-150 cursor-pointer rounded-xl">
      {icon}
      <Hotkey is={hotkey} />
    </div>
  );
};

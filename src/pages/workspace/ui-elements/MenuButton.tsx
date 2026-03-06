import type { ReactNode } from "react";
import { Hotkey } from "./HotKeyTip";

export const MenuButton = ({
  icon,
  hotkey,
  ...props
}: React.ComponentProps<"button"> & {
  icon: ReactNode;
  hotkey?: string;
}) => {
  return (
    <button
      className="flex gap-1 items-center px-4 py-3 border border-neutral-600 bg-neutral-800 hover:bg-neutral-700 duration-150 cursor-pointer rounded-xl"
      {...props}
    >
      {icon}
      {hotkey && <Hotkey is={hotkey} />}
    </button>
  );
};

import type { ReactNode } from "react";
import { Hotkey } from "./HotKeyTip";
import store from "@/state/store";

export const MenuButton = ({
  icon,
  hotkey,
  ...props
}: React.ComponentProps<"button"> & {
  icon: ReactNode;
  hotkey?: string;
}) => {
  const isStyled = store.use.isStyled();

  return (
    <button
      className={`flex gap-1 items-center hover:bg-neutral-700 duration-150 cursor-pointer rounded-xl py-2 px-4 ${isStyled && " border border-neutral-600 bg-neutral-800"}`}
      {...props}
    >
      {icon}
      {hotkey && <Hotkey is={hotkey} />}
    </button>
  );
};

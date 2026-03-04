import { IoClose, IoSearchOutline } from "react-icons/io5";
import { Hotkey } from "./HotKeyTip";
import { MenuButton } from "./Button";

export const SearchInput = () => {
  return (
    <>
      <div className="flex flex-1 items-center gap-2 pl-4 p-2 border border-neutral-700 bg-neutral-800 rounded-xl">
        <IoSearchOutline size={25} />
        <input
          type="text"
          placeholder="Search item"
          className="outline-none w-full bg-transparent"
        />
        <Hotkey is="S" />
      </div>
      <MenuButton icon={<IoClose />} hotkey="Esc" />
    </>
  );
};

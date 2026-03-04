import { IoClose } from "react-icons/io5";
import { IoMdAdd } from "react-icons/io";
import { useEffect } from "react";
import { ItemContent } from "./ItemContent";
import { SearchedItems } from "./SearchedItems";
import { SearchInput } from "./SearchInput";
import { Button } from "./Button";
import { FiArrowLeft } from "react-icons/fi";
import { RiHistoryFill } from "react-icons/ri";
import { Hotkey } from "./HotKeyTip";

export const Experements = () => {
  const isSearch = false;

  useEffect(() => {
    document.addEventListener("contextmenu", (e) => e.preventDefault());
  }, []);

  return (
    <div className="p-2 max-w-xl mx-auto">
      <div className="flex justify-between mb-1 gap-1">
        <div className="bg-neutral-800 flex overflow-hidden rounded-xl border border-neutral-700">
          <button className="flex items-center px-4 gap-1 hover:bg-neutral-700 cursor-pointer duration-150 border-r border-neutral-700"><FiArrowLeft /><Hotkey is={"H"} /></button>
          <button className="flex items-center px-4 gap-1 hover:bg-neutral-700 cursor-pointer duration-150"><RiHistoryFill /><Hotkey is={"P"} /></button>
        </div>
        <SearchInput />
        {isSearch ? (
          <Button icon={<IoClose />} hotkey="Esc" />
        ) : (
          <Button icon={<IoMdAdd />} hotkey="Shift+A" />
        )}
      </div>
      {isSearch ? <SearchedItems /> : <ItemContent />}
    </div>
  );
};

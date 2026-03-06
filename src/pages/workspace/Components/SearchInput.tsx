import { IoClose, IoSearchOutline } from "react-icons/io5";
import { Hotkey } from "../ui-elements/HotKeyTip";
import { MenuButton } from "../ui-elements/MenuButton";
import store from "@/state/store";
import { useEffect, useRef } from "react";
import { useSearch } from "@/hooks/folders/useSearch";

export const SearchInput = () => {
  const mode = store.use.mode();
  const isStyled = store.use.isStyled();
  const InputRef = useRef<HTMLInputElement | null>(null);
  const setMode = store.use.setMode();
  const { searchValue, setSearchValue } = useSearch();

  useEffect(() => {
    if (mode === "Filter") {
      InputRef.current?.focus();
    }
  }, [mode]);

  return (
    <>
      <div
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            e.preventDefault();
            setMode("Filter Result");
            InputRef.current?.blur();
          } 
          if (e.key === "Escape") {
            InputRef.current?.blur();
          }
        }}
        className="flex flex-1 items-center gap-2 pl-4 p-2 bg-neutral-800 rounded-xl"
      >
        <IoSearchOutline size={25} />
        <input
          ref={InputRef}
          onFocus={() => setMode("Filter")}
          type="text"
          placeholder="Search item"
          className="outline-none w-full bg-transparent"
          value={searchValue} // Прив'язуємо значення
          onChange={(e) => setSearchValue(e.target.value)}
        />
        <Hotkey is="S" />
      </div>
      {(mode === "Filter" || mode === "Filter Result") && isStyled && (
        <MenuButton
          onClick={() => setMode("normal")}
          icon={<IoClose />}
          hotkey="Esc"
        />
      )}
    </>
  );
};

import { useEffect, useRef, useState } from "react";
import store from "@/state/store";

import { IoSearch } from "react-icons/io5";

export const SearchInput = () => {
  
  const ref = useRef<HTMLInputElement | null>(null);
  const setMode = store((state) => state.setMode);
  const filteredElements = store.use.filteredElements();


  useEffect(() => {
    ref.current?.focus();
  }, []);

  

  return (
    <>
      <div
        className={`flex items-center gap-4 px-4 py-2 w-full bg-white/5 border-1 backdrop-blur-sm dark:border-white/20 border-neutral-400 rounded-md`}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            e.preventDefault();
            setMode("Filter Result");
            ref.current?.blur();
          } else if (e.key === "Escape") {
            setMode("normal");
          }
        }}
      >
        <IoSearch />
        <input
          ref={ref}
          value={searchValue} // Прив'язуємо значення
          onChange={(e) => setSearchValue(e.target.value)} // Оновлюємо state
          placeholder={"Search element"}
          className="w-full outline-none resize-none"
        />
      </div>
      {isLoading ? (
        <div className="p-2 text-neutral-500 dark:text-neutral-400">
          Loading...
        </div>
      ) : filteredElements.length === 0 ? (
        <div className="p-2 text-neutral-500 dark:text-neutral-400">
          No elements found
        </div>
      ) : null}
    </>
  );
};

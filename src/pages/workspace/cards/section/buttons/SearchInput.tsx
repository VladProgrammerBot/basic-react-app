import { useEffect, useRef, useState } from "react";
import store from "@/state/store";
import { useAlerts } from "@/hooks/useAlerts";
import useDebounce from "@/hooks/useDebounce";

export const SearchInput = () => {
  const [searchValue, setSearchValue] = useState("");
  const ref = useRef<HTMLInputElement | null>(null);
  const setMode = store((state) => state.setMode);
  const setFilterElements = store.use.setFilterElements();
  const api = import.meta.env.VITE_API;
  const { alertError } = useAlerts();

  useEffect(() => {
    ref.current?.focus();
  }, []);

  const debouncedSearch = useDebounce(searchValue, 400);
  useEffect(() => {
    console.log("debouncedSearch", debouncedSearch);
    if (debouncedSearch) {
      handleSearch(debouncedSearch);
    }
  }, [debouncedSearch]);

  const handleSearch = async (value: string) => {
    try {
      await fetch(api + "/folders/getbykeyword", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          keyword: value,
          token: localStorage.getItem("token"),
        }),
      })
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
          setFilterElements(data);
        });
    } catch (error) {
      alertError("get folders");
    }
  };

  return (
    <div
      className={`pr-1 pb-1 w-full bg-white/5 border-1 backdrop-blur-sm dark:border-white/20 border-neutral-400 rounded-md`}
      onKeyDown={(e) => {
        if (e.key === "Enter") {
          e.preventDefault();
          handleSearch(ref.current?.value || "");
        } else if (e.key === "Escape") {
          setMode("normal");
        }
      }}
    >
      <input
        ref={ref}
        value={searchValue} // Прив'язуємо значення
        onChange={(e) => setSearchValue(e.target.value)} // Оновлюємо state
        placeholder={"Search element"}
        className="px-4 py-2 w-full outline-none resize-none"
      />
    </div>
  );
};

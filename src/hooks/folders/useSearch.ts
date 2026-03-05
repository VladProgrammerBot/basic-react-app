import useDebounce from "@/hooks/useDebounce";
import { useAlerts } from "@/hooks/useAlerts";
import store from "@/state/store";
import { useEffect, useState } from "react";

export const useSearch = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const setFilterElements = store.use.setFilterElements();
  const api = import.meta.env.VITE_API;
  const { alertError } = useAlerts();
  const setSelectedItemId = store.use.setSelectedItemId();

  const debouncedSearch = useDebounce(searchValue, 400);
  useEffect(() => {
    if (debouncedSearch) {
      handleSearch(debouncedSearch);
    } else {
      setFilterElements([]);
    }
  }, [debouncedSearch]);

  const handleSearch = async (value: string) => {
    setSelectedItemId(0);
    setIsLoading(true);
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
          setFilterElements(data);
        });
    } catch (error) {
      alertError("get folders");
    }
    setIsLoading(false);
  };

  return {setSearchValue, searchValue}
};

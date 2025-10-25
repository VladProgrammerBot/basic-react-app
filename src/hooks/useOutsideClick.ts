import { useEffect, useRef, type RefObject } from "react";
import store from "@/state/store";

export const useOutsideClick = () => {
  const { setMenuValue } = store()
  const wrapperRef = useRef<HTMLDivElement>(null);
  useOutsideAlerter(wrapperRef);

  function useOutsideAlerter(ref: RefObject<HTMLDivElement | null>) {
    useEffect(() => {
      function handleClickOutside(event: MouseEvent) {
        if (ref.current && !ref.current.contains(event.target as Node)) {
          setMenuValue(null)
        }
      }
      document.addEventListener("mousedown", handleClickOutside);
      return () => {
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }, [ref]);
  }

  return wrapperRef;
};

import { useEffect, useRef, type RefObject } from "react";
import foldersState from "../state/stateFolders";

export const useOutsideClick = () => {
  const { setSelect } = foldersState()
  const wrapperRef = useRef<HTMLDivElement>(null);
  useOutsideAlerter(wrapperRef);

  function useOutsideAlerter(ref: RefObject<HTMLDivElement | null>) {
    useEffect(() => {
      function handleClickOutside(event: MouseEvent) {
        if (ref.current && !ref.current.contains(event.target as Node)) {
          setSelect(null)
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

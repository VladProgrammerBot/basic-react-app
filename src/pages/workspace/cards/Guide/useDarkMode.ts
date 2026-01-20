import { useState, useEffect } from "react";

export const useDarkMode = () => {
  const [isDarkMode, setIsDarkMode] = useState<boolean>(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    setIsDarkMode(mediaQuery.matches);
    const handler = (e: MediaQueryListEvent) => setIsDarkMode(e.matches);
    mediaQuery.addEventListener("change", handler);
    return () => mediaQuery.removeEventListener("change", handler);
  }, []);

  return isDarkMode;
};
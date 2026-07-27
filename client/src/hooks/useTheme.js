import { useCallback, useEffect } from "react";
import { STORAGE_KEYS } from "../constants";
import { useLocalStorage } from "./useLocalStorage";

function getSystemPreference() {
  return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
}

export function useTheme() {
  const [theme, setTheme] = useLocalStorage(STORAGE_KEYS.THEME, getSystemPreference());

  useEffect(() => {
    const root = document.documentElement;
    root.classList.toggle("dark", theme === "dark");
  }, [theme]);

  const toggleTheme = useCallback(() => {
    setTheme((prev) => (prev === "dark" ? "light" : "dark"));
  }, [setTheme]);

  return { theme, toggleTheme };
}

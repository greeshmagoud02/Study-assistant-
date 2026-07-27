import { useCallback } from "react";
import { MAX_HISTORY_ITEMS, STORAGE_KEYS } from "../constants";
import { useLocalStorage } from "./useLocalStorage";

export function useHistory() {
  const [history, setHistory] = useLocalStorage(STORAGE_KEYS.HISTORY, []);

  const addEntry = useCallback(
    (entry) => {
      setHistory((prev) => {
        const next = [
          { ...entry, id: crypto.randomUUID(), createdAt: Date.now() },
          ...prev,
        ];
        return next.slice(0, MAX_HISTORY_ITEMS);
      });
    },
    [setHistory]
  );

  const removeEntry = useCallback(
    (id) => {
      setHistory((prev) => prev.filter((item) => item.id !== id));
    },
    [setHistory]
  );

  const clearHistory = useCallback(() => setHistory([]), [setHistory]);

  return { history, addEntry, removeEntry, clearHistory };
}

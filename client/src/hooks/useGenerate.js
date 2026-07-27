import { useCallback, useRef, useState } from "react";
import { generateContent } from "../api/generate";

/**
 * Drives a single "generate" request lifecycle. Any in-flight request is
 * aborted the moment a newer one starts, so a slow first response can never
 * clobber a faster later one (race-condition safety via AbortController).
 */
export function useGenerate() {
  const [status, setStatus] = useState("idle"); // idle | loading | success | error
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const abortControllerRef = useRef(null);

  const generate = useCallback(async (text, mode) => {
    abortControllerRef.current?.abort();

    const controller = new AbortController();
    abortControllerRef.current = controller;

    setStatus("loading");
    setError(null);

    try {
      const result = await generateContent({ text, mode, signal: controller.signal });

      if (controller.signal.aborted) return;

      setData(result);
      setStatus("success");
    } catch (err) {
      if (err.isCancelled || controller.signal.aborted) return;

      setError(err.message);
      setStatus("error");
    }
  }, []);

  const reset = useCallback(() => {
    abortControllerRef.current?.abort();
    setStatus("idle");
    setData(null);
    setError(null);
  }, []);

  const loadCached = useCallback((cachedData) => {
    abortControllerRef.current?.abort();
    setStatus("success");
    setData(cachedData);
    setError(null);
  }, []);

  return { status, data, error, generate, reset, loadCached, isLoading: status === "loading" };
}

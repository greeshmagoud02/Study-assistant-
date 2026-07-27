import { useEffect, useRef, useState } from "react";

export function useQuizTimer(isRunning) {
  const [elapsedSeconds, setElapsedSeconds] = useState(0);
  const intervalRef = useRef(null);

  useEffect(() => {
    if (!isRunning) {
      clearInterval(intervalRef.current);
      return undefined;
    }

    intervalRef.current = setInterval(() => {
      setElapsedSeconds((prev) => prev + 1);
    }, 1000);

    return () => clearInterval(intervalRef.current);
  }, [isRunning]);

  const reset = () => setElapsedSeconds(0);

  return { elapsedSeconds, reset };
}

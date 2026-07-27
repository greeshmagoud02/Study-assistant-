import { formatTime } from "../../utils/formatTime";

export function QuizTimer({ elapsedSeconds }) {
  return (
    <div className="flex items-center gap-1.5 rounded-lg bg-gray-100 px-3 py-1.5 text-xs font-semibold tabular-nums text-gray-600 dark:bg-gray-800 dark:text-gray-300">
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <circle cx="12" cy="12" r="9" />
        <path d="M12 7v5l3 3" />
      </svg>
      {formatTime(elapsedSeconds)}
    </div>
  );
}

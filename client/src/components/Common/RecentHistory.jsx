import { Badge } from "./Badge";

function timeAgo(timestamp) {
  const seconds = Math.floor((Date.now() - timestamp) / 1000);
  if (seconds < 60) return "just now";
  const minutes = Math.floor(seconds / 60);
  if (minutes < 60) return `${minutes}m ago`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours}h ago`;
  return `${Math.floor(hours / 24)}d ago`;
}

export function RecentHistory({ history, onSelect, onRemove, onClear }) {
  if (history.length === 0) return null;

  return (
    <div className="mt-10">
      <div className="mb-3 flex items-center justify-between">
        <h3 className="text-sm font-semibold text-gray-600 dark:text-gray-300">Recent sessions</h3>
        <button
          onClick={onClear}
          className="text-xs font-medium text-gray-400 hover:text-red-500 dark:text-gray-600 dark:hover:text-red-400"
        >
          Clear all
        </button>
      </div>

      <div className="grid gap-2 sm:grid-cols-2">
        {history.map((entry) => (
          <div
            key={entry.id}
            className="group flex items-center justify-between rounded-xl border border-gray-200 bg-white p-3.5 text-left transition-colors hover:border-brand-300 dark:border-gray-800 dark:bg-gray-900 dark:hover:border-brand-800"
          >
            <button onClick={() => onSelect(entry)} className="flex min-w-0 flex-1 items-center gap-3 text-left">
              <Badge tone={entry.mode === "quiz" ? "brand" : "green"}>
                {entry.mode === "quiz" ? "Quiz" : "Cards"}
              </Badge>
              <div className="min-w-0">
                <p className="truncate text-sm font-medium text-gray-800 dark:text-gray-100">
                  {entry.title}
                </p>
                <p className="text-xs text-gray-400 dark:text-gray-600">{timeAgo(entry.createdAt)}</p>
              </div>
            </button>
            <button
              onClick={() => onRemove(entry.id)}
              aria-label="Remove from history"
              className="ml-2 shrink-0 rounded-lg p-1.5 text-gray-300 opacity-0 transition-opacity hover:bg-gray-100 hover:text-gray-500 group-hover:opacity-100 dark:text-gray-700 dark:hover:bg-gray-800"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M18 6L6 18M6 6l12 12" />
              </svg>
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

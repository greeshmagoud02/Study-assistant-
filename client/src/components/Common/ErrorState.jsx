import { Button } from "./Button";

export function ErrorState({ message, onRetry }) {
  return (
    <div className="flex flex-col items-center justify-center rounded-2xl border border-red-200 bg-red-50 px-6 py-14 text-center dark:border-red-900/50 dark:bg-red-950/30 animate-fade-in">
      <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-red-100 text-2xl dark:bg-red-900/50">
        ⚠️
      </div>
      <h3 className="text-lg font-semibold text-red-800 dark:text-red-200">
        Something went wrong
      </h3>
      <p className="mt-2 max-w-sm text-sm text-red-600 dark:text-red-300">
        {message || "We couldn't generate your content. Please try again."}
      </p>
      {onRetry && (
        <Button variant="danger" className="mt-6" onClick={onRetry}>
          Retry
        </Button>
      )}
    </div>
  );
}

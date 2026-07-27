import { cn } from "../../utils/cn";

function ShimmerBlock({ className }) {
  return (
    <div
      className={cn(
        "rounded-lg bg-gray-200 bg-[length:1000px_100%] bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 animate-shimmer",
        "dark:bg-gray-800 dark:from-gray-800 dark:via-gray-700 dark:to-gray-800",
        className
      )}
    />
  );
}

export function SkeletonLoader({ variant = "flashcards" }) {
  if (variant === "quiz") {
    return (
      <div className="space-y-4">
        <ShimmerBlock className="h-6 w-1/3" />
        <div className="space-y-3 rounded-2xl border border-gray-200 p-6 dark:border-gray-800">
          <ShimmerBlock className="h-5 w-4/5" />
          <div className="grid gap-2 pt-2">
            {[0, 1, 2, 3].map((i) => (
              <ShimmerBlock key={i} className="h-10 w-full" />
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <ShimmerBlock className="h-6 w-1/3" />
      <ShimmerBlock className="h-64 w-full rounded-2xl" />
      <div className="flex justify-center gap-3">
        <ShimmerBlock className="h-10 w-24" />
        <ShimmerBlock className="h-10 w-24" />
      </div>
    </div>
  );
}

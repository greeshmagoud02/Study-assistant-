import { cn } from "../../utils/cn";

export function Card({ children, className, ...props }) {
  return (
    <div
      className={cn(
        "rounded-2xl border border-gray-200/80 bg-white shadow-sm",
        "dark:border-gray-800 dark:bg-gray-900",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}

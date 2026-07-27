import { cn } from "../../utils/cn";

const VARIANTS = {
  primary:
    "bg-brand-600 text-white hover:bg-brand-700 active:bg-brand-800 shadow-sm shadow-brand-600/30 disabled:hover:bg-brand-600",
  secondary:
    "bg-white text-gray-800 border border-gray-200 hover:bg-gray-50 active:bg-gray-100 dark:bg-gray-900 dark:text-gray-100 dark:border-gray-800 dark:hover:bg-gray-800",
  ghost:
    "bg-transparent text-gray-600 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800",
  danger: "bg-red-600 text-white hover:bg-red-700 active:bg-red-800",
};

const SIZES = {
  sm: "text-sm px-3 py-1.5 gap-1.5",
  md: "text-sm px-4 py-2.5 gap-2",
  lg: "text-base px-6 py-3 gap-2",
};

export function Button({
  children,
  variant = "primary",
  size = "md",
  icon,
  className,
  disabled,
  ...props
}) {
  return (
    <button
      disabled={disabled}
      className={cn(
        "inline-flex items-center justify-center rounded-xl font-semibold transition-all duration-150",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 focus-visible:ring-offset-2 dark:focus-visible:ring-offset-gray-950",
        "disabled:opacity-50 disabled:cursor-not-allowed disabled:shadow-none",
        "active:scale-[0.98]",
        VARIANTS[variant],
        SIZES[size],
        className
      )}
      {...props}
    >
      {icon}
      {children}
    </button>
  );
}

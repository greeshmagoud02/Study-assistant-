import { cn } from "../../utils/cn";
import { MAX_INPUT_CHARS } from "../../constants";

export function TextArea({ value, onChange, placeholder, disabled, className }) {
  const count = value.length;
  const isNearLimit = count > MAX_INPUT_CHARS * 0.9;
  const isOverLimit = count > MAX_INPUT_CHARS;

  return (
    <div className={cn("relative", className)}>
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        disabled={disabled}
        rows={10}
        maxLength={MAX_INPUT_CHARS}
        className={cn(
          "w-full resize-y rounded-2xl border border-gray-200 bg-white p-5 pb-9 text-base leading-relaxed text-gray-900 placeholder:text-gray-400",
          "shadow-sm transition-colors focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-500/30",
          "dark:border-gray-800 dark:bg-gray-900 dark:text-gray-100 dark:placeholder:text-gray-600",
          disabled && "cursor-not-allowed opacity-60"
        )}
      />
      <span
        className={cn(
          "pointer-events-none absolute bottom-3 right-4 text-xs font-medium tabular-nums",
          isOverLimit ? "text-red-500" : isNearLimit ? "text-amber-500" : "text-gray-400 dark:text-gray-600"
        )}
      >
        {count.toLocaleString()} / {MAX_INPUT_CHARS.toLocaleString()}
      </span>
    </div>
  );
}

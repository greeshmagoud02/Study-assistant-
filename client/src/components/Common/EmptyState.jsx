export function EmptyState({
  icon = "✨",
  title = "Nothing here yet",
  description = "Paste your notes above and generate flashcards or a quiz to get started.",
  action,
}) {
  return (
    <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-gray-300 px-6 py-16 text-center dark:border-gray-700 animate-fade-in">
      <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-brand-50 text-3xl dark:bg-brand-950">
        {icon}
      </div>
      <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-100">{title}</h3>
      <p className="mt-2 max-w-sm text-sm text-gray-500 dark:text-gray-400">{description}</p>
      {action && <div className="mt-6">{action}</div>}
    </div>
  );
}

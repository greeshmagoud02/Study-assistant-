export function Footer() {
  return (
    <footer className="mt-auto border-t border-gray-200/80 py-6 dark:border-gray-800/80">
      <div className="mx-auto max-w-5xl px-4 text-center text-xs text-gray-400 sm:px-6 dark:text-gray-600">
        Built with React, Express &amp; Claude · Study Assistant &copy; {new Date().getFullYear()}
      </div>
    </footer>
  );
}

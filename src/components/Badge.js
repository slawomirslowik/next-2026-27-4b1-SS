export default function Badge({ children }) {
  return (
    <span className="inline-block rounded-full bg-blue-100 px-3 py-1 text-sm font-medium text-blue-800 dark:bg-blue-900 dark:text-blue-200">
      {children}
    </span>
  );
}

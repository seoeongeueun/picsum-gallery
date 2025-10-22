export function debounce<T extends (...args: unknown[]) => void>(
  fn: T,
  delay = 200
) {
  let timeoutId: ReturnType<typeof setTimeout>;
  return (...args: Parameters<T>) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => fn(...args), delay);
  };
}

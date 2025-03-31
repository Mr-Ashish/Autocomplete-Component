export function debounceWrapper<T extends (...args: any[]) => void>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: ReturnType<typeof setTimeout>;
  return (...args: Parameters<T>) => {
    if (timeout) clearTimeout(timeout);
    timeout = setTimeout(() => {
      func(...args);
    }, wait);
  };
}

export const getHighlightedText = (
  text: string,
  highlight: string
): React.ReactNode => {
  if (!highlight) return text;

  const regex = new RegExp(`(${highlight})`, "i");
  const parts = text.split(regex);

  return parts.map((part, i) =>
    regex.test(part) ? <mark key={i}>{part}</mark> : <span key={i}>{part}</span>
  );
};

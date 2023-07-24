export function debounce(callback: () => void, time: number) {
  let interval: NodeJS.Timeout | null;
  return () => {
    interval && clearTimeout(interval);
    interval = setTimeout(() => {
      interval = null;
      callback();
    }, time);
  };
}
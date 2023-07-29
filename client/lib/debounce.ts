export function debounce<T>(callback: (params: T) => void, time: number) {
  let timeout: NodeJS.Timeout | null;
  return (params: T) => {
    timeout && clearTimeout(timeout);

    timeout = setTimeout(() => {
      callback(params);
    }, time);
  };
}
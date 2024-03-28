type DebounceFunction = (...args: any[]) => void;

export const debounce = (cb: any, delay: number): DebounceFunction => {
  let timer: NodeJS.Timeout;

  return (...args: any[]): void => {
    clearTimeout(timer);
    timer = setTimeout(() => cb(...args), delay);
  };
};

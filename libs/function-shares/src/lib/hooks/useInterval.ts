import { useEffect, useRef } from 'react';
export function useInterval(callback: () => void, delay: number | null) {
  const savedCallback = useRef<() => void>();

  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  useEffect(() => {
    function cb() {
      savedCallback.current && savedCallback.current();
    }
    if (delay !== null) {
      const id = setInterval(cb, delay);
      return () => clearInterval(id);
    }
  }, [delay]);
}

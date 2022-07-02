import { useState, useCallback, useEffect } from "react";

interface InfinityOption {
  root?: Element | null;
  rootMargin?: string;
  threshold?: number | number[];
}

interface UseInfinityScrollArgs {
  options?: InfinityOption;
  callback: IntersectionObserverCallback;
  shouldObserve: boolean;
}

const initialOptions = { root: null, rootMargin: "0px", threshold: 0 };

const useInfinityScroll = ({
  shouldObserve,
  options = initialOptions,
  callback,
}: UseInfinityScrollArgs) => {
  const [target, setTarget] = useState<HTMLElement | null>(null);

  const setRef = useCallback((element: HTMLLIElement) => {
    setTarget(element);
  }, []);

  useEffect(() => {
    if (!target || !shouldObserve) return;
    const observer: IntersectionObserver = new IntersectionObserver(
      callback,
      options
    );
    observer.observe(target);
    return () => observer.disconnect();
  }, [options, shouldObserve, target, callback]);

  return setRef;
};

export default useInfinityScroll;

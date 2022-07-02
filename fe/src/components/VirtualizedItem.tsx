import { useEffect, useState } from "react";

interface props {
  children: React.ReactNode;
  height: number;
  offset?: number;
  isLoading: boolean;
}

const VirtualizedItem: React.FC<props> = ({
  children,
  isLoading,
  height,
  offset = 100,
}) => {
  const [isVisible, setIsVisible] = useState(true);
  const [itemRef, setItemRef] = useState<HTMLElement | null>(null);
  useEffect(() => {
    if (!itemRef) return;

    const options = {
      root: null,
      rootMargin: `${offset}px 0px ${offset}px 0px`,
      threshold: 0,
    };

    const callback: IntersectionObserverCallback = (entries) => {
      if (!itemRef) return;

      const isIntersecting = entries[0].isIntersecting;
      if (window !== undefined && window.requestIdleCallback) {
        window.requestIdleCallback(() => setIsVisible(isIntersecting), {
          timeout: 300,
        });
      } else {
        setIsVisible(isIntersecting);
      }
    };
    const observer: IntersectionObserver = new IntersectionObserver(
      callback,
      options
    );

    observer.observe(itemRef);
  }, [offset, itemRef]);

  return (
    <li ref={setItemRef}>
      {isVisible ? (
        isLoading ? (
          <div
            style={{ height }}
            className='bg-gray-300 w-[384px] animate-pulse rounded-md shadow md:'
          />
        ) : (
          <>{children}</>
        )
      ) : (
        <div
          style={{ height }}
          className='bg-gray-300 w-[384px] rounded-md shadow md'
        ></div>
      )}
    </li>
  );
};

export default VirtualizedItem;

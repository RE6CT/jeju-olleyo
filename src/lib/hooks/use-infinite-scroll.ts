import { useEffect, useRef } from 'react';

const useInfiniteScroll = (onIntersect: () => void) => {
  const ref = useRef<HTMLDivElement | null>(null);
  const triggeredRef = useRef(false); // 중복 방지

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !triggeredRef.current) {
        triggeredRef.current = true;
        onIntersect();
      }
    });

    if (ref.current) observer.observe(ref.current);

    return () => {
      observer.disconnect();
      triggeredRef.current = false;
    };
  }, [onIntersect]);

  return ref;
};

export default useInfiniteScroll;

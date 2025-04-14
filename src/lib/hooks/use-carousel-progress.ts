import { useEffect, useRef, useState, useCallback } from 'react';
import type { EmblaCarouselType } from 'embla-carousel';

export const useCarouselProgress = (
  api: EmblaCarouselType | null,
  duration: number,
  paused: boolean,
) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [totalCount, setTotalCount] = useState(0);
  const [progressWidth, setProgressWidth] = useState(0);

  const startTimeRef = useRef(Date.now());
  const rafRef = useRef<number | null>(null);

  const updateProgress = useCallback(() => {
    if (paused) return;
    const elapsed = Date.now() - startTimeRef.current;
    const progress = Math.min(100, (elapsed / duration) * 100);
    setProgressWidth(progress);

    if (progress < 100) {
      rafRef.current = requestAnimationFrame(updateProgress);
    }
  }, [duration, paused]);

  const resetProgress = useCallback(() => {
    setProgressWidth(0);
    startTimeRef.current = Date.now();
    if (!paused) {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      rafRef.current = requestAnimationFrame(updateProgress);
    }
  }, [paused, updateProgress]);

  useEffect(() => {
    if (!api) return;

    setTotalCount(api.scrollSnapList().length);
    setCurrentIndex(api.selectedScrollSnap());

    const onSelect = () => {
      setCurrentIndex(api.selectedScrollSnap());
      if (!paused) resetProgress();
    };

    api.on('select', onSelect);
    if (!paused) resetProgress();

    return () => {
      api.off('select', onSelect);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [api, duration, paused, resetProgress]);

  useEffect(() => {
    if (paused) {
      setProgressWidth(0);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    } else {
      resetProgress();
    }
  }, [paused, resetProgress]);

  return { currentIndex, totalCount, progressWidth };
};

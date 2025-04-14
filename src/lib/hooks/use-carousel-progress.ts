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

  // 진행 시작 시각 (progress가 새로 시작할 때의 기준 시각)
  const startTimeRef = useRef(Date.now());
  // requestAnimationFrame ID 보관
  const rafRef = useRef<number | null>(null);

  // 매 프레임마다 progress를 업데이트하는 함수
  const updateProgress = useCallback(() => {
    // 만약 진행중인 게 paused 상태라면 아무 작업 없이 종료
    if (paused) return;

    const elapsed = Date.now() - startTimeRef.current;
    const progress = Math.min(100, (elapsed / duration) * 100);
    setProgressWidth(progress);

    if (progress < 100) {
      rafRef.current = requestAnimationFrame(updateProgress);
    }
  }, [duration, paused]);

  // 진행률을 reset하는 함수 (슬라이드 전환 시 사용)
  const resetProgress = useCallback(() => {
    // progress를 0부터 시작하도록 리셋
    setProgressWidth(0);
    startTimeRef.current = Date.now();
    if (!paused) {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      rafRef.current = requestAnimationFrame(updateProgress);
    }
  }, [paused, updateProgress]);

  // embla API가 준비되었을 때, 초기 설정 및 이벤트 등록
  useEffect(() => {
    if (!api) return;

    setTotalCount(api.scrollSnapList().length);
    setCurrentIndex(api.selectedScrollSnap());

    const onSelect = () => {
      setCurrentIndex(api.selectedScrollSnap());
      if (!paused) {
        resetProgress();
      }
    };

    api.on('select', onSelect);
    if (!paused) {
      resetProgress();
    }

    return () => {
      api.off('select', onSelect);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [api, duration, paused, resetProgress]);

  // paused 상태 변화 감지: 호버 시에는 progress 0, 해제되면 새로 시작
  useEffect(() => {
    if (paused) {
      // 호버 중이면 progress를 0으로 고정하고 업데이트 중단
      setProgressWidth(0);
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
      }
    } else {
      // 호버 해제되면, 0부터 시작하도록 resetProgress 호출
      resetProgress();
    }
  }, [paused, resetProgress]);

  return { currentIndex, totalCount, progressWidth };
};

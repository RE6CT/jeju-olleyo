import { useEffect, useState } from 'react';

// 마우스 드래그 스크롤 기능 구현
const useDragScroll = (
  ref: React.RefObject<HTMLElement>,
  options = { threshold: 5 },
) => {
  const [isDragging, setIsDragging] = useState<boolean>(false);
  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    let isDown = false;
    let startX: number;
    let scrollLeft: number;
    let moveDistance = 0;

    const handleMouseDown = (e: MouseEvent) => {
      isDown = true;
      moveDistance = 0;
      element.classList.add('active');
      startX = e.pageX - element.offsetLeft;
      scrollLeft = element.scrollLeft;
    };

    const handleMouseLeave = () => {
      if (isDown) {
        setIsDragging(moveDistance > options.threshold);
      }
      isDown = false;
      element.classList.remove('active');
    };

    const handleMouseUp = () => {
      setIsDragging(moveDistance > options.threshold);
      isDown = false;
      element.classList.remove('active');

      setTimeout(() => {
        setIsDragging(false);
      }, 50);
    };

    const handleMouseMove = (e: MouseEvent) => {
      if (!isDown) return;
      e.preventDefault();
      const x = e.pageX - element.offsetLeft;
      const walk = x - startX;
      moveDistance = Math.abs(walk);
      setIsDragging(true);
      element.scrollLeft = scrollLeft - walk;
    };
    const handleTouchStart = (e: TouchEvent) => {
      isDown = true;
      moveDistance = 0;
      element.classList.add('active');
      startX = e.touches[0].pageX - element.offsetLeft;
      scrollLeft = element.scrollLeft;
    };

    const handleTouchEnd = () => {
      setIsDragging(moveDistance > options.threshold);
      isDown = false;
      element.classList.remove('active');

      setTimeout(() => {
        setIsDragging(false);
      }, 50);
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (!isDown) return;
      e.preventDefault();
      const x = e.touches[0].pageX - element.offsetLeft;
      const walk = x - startX;
      moveDistance = Math.abs(walk);
      setIsDragging(true);
      element.scrollLeft = scrollLeft - walk;
    };

    element.addEventListener('mousedown', handleMouseDown);
    element.addEventListener('mouseleave', handleMouseLeave);
    element.addEventListener('mouseup', handleMouseUp);
    element.addEventListener('mousemove', handleMouseMove);
    element.addEventListener('touchstart', handleTouchStart);
    element.addEventListener('touchend', handleTouchEnd);
    element.addEventListener('touchmove', handleTouchMove);

    return () => {
      element.removeEventListener('mousedown', handleMouseDown);
      element.removeEventListener('mouseleave', handleMouseLeave);
      element.removeEventListener('mouseup', handleMouseUp);
      element.removeEventListener('mousemove', handleMouseMove);
      element.removeEventListener('touchstart', handleTouchStart);
      element.removeEventListener('touchend', handleTouchEnd);
      element.removeEventListener('touchmove', handleTouchMove);
    };
  }, [ref, options.threshold]);
  return { isDragging };
};

export default useDragScroll;

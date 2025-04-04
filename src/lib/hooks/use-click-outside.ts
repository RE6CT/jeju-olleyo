import { RefObject, useEffect } from 'react';

/**
 * 지정된 요소 외부를 클릭했을 때 콜백을 실행하는 커스텀 훅
 *
 * @param refs - 클릭 감지에서 제외할 요소들의 RefObject 배열
 * @param callback - 외부 클릭 시 실행할 콜백 함수
 * @param enabled - 훅 활성화 여부 (기본값: true)
 */
const useClickOutside = (
  refs: RefObject<HTMLElement>[],
  callback: () => void,
  enabled: boolean = true,
): void => {
  useEffect(() => {
    if (!enabled) return;

    /**
     * 지정된 요소 외부 클릭을 감지하는 이벤트 핸들러
     * @param event - 마우스 이벤트
     */
    const handleClickOutside = (event: MouseEvent) => {
      // 이벤트 타겟이 refs 중 하나에 포함되어 있는지 확인
      const isOutside = refs.every(
        (ref) => !ref.current?.contains(event.target as Node),
      );

      if (isOutside) {
        callback();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [refs, callback, enabled]);
};

export default useClickOutside;

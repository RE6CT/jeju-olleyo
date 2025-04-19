import { useState } from 'react';

export const usePopover = () => {
  const [isOpen, setIsOpen] = useState(false);

  /**
   * 마우스가 요소 밖으로 나갈 때 팝오버를 닫는 함수
   * @param isElementFocused - 요소가 특정 element에 포커스를 가지고 있는지 여부
   */
  const handleMouseLeave = (isElementFocused: boolean) => {
    if (!isElementFocused) {
      setIsOpen(false);
    }
  };

  return {
    isOpen,
    setIsOpen,
    handleMouseLeave,
  };
};

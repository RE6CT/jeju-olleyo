import { useRouter } from 'next/navigation';
import { useRef, useState } from 'react';
import MypageModal from './mypage-modal';
import { ModalPath } from '@/types/mypage.type';
import useClickOutside from '@/lib/hooks/use-click-outside';

/**
 * 헤더 nav 내부의 마이페이지 모달 오픈 버튼
 */
const MypageButton = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const modalRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const router = useRouter();

  /** 모달을 닫는 함수 (isOpen-false) */
  const setClose = () => setIsOpen(false);

  // 모달 바깥 클릭 시 모달 닫기
  useClickOutside([modalRef, buttonRef], setClose, isOpen);

  /**
   * 마이페이지 버튼 클릭 시 실행되는 이벤트 핸들러
   * - 모달이 닫혀있으면 열리고, 열려있으면 닫힙니다.
   */
  const handleMypageModalToggle = () => {
    setIsOpen(!isOpen);
  };

  /**
   * 모달에서 링크 클릭 시 실행되는 이벤트 핸들러
   * @param path - 해당 링크의 path ("profile", "bookmarks" 등)
   */
  const handleLinkClick = (path: ModalPath) => {
    router.push(`/mypage/${path}`);
    setClose();
  };

  return (
    <>
      <button
        onClick={handleMypageModalToggle}
        ref={buttonRef}
        className="relative"
      >
        마이페이지
      </button>
      {isOpen && (
        <MypageModal
          onLinkClick={handleLinkClick}
          setClose={setClose}
          modalRef={modalRef}
        />
      )}
    </>
  );
};

export default MypageButton;

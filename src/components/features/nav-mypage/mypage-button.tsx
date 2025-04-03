import { useRouter } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import MypageModal from './mypage-modal';

/**
 * 헤더 nav 내부의 마이페이지 모달 오픈 버튼
 */
const MypageButton = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const modalRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const router = useRouter();

  useEffect(() => {
    /**
     * 모달 바깥을 눌렀을 때 닫히도록 하는 이벤트 리스너
     * @param event - (클릭) 이벤트
     */
    const handleClickOutside = (event: Event) => {
      // 모달, 트리거 버튼 제외 클릭 시 모달 닫기
      if (
        modalRef.current &&
        buttonRef.current &&
        !buttonRef.current.contains(event.target as Node) &&
        !modalRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  /**
   * 마이페이지 버튼 클릭 시 실행되는 이벤트 핸들러
   * - 모달이 닫혀있으면 열리고, 열려있으면 닫힙니다.
   */
  const handleMypageModalToggle = () => {
    setIsOpen(isOpen ? false : true);
  };

  /**
   * 모달에서 링크 클릭 시 실행되는 이벤트 핸들러
   * @param path - 해당 링크의 path ("profile", "bookmarks" 등)
   */
  const handleLinkClick = (path: string) => {
    router.push(`/mypage/${path}`);
    setIsOpen(false);
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
          setIsOpen={setIsOpen}
          modalRef={modalRef}
        />
      )}
    </>
  );
};

export default MypageButton;

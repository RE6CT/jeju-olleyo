'use client';

import { useRouter } from 'next/navigation';
import { useRef, useState, useEffect } from 'react';
import MypageModal from './mypage-modal';
import { ModalPath } from '@/types/mypage.type';
import useClickOutside from '@/lib/hooks/use-click-outside';
import useAuth from '@/lib/hooks/use-auth';
import useAuthCheck from '@/lib/hooks/use-auth-check';

/**
 * 헤더 nav 내부의 마이페이지 모달 오픈 버튼
 */
const MypageButton = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const modalRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const router = useRouter();
  const { isAuthenticated } = useAuthCheck();

  /** 모달을 닫는 함수 (isOpen-false) */
  const setClose = () => setIsOpen(false);

  // 모달 바깥 클릭 시 모달 닫기
  useClickOutside([modalRef, buttonRef], setClose, isOpen);

  /**
   * 마이페이지 버튼 클릭 시 실행되는 이벤트 핸들러
   * - 모달이 닫혀있으면 열리고, 열려있으면 닫힙니다.
   */
  const handleMypageModalToggle = () => {
    if (!isAuthenticated) {
      // 로그인되지 않은 경우 로그인 페이지로 리다이렉트
      router.push('/sign-in');
      return;
    }
    setIsOpen(!isOpen);
  };

  /**
   * 모달에서 링크 클릭 시 실행되는 이벤트 핸들러
   * @param path - 해당 링크의 path ("account", "bookmarks" 등)
   */
  const handleLinkClick = (path: ModalPath) => {
    if (!isAuthenticated) {
      router.push('/sign-in');
      return;
    }
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

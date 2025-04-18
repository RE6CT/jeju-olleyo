'use client';

import { useRouter } from 'next/navigation';
import { useRef, useState } from 'react';

import { PATH } from '@/constants/path.constants';
import useAuthCheck from '@/lib/hooks/use-auth-check';
import useClickOutside from '@/lib/hooks/use-click-outside';
import { ModalPath } from '@/types/mypage.type';

import MypageModal from './mypage-modal';

/**
 * 헤더 nav 내부의 마이페이지 모달 오픈 버튼
 * 화면 크기에 맞게 텍스트 크기가 조정됨
 */
const MypageButton = ({ userId }: { userId: string }) => {
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
      router.push(PATH.SIGNIN);
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
      router.push(PATH.SIGNIN);
      return;
    }
    router.push(path);
    setClose();
  };

  return (
    <div className="relative">
      <button
        onClick={handleMypageModalToggle}
        ref={buttonRef}
        className="whitespace-nowrap text-xs font-medium sm:text-xs md:text-sm lg:text-base"
      >
        마이페이지
      </button>
      {isOpen && (
        <MypageModal
          userId={userId}
          onLinkClick={handleLinkClick}
          setClose={setClose}
          modalRef={modalRef}
        />
      )}
    </div>
  );
};

export default MypageButton;

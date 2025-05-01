'use client';

import { usePathname, useRouter } from 'next/navigation';
import { useRef, useState } from 'react';

import { PATH } from '@/constants/path.constants';
import useAuthCheck from '@/lib/hooks/use-auth-check';
import useClickOutside from '@/lib/hooks/use-click-outside';
import { ModalPath } from '@/types/mypage.type';

import MypageModal from './mypage-modal';
import useAlert from '@/lib/hooks/use-alert';

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
  const { showQuestion } = useAlert();
  const pathname = usePathname();

  /** 현재 전체 URL 가져오기 (window 객체 사용) */
  const getCurrentUrl = () => {
    if (typeof window === 'undefined') return pathname;
    return window.location.pathname + window.location.search;
  };

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
      const currentUrl = getCurrentUrl();
      showQuestion(
        '로그인 필요',
        '일정을 만들기 위해서는 로그인이 필요합니다.\n로그인 페이지로 이동하시겠습니까?',
        {
          onConfirm: () =>
            router.push(
              `${PATH.SIGNIN}?redirectTo=${encodeURIComponent(currentUrl)}`,
            ),
          onCancel: () => {},
        },
      );
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
          className="right-0 top-10"
        />
      )}
    </div>
  );
};

export default MypageButton;

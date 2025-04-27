'use client';

import Link from 'next/link';
import HomeIcon from '../icons/home-icon';
import { PATH } from '@/constants/path.constants';
import CommunityIcon from '../icons/community-icon';
import AddIcon from '../icons/add-icon';
import CalendarIcon from '../icons/calendar-icon';
import MypageIcon from '../icons/mypage-icon';
import { usePathname, useRouter } from 'next/navigation';
import { useRef, useState } from 'react';
import useClickOutside from '@/lib/hooks/use-click-outside';
import useAuthCheck from '@/lib/hooks/use-auth-check';
import { ModalPath } from '@/types/mypage.type';
import MypageModal from '../features/nav-mypage/mypage-modal';
import useAuth from '@/lib/hooks/use-auth';

const LINK_STYLE =
  'flex h-[57px] w-[52px] flex-col items-center justify-end gap-[7px] regular-12';

/** 모바일 버전에서 나타나는 바텀 탭 */
const BottomNav = () => {
  const pathname = usePathname();
  const router = useRouter();

  const { isAuthenticated } = useAuthCheck();
  const { user } = useAuth();

  const [isOpen, setIsOpen] = useState<boolean>(false);
  const modalRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

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
    <nav className="bottom-tabs fixed bottom-0 flex w-full min-w-[375px] justify-between bg-white px-4 pb-5 pt-2 md:hidden">
      <Link href={PATH.HOME} className={LINK_STYLE}>
        <HomeIcon
          fill={pathname === PATH.HOME ? 'primary-300' : 'gray-300'}
          size={24}
        />
        <span
          className={`regular-12 ${pathname === PATH.HOME ? 'text-primary-300' : 'text-gray-300'}`}
        >
          홈
        </span>
      </Link>
      <Link href={PATH.COMMUNITY} className={LINK_STYLE}>
        <CommunityIcon
          fill={pathname === PATH.COMMUNITY ? 'primary-300' : 'gray-300'}
          size={24}
        />
        <span
          className={`${pathname === PATH.COMMUNITY ? 'text-primary-300' : 'text-gray-300'}`}
        >
          커뮤니티
        </span>
      </Link>
      <Link href={PATH.PLAN_NEW} className={LINK_STYLE}>
        <div className="rounded-full bg-primary-500">
          <AddIcon fill="white" size={31} />
        </div>
        <span className="text-gray-300">일정 작성</span>
      </Link>
      <Link href={PATH.MYPLAN} className={LINK_STYLE}>
        <CalendarIcon
          fill={pathname === PATH.MYPLAN ? 'primary-300' : 'gray-300'}
          size={24}
        />
        <span
          className={`${pathname === PATH.MYPLAN ? 'text-primary-300' : 'text-gray-300'}`}
        >
          내 여행
        </span>
      </Link>
      <div className="relative">
        <button
          className={LINK_STYLE}
          onClick={handleMypageModalToggle}
          ref={buttonRef}
        >
          <MypageIcon
            fill={pathname === PATH.ACCOUNT ? 'primary-300' : 'gray-300'}
            size={24}
          />
          <span
            className={`${pathname === PATH.ACCOUNT ? 'text-primary-300' : 'text-gray-300'}`}
          >
            마이페이지
          </span>
        </button>
        {isOpen && user?.id && (
          <MypageModal
            userId={user?.id}
            onLinkClick={handleLinkClick}
            setClose={setClose}
            modalRef={modalRef}
            className="bottom-[calc(100%+21px)] right-0"
          />
        )}
      </div>
    </nav>
  );
};

export default BottomNav;

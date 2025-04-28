'use client';

import { PATH } from '@/constants/path.constants';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

/**
 * 마이페이지에서 디스플레이 sm 이하일 때 사이드바 대신 표시할 상단 바
 */
const MypageTopTabs = ({ className }: { className?: string }) => {
  const pathname = usePathname();
  const firstPath = '/' + pathname.split('/')[1];

  return (
    <nav
      className={`medium-16 flex w-full justify-between bg-white md:hidden ${className}`}
    >
      <Link
        href={PATH.ACCOUNT}
        className={`w-full py-[10px] text-center ${firstPath === PATH.ACCOUNT ? 'border-b-2 border-secondary-300' : 'border-none'}`}
      >
        내 정보
      </Link>
      <Link
        href={PATH.BOOKMARKS}
        className={`w-full py-[10px] text-center ${firstPath === PATH.BOOKMARKS || firstPath === PATH.LIKES || firstPath === PATH.COMMENTS ? 'border-b-2 border-secondary-300' : 'border-none'}`}
      >
        내 활동
      </Link>
      <Link
        href={PATH.RESERVATIONS}
        className={`w-full py-[10px] text-center ${firstPath === PATH.RESERVATIONS ? 'border-b-2 border-secondary-300' : 'border-none'}`}
      >
        내 예약
      </Link>
    </nav>
  );
};

export default MypageTopTabs;

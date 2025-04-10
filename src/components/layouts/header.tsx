'use client';

import Link from 'next/link';
import SearchBar from './search-bar';
import MypageButton from '../features/nav-mypage/mypage-button';
import useAuthStore from '@/zustand/auth.store';
import { PATH } from '@/constants/path.constants';

/**
 * 반응형 헤더 컴포넌트
 * 4가지 화면 크기에 맞게 최적화:
 * - 기본(~480px): 모바일 세로
 * - sm(481px~768px): 모바일 가로, 태블릿 세로
 * - md(769px~1024px): 태블릿 가로, 노트북
 * - lg(1025px~): 데스크탑
 *
 * UI 위치는 유지하면서 검색바 길이와 텍스트 크기만 조정됨
 */
const Header = () => {
  const user = useAuthStore((state) => state.user);

  return (
    <header className="flex flex-col">
      <div className="flex h-14 w-full items-center justify-between gap-2 bg-white px-2 text-black sm:h-16 sm:gap-3 sm:px-4 md:h-20 md:gap-4 md:px-6 lg:h-24 lg:gap-6 lg:px-10">
        <div className="flex items-center gap-2 sm:gap-3 md:gap-6 lg:gap-12">
          <Link href={PATH.HOME} className="flex-shrink-0">
            <img
              src="/logo/color_logo.svg"
              alt="로고"
              className="h-5 w-auto sm:h-6 md:h-7 lg:h-8"
            />
          </Link>

          {/* 검색바 */}
          <div className="sm:w-68 lg:w-92 w-56 md:w-80">
            <SearchBar />
          </div>
        </div>

        <nav className="mr-1 flex items-center sm:mr-2 md:mr-3 lg:mr-4">
          {user ? (
            <div className="flex gap-2 sm:gap-3 md:gap-6 lg:gap-10">
              <Link
                href={PATH.MYPLAN}
                className="whitespace-nowrap text-xs font-medium sm:text-xs md:text-sm lg:text-base"
              >
                내 여행
              </Link>
              <Link
                href={PATH.SHAREDPLAN}
                className="whitespace-nowrap text-xs font-medium sm:text-xs md:text-sm lg:text-base"
              >
                커뮤니티
              </Link>
              <MypageButton />
            </div>
          ) : (
            <div className="flex gap-2 sm:gap-3 md:gap-6 lg:gap-10">
              <Link
                href={PATH.MYPLAN}
                className="whitespace-nowrap text-xs font-medium sm:text-xs md:text-sm lg:text-base"
              >
                내 여행
              </Link>
              <Link
                href={PATH.SHAREDPLAN}
                className="whitespace-nowrap text-xs font-medium sm:text-xs md:text-sm lg:text-base"
              >
                커뮤니티
              </Link>
              <Link
                href={PATH.SIGNIN}
                className="whitespace-nowrap text-xs font-medium sm:text-xs md:text-sm lg:text-base"
              >
                로그인
              </Link>
            </div>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Header;

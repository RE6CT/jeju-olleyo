'use client';

import Link from 'next/link';
import SearchBar from './search-bar';
import MypageButton from '../features/nav-mypage/mypage-button';
import { useEffect } from 'react';
import useAuth from '@/lib/hooks/use-auth';

const Header = () => {
  const { user, checkSession, isLoading } = useAuth();

  useEffect(() => {
    // 마운트 및 라우트 변경 시 세션 체크
    checkSession();
  }, [checkSession]);

  return (
    <header className="flex flex-col">
      <div className="flex h-24 w-full items-center justify-between gap-6 bg-black px-6 text-white md:gap-0 md:px-10">
        <div className="flex items-center gap-3">
          <Link href="/">로고 제주올레요</Link>
          <SearchBar />
        </div>

        <nav className="flex items-center gap-3">
          {!isLoading && (
            <>
              {user ? (
                <>
                  <Link href="/my-plan">내 여행</Link>
                  <Link href="/shared-plan">커뮤니티</Link>
                  <MypageButton />
                </>
              ) : (
                <Link href="/sign-in">로그인</Link>
              )}
            </>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Header;

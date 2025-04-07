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
    <header className="fixed z-50 flex w-full justify-between bg-black p-3 text-white">
      <div className="flex items-center gap-3">
        <Link href="/">로고 제주올레요</Link>
        <SearchBar />
      </div>

      <nav className="flex items-center gap-3">
        {!isLoading && (
          <>
            {user ? (
              <>
                <Link href="/mypage">내 여행</Link>
                <Link href="/shared-plan">커뮤니티</Link>
                <MypageButton />
              </>
            ) : (
              <Link href="/sign-in">로그인</Link>
            )}
          </>
        )}
      </nav>
    </header>
  );
};

export default Header;

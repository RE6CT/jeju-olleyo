'use client';

import Link from 'next/link';
import SearchBar from './search-bar';
import MypageButton from '../features/nav-mypage/mypage-button';
import useAuthStore from '@/zustand/auth.store';

const Header = () => {
  const user = useAuthStore((state) => state.user);

  return (
    <header className="flex flex-col">
      <div className="flex h-24 w-full items-center justify-between gap-6 bg-black px-6 text-white md:gap-0 md:px-10">
        <div className="flex items-center gap-3">
          <Link href="/">로고 제주올레요</Link>
          <SearchBar />
        </div>

        <nav className="flex items-center gap-3">
          {
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
          }
        </nav>
      </div>
    </header>
  );
};

export default Header;

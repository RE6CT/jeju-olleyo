'use client';

import Link from 'next/link';
import SearchBar from './search-bar';
import MypageButton from '../features/nav-mypage/mypage-button';
import useAuthStore from '@/zustand/auth.store';
import { PATH } from '@/constants/path.constants';

const Header = () => {
  const user = useAuthStore((state) => state.user);

  return (
    <header className="flex flex-col">
      <div className="flex h-24 w-full items-center justify-between gap-6 bg-white px-6 text-black md:gap-0 md:px-10">
        <div className="flex items-center gap-12">
          <Link href={PATH.HOME}>
            <img src="/logo/color_logo.svg" />
          </Link>
          <SearchBar />
        </div>

        <nav className="mr-4 flex items-center">
          {
            <>
              {user ? (
                <div className="flex gap-12">
                  <Link href={PATH.MYPLAN}>내 여행</Link>
                  <Link href={PATH.SHAREDPLAN}>커뮤니티</Link>
                  <MypageButton />
                </div>
              ) : (
                <div className="flex gap-12">
                  <Link href={PATH.MYPLAN}>내 여행</Link>
                  <Link href={PATH.SHAREDPLAN}>커뮤니티</Link>
                  <Link href={PATH.SIGNIN}>로그인</Link>
                </div>
              )}
            </>
          }
        </nav>
      </div>
    </header>
  );
};

export default Header;

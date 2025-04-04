'use client';

import Link from 'next/link';
import SearchBar from './search-bar';
import MypageModal from './mypage-modal';

const Header = () => {
  const currentUserId = 'uuid'; // 유저의 uuid

  return (
    <header className="fixed flex w-full justify-between bg-black p-3 text-white">
      <div className="flex items-center gap-3">
        <Link href="/">로고 제주올레요</Link>
        <SearchBar />
      </div>

      <nav className="flex items-center gap-3">
        {currentUserId ? (
          <>
            <Link href="/mypage">내 여행</Link>
            <Link href="/shared-plan">커뮤니티</Link>
            <MypageModal />
          </>
        ) : (
          <Link href="/login">로그인</Link>
        )}
      </nav>
    </header>
  );
};

export default Header;

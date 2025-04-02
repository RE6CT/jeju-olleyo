'use client';

import Link from 'next/link';
import SearchBar from './search-bar';

const Header = () => {
  return (
    <header className="flex justify-between bg-black text-white">
      <div className="flex">
        <Link href="/">로고 제주올레요</Link>
        <SearchBar />
      </div>

      <nav className="flex">
        <Link href="/mypage">내 여행</Link>
        <Link href="/shared-plan">커뮤니티</Link>
        <Link href="/mypage">마이페이지</Link>
        <Link href="/login">로그인</Link>
        <button>로그아웃</button>
      </nav>
    </header>
  );
};

export default Header;

'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { SearchBar } from './SearchBar';

export const Header = () => {
  const router = useRouter();

  return (
    <header className="flex justify-between bg-black text-white">
      <div className="flex gap-10">
        <Link href="/">로고 제주올레요</Link>
        <SearchBar />
      </div>

      <nav className="flex space-x-6">
        <Link href="/mypage">내 여행</Link>
        <Link href="/shared-plan">커뮤니티</Link>
        <Link href="/mypage">마이페이지</Link>
        <Link href="/login">로그인</Link>
        <button>로그아웃</button>
      </nav>
    </header>
  );
};

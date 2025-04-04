import Link from 'next/link';
import SearchBar from './search-bar';
import MypageButton from '../features/nav-mypage/mypage-button';
import { getCurrentUser } from '@/lib/apis/auth-server.api';

const Header = async () => {
  const { user } = await getCurrentUser();

  return (
    <header className="fixed flex w-full justify-between bg-black p-3 text-white">
      <div className="flex items-center gap-3">
        <Link href="/">로고 제주올레요</Link>
        <SearchBar />
      </div>

      <nav className="flex items-center gap-3">
        {user ? (
          <>
            <Link href="/mypage">내 여행</Link>
            <Link href="/shared-plan">커뮤니티</Link>
            <MypageButton />
          </>
        ) : (
          <Link href="/sign-in">로그인</Link>
        )}
      </nav>
    </header>
  );
};

export default Header;

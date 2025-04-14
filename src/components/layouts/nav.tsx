'use client';

import MypageButton from '../features/nav-mypage/mypage-button';
import Link from 'next/link';
import { PATH } from '@/constants/path.constants';
import useAuthStore from '@/zustand/auth.store';

/** 헤더의 nav 영역 컴포넌트 */
const Nav = () => {
  const user = useAuthStore((state) => state.user);

  return (
    <nav className="mr-4 flex items-center">
      {user ? (
        <div className="flex gap-12">
          <Link href={PATH.MYPLAN}>내 여행</Link>
          <Link href={PATH.COMMUNITY}>커뮤니티</Link>
          <MypageButton userId={user?.id} />
        </div>
      ) : (
        <div className="flex gap-12">
          <Link href={PATH.MYPLAN}>내 여행</Link>
          <Link href={PATH.COMMUNITY}>커뮤니티</Link>
          <Link href={PATH.SIGNIN}>로그인</Link>
        </div>
      )}
    </nav>
  );
};

export default Nav;

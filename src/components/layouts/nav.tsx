import { fetchGetCurrentUser } from '@/lib/apis/auth/auth-server.api';
import MypageButton from '../features/nav-mypage/mypage-button';
import Link from 'next/link';
import { PATH } from '@/constants/path.constants';

/** 헤더의 nav 영역 컴포넌트 */
const Nav = async () => {
  const { user } = await fetchGetCurrentUser();
  const userId = user?.id;

  if (!userId) return;

  return (
    <nav className="mr-4 flex items-center">
      {user ? (
        <div className="flex gap-12">
          <Link href={PATH.MYPLAN}>내 여행</Link>
          <Link href={PATH.SHAREDPLAN}>커뮤니티</Link>
          <MypageButton userId={userId} />
        </div>
      ) : (
        <div className="flex gap-12">
          <Link href={PATH.MYPLAN}>내 여행</Link>
          <Link href={PATH.SHAREDPLAN}>커뮤니티</Link>
          <Link href={PATH.SIGNIN}>로그인</Link>
        </div>
      )}
    </nav>
  );
};

export default Nav;

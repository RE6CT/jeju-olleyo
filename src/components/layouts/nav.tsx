'use client';

import MypageButton from '../features/nav-mypage/mypage-button';
import Link from 'next/link';
import { PATH } from '@/constants/path.constants';
import useAuthStore from '@/zustand/auth.store';
import { useRouter } from 'next/navigation';
import useAlert from '@/lib/hooks/use-alert';

/** 헤더의 nav 영역 컴포넌트 */
const Nav = () => {
  const user = useAuthStore((state) => state.user);
  const router = useRouter();
  const { showQuestion } = useAlert();

  const handleMyPlanClick = (e: React.MouseEvent) => {
    e.preventDefault(); // 기본 링크 동작 방지

    // 로그인 체크
    if (!user) {
      showQuestion(
        '로그인 필요',
        '일정을 만들기 위해서는 로그인이 필요합니다.\n로그인 페이지로 이동하시겠습니까?',
        {
          onConfirm: () =>
            router.push(`${PATH.SIGNIN}?redirectTo=${PATH.MYPLAN}`),
          onCancel: () => {},
        },
      );
    } else {
      router.push(PATH.MYPLAN);
    }
  };

  return (
    <nav className="flex items-center">
      {user ? (
        <div className="flex gap-6 whitespace-nowrap text-xs font-medium sm:text-xs md:text-sm lg:text-base">
          <Link href={PATH.MYPLAN} onClick={handleMyPlanClick}>
            내 여행
          </Link>
          <Link href={PATH.COMMUNITY}>커뮤니티</Link>
          <MypageButton userId={user?.id} />
        </div>
      ) : (
        <div className="flex items-center gap-6 whitespace-nowrap text-xs font-medium sm:text-xs md:text-sm lg:text-base">
          <Link href={PATH.MYPLAN} onClick={handleMyPlanClick}>
            내 여행
          </Link>
          <Link href={PATH.COMMUNITY}>커뮤니티</Link>
          <Link
            href={PATH.SIGNIN}
            className="rounded-full bg-secondary-300 px-[26px] py-[10px] text-white"
          >
            로그인
          </Link>
        </div>
      )}
    </nav>
  );
};

export default Nav;

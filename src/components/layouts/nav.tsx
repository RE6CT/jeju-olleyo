'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from '@/components/ui/popover';
import React, { useState } from 'react';

import { PATH } from '@/constants/path.constants';
import useAlert from '@/lib/hooks/use-alert';

import MypageButton from '../features/nav-mypage/mypage-button';
import { useCurrentUser } from '@/lib/queries/auth-queries';

/** 헤더의 nav 영역 컴포넌트 */
const Nav = () => {
  const { data: user } = useCurrentUser({
    refetchOnMount: true,
    refetchOnWindowFocus: true,
  });
  const router = useRouter();
  const { showQuestion } = useAlert();
  const [popoverOpen, setPopoverOpen] = useState(false);

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
    <nav className="hidden items-center md:flex">
      {user ? (
        <div className="flex gap-14 whitespace-nowrap text-xs font-medium sm:text-xs md:gap-6 md:text-sm lg:text-base">
          <Popover open={popoverOpen} onOpenChange={setPopoverOpen}>
            <PopoverTrigger asChild>
              <span className="cursor-pointer">내 여행</span>
            </PopoverTrigger>
            <PopoverContent
              className="inline-flex w-auto min-w-fit flex-col items-start rounded-[12px] bg-white px-4 py-2 shadow-[1px_1px_8px_1px_rgba(213,187,169,0.20)]"
              side="bottom"
              align="end"
              style={{ gap: 0 }}
            >
              <Link
                href={PATH.PLAN_NEW}
                className="flex w-[120px] items-center gap-[10px] rounded-[8px] px-0 py-2 text-black transition-colors hover:text-primary-500"
                onClick={() => setPopoverOpen(false)}
              >
                내 일정 만들기
              </Link>
              <Link
                href={PATH.MYPLAN}
                className="flex w-[120px] items-center gap-[10px] rounded-[8px] px-0 py-2 text-black transition-colors hover:text-primary-500"
                onClick={() => setPopoverOpen(false)}
              >
                지난 일정 보기
              </Link>
            </PopoverContent>
          </Popover>
          <Link href={PATH.COMMUNITY}>커뮤니티</Link>
          <MypageButton userId={user?.id} />
        </div>
      ) : (
        <div className="flex items-center gap-14 whitespace-nowrap text-xs font-medium sm:text-xs md:gap-6 md:text-sm lg:text-base">
          <Popover open={popoverOpen} onOpenChange={setPopoverOpen}>
            <PopoverTrigger asChild>
              <span className="cursor-pointer">내 여행</span>
            </PopoverTrigger>
            <PopoverContent
              className="inline-flex w-auto min-w-fit flex-col items-start rounded-[12px] bg-white p-2 shadow-[1px_1px_8px_1px_rgba(213,187,169,0.20)]"
              side="bottom"
              align="end"
              style={{ gap: 0 }}
            >
              <Link
                href={PATH.PLAN_NEW}
                className="flex w-[120px] items-center gap-[10px] rounded-[8px] px-0 py-2 text-black transition-colors hover:bg-primary-100 hover:text-[#FF8533]"
                onClick={() => setPopoverOpen(false)}
              >
                내 일정 만들기
              </Link>
              <div className="my-1 h-px w-full bg-[#E7EDF0]" />
              <Link
                href={PATH.MYPLAN}
                className="flex w-[120px] items-center gap-[10px] rounded-[8px] px-0 py-2 text-black transition-colors hover:bg-primary-100 hover:text-[#FF8533]"
                onClick={() => setPopoverOpen(false)}
              >
                지난 일정 보기
              </Link>
            </PopoverContent>
          </Popover>
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

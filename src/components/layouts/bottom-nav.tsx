'use client';

import Link from 'next/link';
import HomeIcon from '../icons/home-icon';
import { PATH } from '@/constants/path.constants';
import CommunityIcon from '../icons/community-icon';
import AddIcon from '../icons/add-icon';
import CalendarIcon from '../icons/calendar-icon';
import MypageIcon from '../icons/mypage-icon';
import { usePathname } from 'next/navigation';
import { ReactNode } from 'react';

const BottomNav = () => {
  const pathname = usePathname();

  return (
    <nav className="bottom-tabs fixed bottom-0 flex w-full min-w-[375px] justify-between bg-white px-4 pb-5 pt-2 md:hidden">
      <NavItem
        href={PATH.HOME}
        icon={
          <HomeIcon
            fill={pathname === PATH.HOME ? 'primary-300' : 'gray-300'}
            size={24}
          />
        }
        label="홈"
        isActive={pathname === PATH.HOME}
      />
      <NavItem
        href={PATH.COMMUNITY}
        icon={
          <CommunityIcon
            fill={pathname === PATH.COMMUNITY ? 'primary-300' : 'gray-300'}
            size={24}
          />
        }
        label="커뮤니티"
        isActive={pathname === PATH.COMMUNITY}
      />
      <NavItem
        href={PATH.PLAN_NEW}
        icon={
          <div className="rounded-full bg-primary-500">
            <AddIcon fill="white" size={31} />
          </div>
        }
        label="일정 작성"
        isActive={false} // 항상 회색으로 표시
      />
      <NavItem
        href={PATH.MYPLAN}
        icon={
          <CalendarIcon
            fill={pathname === PATH.MYPLAN ? 'primary-300' : 'gray-300'}
            size={24}
          />
        }
        label="내 여행"
        isActive={pathname === PATH.MYPLAN}
      />
      <NavItem
        href={PATH.ACCOUNT}
        icon={
          <MypageIcon
            fill={pathname === PATH.ACCOUNT ? 'primary-300' : 'gray-300'}
            size={24}
          />
        }
        label="마이페이지"
        isActive={pathname === PATH.ACCOUNT}
      />
    </nav>
  );
};

const NavItem = ({
  href,
  icon,
  label,
  isActive,
}: {
  href: string;
  icon: ReactNode;
  label: string;
  isActive: boolean;
}) => {
  return (
    <Link
      href={href}
      className="flex h-[57px] w-[52px] flex-col items-center justify-end gap-[7px]"
    >
      {icon}
      <span
        className={`regular-12 ${isActive ? 'text-primary-300' : 'text-gray-300'}`}
      >
        {label}
      </span>
    </Link>
  );
};

export default BottomNav;

'use client';

import { Separator } from '@/components/ui/separator';
import { PATH } from '@/constants/path.constants';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const SIDEBAR_STYLE = {
  category: 'medium-12 text-gray-600',
  section: 'flex flex-col gap-3',
};

/** 사이드 바 컴포넌트 */
const MypageSidebar = ({ className }: { className: string }) => {
  return (
    <aside
      className={`rounded-24 flex min-w-[200px] flex-col gap-5 border border-gray-100 bg-white p-6 ${className}`}
    >
      <section className={SIDEBAR_STYLE.section}>
        <h3 className={SIDEBAR_STYLE.category}>내 정보</h3>
        <NavLink href={PATH.ACCOUNT}>회원정보 수정</NavLink>
      </section>
      <Separator />
      <section className={SIDEBAR_STYLE.section}>
        <h3 className={SIDEBAR_STYLE.category}>내 활동</h3>
        <div className="flex flex-col gap-2">
          <NavLink href={PATH.BOOKMARKS}>내가 북마크한 장소</NavLink>
          <NavLink href={PATH.LIKES}>내가 좋아요한 일정</NavLink>
          <NavLink href={PATH.COMMENTS}>내가 쓴 댓글</NavLink>
        </div>
      </section>
      <Separator />
      <section className={SIDEBAR_STYLE.section}>
        <h3 className={SIDEBAR_STYLE.category}>내 예약</h3>
        <NavLink href={PATH.RESERVATIONS}>항공권 예약 내역</NavLink>
      </section>
    </aside>
  );
};

const NavLink = ({ href, children }: { href: string; children: string }) => {
  const pathname = usePathname();
  const isActive = pathname === href;

  return (
    <Link
      href={href}
      className={`${isActive ? 'semibold-16 text-primary-500' : 'medium-16'}`}
    >
      {children}
    </Link>
  );
};

export default MypageSidebar;

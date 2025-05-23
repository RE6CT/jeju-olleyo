'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { Separator } from '@/components/ui/separator';
import { PATH } from '@/constants/path.constants';

/** 사이드 바 컴포넌트 */
const MypageSidebar = ({ className }: { className: string }) => {
  return (
    <aside
      className={`hidden min-w-[200px] flex-col gap-5 rounded-24 border border-gray-100 bg-white p-6 md:flex ${className}`}
    >
      <section className="flex flex-col gap-3">
        <h3 className="medium-12 text-gray-600">내 정보</h3>
        <NavLink href={PATH.ACCOUNT}>회원정보 수정</NavLink>
      </section>
      <Separator />
      <section className="flex flex-col gap-3">
        <h3 className="medium-12 text-gray-600">내 활동</h3>
        <div className="flex flex-col gap-2">
          <NavLink href={PATH.BOOKMARKS}>내가 북마크한 장소</NavLink>
          <NavLink href={PATH.LIKES}>내가 좋아요한 일정</NavLink>
          <NavLink href={PATH.COMMENTS}>내가 쓴 댓글</NavLink>
        </div>
      </section>
      <Separator />
      <section className="flex flex-col gap-3">
        <h3 className="medium-12 text-gray-600">내 예약</h3>
        <NavLink href={PATH.RESERVATIONS}>항공권 예약 내역</NavLink>
      </section>
    </aside>
  );
};

const NavLink = ({ href, children }: { href: string; children: string }) => {
  const pathname = usePathname();
  const firstPathSegment = pathname.split('/').filter(Boolean)[0];
  const baseRoute = `/${firstPathSegment}`;
  const isActive = baseRoute === href;

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

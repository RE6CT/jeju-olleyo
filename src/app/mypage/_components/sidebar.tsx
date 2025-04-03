import { Separator } from '@/components/ui/separator';
import Link from 'next/link';

/** 사이드 바 컴포넌트 */
const Sidebar = () => {
  return (
    <aside className="fixed left-10 top-[30%] flex flex-col gap-5 border p-5">
      <section className="flex flex-col">
        <h3 className="text-lg font-bold">내 정보</h3>
        <Link href="/mypage/profile">회원정보 수정</Link>
      </section>
      <Separator />
      <section className="flex flex-col">
        <h3 className="text-lg font-bold">내 활동</h3>
        <Link href="/mypage/bookmarks">북마크한 장소</Link>
        <Link href="/mypage/likes">내가 찜한 일정</Link>
        <Link href="/mypage/comments">내 댓글</Link>
      </section>
      <Separator />
      <section className="flex flex-col">
        <h3 className="text-lg font-bold">내 예약</h3>
        <Link href="/mypage/reservation">항공권 예약 내역</Link>
      </section>
    </aside>
  );
};

export default Sidebar;

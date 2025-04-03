import Link from 'next/link';

const Sidebar = () => {
  return (
    <div className="fixed left-10 top-10 flex flex-col border">
      <Link href="/mypage/profile">회원정보 수정</Link>
      <Link href="/mypage/bookmarks">북마크한 장소</Link>
      <Link href="/mypage/likes">내가 찜한 일정</Link>
      <Link href="/mypage/comments">내가 쓴 댓글</Link>
      <Link href="/mypage/reservation">항공관 예약 내역</Link>
    </div>
  );
};

export default Sidebar;

'use client';

import Image from 'next/image';
import { Button } from '../../ui/button';
import { Separator } from '../../ui/separator';
import { MouseEvent } from 'react';
import { MypageModalProps } from '@/types/mypage.type';
import ProfileImage from '@/components/commons/profile-image';
import { logout } from '@/lib/apis/auth-server.api';
import { useRouter } from 'next/navigation';

/**
 * nav의 마이페이지 버튼 클릭 시 나타나는 모달 컴포넌트
 * @param onLinkClick - 링크 클릭시 실행되는 이벤트 핸들러
 * @param setIsOpen - 모달 오픈 여부 set 함수
 * @param modalRef - 모달에 전달할 모달 ref
 */
const MypageModal = ({ onLinkClick, setClose, modalRef }: MypageModalProps) => {
  const router = useRouter();
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  // 추후 실제 유저 정보로 수정
  const user = {
    profileImg: null,
    nickname: '리왹트',
    email: 're6ct@email.com',
  };

  /**
   * 로그아웃 버튼 이벤트 핸들러
   * @param e - 이벤트
   */
  const handleSignout = async (e: MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();

    const isConfirmed = confirm('로그아웃하시겠습니까?');
    if (!isConfirmed) return;

    try {
      setIsLoggingOut(true);
      const { error } = await logout();

      if (error) {
        alert('로그아웃에 실패했습니다. 다시 시도해주세요.');
        console.error('로그아웃 실패:', error);
        return;
      }

      // 로그아웃 성공 처리
      alert('로그아웃 되었습니다.');
      setClose();

      // 로컬 스토리지나 쿠키에 저장된 사용자 정보가 있다면 제거
      localStorage.removeItem('userSession');

      // 홈페이지로 리다이렉트
      router.push('/');
      router.refresh(); // 페이지 새로고침하여 상태 업데이트
    } catch (error) {
      console.error('로그아웃 오류:', error);
    } finally {
      setIsLoggingOut(false);
    }
  };

  return (
    <div
      ref={modalRef}
      className="absolute right-10 top-full flex flex-col gap-3 border p-3 text-black"
    >
      <section
        onClick={() => onLinkClick('profile')}
        className="flex cursor-pointer"
      >
        <ProfileImage image={user.profileImg} width={58} height={58} />
        <div className="flex flex-col">
          <div className="flex">
            <h3 className="whitespace-nowrap font-semibold">{user.nickname}</h3>
            <Button onClick={(e) => handleSignout(e)} variant="outline">
              로그아웃
            </Button>
          </div>
          {user.email}
        </div>
      </section>
      <Separator />
      <section>
        <ul className="flex justify-between">
          <li
            onClick={() => onLinkClick('bookmarks')}
            className="flex cursor-pointer flex-col items-center"
          >
            <h5>장소</h5>
            <Image src="" alt="" width={50} height={50} />
            <span>123개</span>
          </li>
          <li
            onClick={() => onLinkClick('likes')}
            className="flex cursor-pointer flex-col items-center"
          >
            <h5>일정</h5>
            <Image src="" alt="" width={50} height={50} />
            <span>123개</span>
          </li>
          <li
            onClick={() => onLinkClick('comments')}
            className="flex cursor-pointer flex-col items-center"
          >
            <h5>댓글</h5>
            <Image src="" alt="" width={50} height={50} />
            <span>123개</span>
          </li>
        </ul>
      </section>
      <Separator />
      <section className="text-center">
        <span
          onClick={() => onLinkClick('reservations')}
          className="cursor-pointer"
        >
          항공권 예약 내역
        </span>
      </section>
    </div>
  );
};

export default MypageModal;

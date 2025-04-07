'use client';

import Image from 'next/image';
import { Button } from '../../ui/button';
import { Separator } from '../../ui/separator';
import { MouseEvent, useState, useEffect } from 'react';
import { ModalPath, MypageModalProps } from '@/types/mypage.type';
import ProfileImage from '@/components/commons/profile-image';
import { useRouter } from 'next/navigation';
import useAuth from '@/lib/hooks/use-auth';
import { getCurrentSession } from '@/lib/apis/auth-browser.api';

/**
 * nav의 마이페이지 버튼 클릭 시 나타나는 모달 컴포넌트
 * @param onLinkClick - 링크 클릭시 실행되는 이벤트 핸들러
 * @param setClose - 모달 오픈 여부 set 함수
 * @param modalRef - 모달에 전달할 모달 ref
 */
const MypageModal = ({ onLinkClick, setClose, modalRef }: MypageModalProps) => {
  const router = useRouter();
  const { user, handleLogout, isLoading } = useAuth();
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const [localUser, setLocalUser] = useState(user);

  // 컴포넌트 마운트 시 세션에서 직접 사용자 정보 가져오기
  useEffect(() => {
    const fetchUserInfo = async () => {
      if (!user) {
        const { user: sessionUser } = await getCurrentSession();
        if (sessionUser) {
          setLocalUser(sessionUser);
        }
      } else {
        setLocalUser(user);
      }
    };

    fetchUserInfo();
  }, [user]);

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
      const success = await handleLogout();

      if (!success) {
        alert('로그아웃에 실패했습니다. 다시 시도해주세요.');
        return;
      }

      // 로그아웃 성공 처리
      setClose();
      // 명시적으로 로그인 페이지로 리다이렉트
      router.push('/sign-in');
    } catch (error) {
      console.error('로그아웃 오류:', error);
    } finally {
      setIsLoggingOut(false);
    }
  };

  // 사용자 정보가 없는 경우 기본값 설정
  const defaultUser = {
    profileImg: null,
    nickname: '게스트',
    email: '로그인이 필요합니다',
  };

  // 실제 사용자 정보 또는 기본값 사용
  const userInfo = localUser
    ? {
        profileImg: localUser.avatar_url,
        nickname: localUser.nickname || '사용자',
        email: localUser.email,
        provider: localUser.provider,
      }
    : defaultUser;

  return (
    <div
      ref={modalRef}
      className="absolute right-10 top-full flex flex-col gap-3 rounded-lg border bg-white p-4 text-black shadow-lg"
    >
      <section
        onClick={() => onLinkClick('account')}
        className="flex cursor-pointer items-center gap-3"
      >
        <ProfileImage
          image={userInfo.profileImg as string}
          width={58}
          height={58}
        />
        <div className="flex flex-col">
          <div className="flex items-center gap-2">
            <h3 className="whitespace-nowrap font-semibold">
              {userInfo.nickname}
            </h3>
            {localUser && localUser.provider && (
              <span className="rounded-full bg-gray-100 px-2 py-0.5 text-xs">
                {localUser.provider === 'google' ||
                localUser.provider === 'kakao'
                  ? '소셜'
                  : localUser.provider === 'email'
                    ? '이메일'
                    : localUser.provider}
              </span>
            )}
          </div>
          <p className="text-sm text-gray-500">{userInfo.email}</p>
          <Button
            onClick={(e) => handleSignout(e)}
            variant="outline"
            size="sm"
            className="mt-1"
            disabled={isLoggingOut || isLoading || !localUser}
          >
            {isLoggingOut ? '로그아웃 중...' : '로그아웃'}
          </Button>
        </div>
      </section>
      <Separator />

      {localUser ? (
        <>
          <section>
            <ul className="flex justify-between">
              <li
                onClick={() => onLinkClick('bookmarks')}
                className="flex cursor-pointer flex-col items-center"
              >
                <h5>장소</h5>
                <Image
                  src="/images/default-profile.png"
                  alt="장소 아이콘"
                  width={50}
                  height={50}
                />
                <span>0개</span>
              </li>
              <li
                onClick={() => onLinkClick('likes')}
                className="flex cursor-pointer flex-col items-center"
              >
                <h5>일정</h5>
                <Image
                  src="/images/default-profile.png"
                  alt="일정 아이콘"
                  width={50}
                  height={50}
                />
                <span>0개</span>
              </li>
              <li
                onClick={() => onLinkClick('comments')}
                className="flex cursor-pointer flex-col items-center"
              >
                <h5>댓글</h5>
                <Image
                  src="/images/default-profile.png"
                  alt="댓글 아이콘"
                  width={50}
                  height={50}
                />
                <span>0개</span>
              </li>
            </ul>
          </section>
          <Separator />
          <section className="text-center">
            <span
              onClick={() => onLinkClick('reservations')}
              className="cursor-pointer transition-colors hover:text-blue-500"
            >
              항공권 예약 내역
            </span>
          </section>
        </>
      ) : (
        <section className="py-2 text-center">
          <p className="mb-2 text-gray-500">로그인 후 이용할 수 있습니다</p>
          <Button
            onClick={() => {
              setClose();
              router.push('/sign-in');
            }}
            className="w-full"
          >
            로그인하기
          </Button>
        </section>
      )}
    </div>
  );
};

export default MypageModal;

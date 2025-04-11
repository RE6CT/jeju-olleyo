'use client';

import Image from 'next/image';
import { Button } from '../../ui/button';
import { Separator } from '../../ui/separator';
import { MouseEvent, useState, useEffect } from 'react';
import { MypageModalProps } from '@/types/mypage.type';
import ProfileImage from '@/components/commons/profile-image';
import { useRouter } from 'next/navigation';
import useAuth from '@/lib/hooks/use-auth';
import { getCurrentSession } from '@/lib/apis/auth/auth-browser.api';
import { PATH } from '@/constants/path.constants';
import { SOCIAL_AUTH } from '@/constants/auth.constants';
import { MYPAGE_PROVIER_IMAGE_SIZE } from '@/constants/header.constants';
import useAuthStore from '@/zustand/auth.store';

/**
 * nav의 마이페이지 버튼 클릭 시 나타나는 모달 컴포넌트
 * - 모바일에서는 작은 크기로 표시 (두 번째 코드 기준)
 * - 데스크탑에서는 원래 크기로 표시 (첫 번째 코드 기준)
 *
 * @param onLinkClick - 링크 클릭시 실행되는 이벤트 핸들러
 * @param setClose - 모달 오픈 여부 set 함수
 * @param modalRef - 모달에 전달할 모달 ref
 */
const MypageModal = ({ onLinkClick, setClose, modalRef }: MypageModalProps) => {
  const router = useRouter();
  const { handleLogout, isLoading } = useAuth();
  const user = useAuthStore((state) => state.user);
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

      // 명시적인 페이지 전환 (인증 체크 건너뛰도록 t 파라미터 추가)
      if (typeof window !== 'undefined') {
        window.location.href = `${PATH.SIGNIN}?t=${Date.now()}`;
      }
    } catch (error) {
      console.error('로그아웃 오류:', error);
    } finally {
      setIsLoggingOut(false);
    }
  };

  // 쿠키에 저장된 provider 값을 읽어서 덮어쓰기 (있다면)
  const cookieProvider = document.cookie
    .split('; ')
    .find((row) => row.startsWith('provider='))
    ?.split('=')[1];

  // 사용자 정보가 없는 경우 기본값 설정
  const defaultUser = {
    profileImg: null,
    nickname: '게스트',
    email: '로그인이 필요합니다',
  };

  // 실제 사용자 정보 또는 기본값 사용
  let userInfo = localUser
    ? {
        profileImg: localUser.avatar_url,
        nickname: localUser.nickname || '사용자',
        email: localUser.email,
        provider: cookieProvider,
      }
    : defaultUser;

  return (
    <div
      ref={modalRef}
      className="sm:scale-80 absolute right-2 top-10 z-50 origin-top-right scale-75 rounded-lg border bg-white p-4 text-black shadow-lg sm:right-4 sm:top-12 md:right-7 md:top-14 md:scale-90 lg:right-10 lg:top-16 lg:w-auto lg:scale-100 lg:gap-3 lg:p-4"
    >
      {/* 모바일 버전은 고정 너비, 데스크탑 버전(lg)은 자동 너비 */}
      <div className="md:w-68 flex w-60 flex-col gap-3 sm:w-64 lg:w-auto">
        <section
          onClick={() => onLinkClick('account')}
          className="flex cursor-pointer items-center gap-3"
        >
          <ProfileImage image={userInfo.profileImg} width={58} height={58} />
          <div className="flex flex-col">
            <div className="flex items-center gap-2">
              <h3 className="whitespace-nowrap font-semibold">
                {userInfo.nickname}
              </h3>
              {localUser && cookieProvider && (
                <span className="px-2 py-0.5 text-xs">
                  {cookieProvider === SOCIAL_AUTH.PROVIDERS.GOOGLE ? (
                    <Image
                      src="/images/google_mypage.png"
                      alt="google"
                      width={MYPAGE_PROVIER_IMAGE_SIZE}
                      height={MYPAGE_PROVIER_IMAGE_SIZE}
                    />
                  ) : cookieProvider === SOCIAL_AUTH.PROVIDERS.KAKAO ? (
                    <Image
                      width={MYPAGE_PROVIER_IMAGE_SIZE}
                      height={MYPAGE_PROVIER_IMAGE_SIZE}
                      src="/images/kakaotalk_mypage.png"
                      alt="kakao"
                    />
                  ) : cookieProvider === 'email' ? (
                    <Image
                      width={MYPAGE_PROVIER_IMAGE_SIZE}
                      height={MYPAGE_PROVIER_IMAGE_SIZE}
                      src="/images/mail_mypage.png"
                      alt="email"
                    />
                  ) : (
                    'email'
                  )}
                </span>
              )}
            </div>
            <p className="text-sm text-gray-500">{userInfo.email}</p>
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
                    src="/icons/mypage-location.svg"
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
                    src="/icons/mypage-schedule.svg"
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
                    src="/icons/mypage-comment.svg"
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
                className="cursor-pointer transition-colors hover:text-blue"
              >
                항공권 예약 내역
              </span>
            </section>
            <Separator />
            <Button
              onClick={(e) => handleSignout(e)}
              variant="outline"
              size="sm"
              className="mt-1"
              disabled={isLoggingOut || isLoading || !localUser}
            >
              {isLoggingOut ? '로그아웃 중...' : '로그아웃'}
            </Button>
          </>
        ) : (
          <section className="py-2 text-center">
            <p className="mb-2 text-gray-500">로그인 후 이용할 수 있습니다</p>
            <Button
              onClick={() => {
                setClose();
                router.push(PATH.SIGNIN);
              }}
              className="w-full"
            >
              로그인하기
            </Button>
          </section>
        )}
      </div>
    </div>
  );
};

export default MypageModal;

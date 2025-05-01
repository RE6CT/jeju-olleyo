'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { MouseEvent, useState, useEffect } from 'react';
import { motion } from 'framer-motion'; // framer-motion 임포트 추가

import ProfileImage from '@/components/commons/profile-image';
import { PATH } from '@/constants/path.constants';
import useAuth from '@/lib/hooks/use-auth';
import useCustomToast from '@/lib/hooks/use-custom-toast';
import useAlert from '@/lib/hooks/use-alert'; // useAlert 훅 임포트 추가
import { useGetDataCount } from '@/lib/queries/use-get-data-count';
import { MypageModalProps } from '@/types/mypage.type';
import { UserInfo } from '@/types/auth.type';

import { Button } from '../../ui/button';
import { Separator } from '../../ui/separator';
import { useCurrentUser } from '@/lib/queries/auth-queries';
import { getCurrentSession } from '@/lib/apis/auth/auth-browser.api';

const ICON_STYLE = {
  title: 'medium-14 text-gray-500',
  description: 'medium-12 text-gray-500',
  icon: 'mb-3 mt-1',
  button: 'flex flex-col items-center px-2 hover:bg-gray-50',
};

/**
 * nav의 마이페이지 버튼 클릭 시 나타나는 모달 컴포넌트
 */
const MypageModal = ({
  onLinkClick,
  setClose,
  modalRef,
  userId,
  className,
}: MypageModalProps) => {
  const router = useRouter();
  // useCurrentUser 훅을 사용할 때 refetch 옵션 활성화
  const { data: user } = useCurrentUser({
    refetchOnMount: true, // 컴포넌트 마운트시 항상 다시 가져오기
    refetchOnWindowFocus: true, // 창 포커스시 다시 가져오기
    staleTime: 0, // 항상 최신 데이터가 필요할 때
  });
  const { data } = useGetDataCount(userId);
  const { handleLogout, isLoading: isAuthLoading } = useAuth();
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const [localUser, setLocalUser] = useState<UserInfo | null>(null);
  const { successToast } = useCustomToast();
  const { showQuestion } = useAlert(); // useAlert 훅에서 showQuestion 가져오기

  // 컴포넌트 마운트 시 세션에서 직접 사용자 정보 가져오기
  useEffect(() => {
    let isMounted = true;
    const fetchUserInfo = async () => {
      if (!user) {
        const { user: sessionUser } = await getCurrentSession();
        if (isMounted && sessionUser) setLocalUser(sessionUser);
      } else if (isMounted) {
        setLocalUser(user);
      }
    };
    fetchUserInfo();

    return () => {
      isMounted = false;
    };
  }, [user]);

  /**
   * 로그아웃 버튼 이벤트 핸들러
   * @param e - 이벤트
   */
  const handleSignout = async (e: MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();

    // 커스텀 알림으로 로그아웃 확인
    showQuestion('로그아웃', '로그아웃하시겠습니까?', {
      onConfirm: async () => {
        try {
          setIsLoggingOut(true);
          const success = await handleLogout();

          if (!success) {
            successToast('로그아웃에 실패했습니다. 다시 시도해주세요.');
            return;
          }

          // 로그아웃 성공 시 모달 닫기
          setClose();
        } catch (error) {
          console.error('로그아웃 오류:', error);
        } finally {
          setIsLoggingOut(false);
        }
      },
      onCancel: () => {},
    });
  };

  // 쿠키에 저장된 provider 값 가져오기
  const cookieProvider =
    typeof document !== 'undefined'
      ? document.cookie
          .split('; ')
          .find((row) => row.startsWith('provider='))
          ?.split('=')[1]
      : undefined;

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
        email: localUser.email || '', // null 처리
        provider: cookieProvider,
      }
    : defaultUser;

  return (
    <motion.div
      ref={modalRef}
      className={`absolute z-40 w-[254px] rounded-12 bg-white p-4 shadow-dropdown ${className}`}
      initial={{ opacity: 0, y: 10, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: 10, scale: 0.95 }}
      transition={{ duration: 0.2, ease: 'easeOut' }}
    >
      {/* 섹션 1 - 프로필 영역 */}
      <div className="flex w-fit flex-col gap-3">
        <section
          onClick={() => onLinkClick(PATH.ACCOUNT)}
          className="flex w-fit cursor-pointer items-center gap-3"
        >
          <ProfileImage
            image={userInfo.profileImg}
            width={58}
            height={58}
            className="aspect-square"
          />
          <div className="flex w-[143px] flex-col gap-1">
            <div className="flex w-[110px] items-center gap-2">
              <h3 className="semibold-16 truncate whitespace-nowrap">
                {userInfo.nickname}
              </h3>
              {localUser && cookieProvider && (
                <ProviderIcon provider={cookieProvider ?? 'email'} />
              )}
            </div>
            <p className="regular-14 truncate">{userInfo.email}</p>
          </div>
        </section>
        <Separator />

        {localUser ? (
          <>
            {/* 섹션 2 - 장소, 일정, 댓글 아이콘 영역 */}
            <section className="py-1">
              <div className="flex justify-between">
                <button
                  onClick={() => onLinkClick(PATH.BOOKMARKS)}
                  className={ICON_STYLE.button}
                >
                  <h5 className={ICON_STYLE.title}>장소</h5>
                  <Image
                    src="/icons/mypage-location.svg"
                    alt="장소 아이콘"
                    width={48}
                    height={48}
                    className={ICON_STYLE.icon}
                  />
                  <span className={ICON_STYLE.description}>
                    {data?.bookmarkCount.all || 0}개
                  </span>
                </button>
                <button
                  onClick={() => onLinkClick(PATH.LIKES)}
                  className={ICON_STYLE.button}
                >
                  <h5 className={ICON_STYLE.title}>일정</h5>
                  <Image
                    src="/icons/mypage-schedule.svg"
                    alt="일정 아이콘"
                    width={48}
                    height={48}
                    className={ICON_STYLE.icon}
                  />
                  <span className={ICON_STYLE.description}>
                    {data?.likeCount || 0}개
                  </span>
                </button>
                <button
                  onClick={() => onLinkClick(PATH.COMMENTS)}
                  className={ICON_STYLE.button}
                >
                  <h5 className={ICON_STYLE.title}>댓글</h5>
                  <Image
                    src="/icons/mypage-comment.svg"
                    alt="댓글 아이콘"
                    width={48}
                    height={48}
                    className={ICON_STYLE.icon}
                  />
                  <span className={ICON_STYLE.description}>
                    {data?.commentCount || 0}개
                  </span>
                </button>
              </div>
            </section>
            <Separator />

            {/* 섹션 3 - 항공권 예약 내역 */}
            <section className="text-center">
              <button
                onClick={() => onLinkClick(PATH.RESERVATIONS)}
                className="medium-12 hover:text-secondary-300"
              >
                항공권 예약 내역
              </button>
            </section>
            <Separator />

            {/* 섹션 4 - 로그아웃 버튼 영역 */}
            <section className="text-center">
              <button
                onClick={(e) => handleSignout(e)}
                disabled={isLoggingOut || isAuthLoading || !localUser}
                className="medium-12 hover:text-secondary-300"
              >
                {isLoggingOut ? '로그아웃 중...' : '로그아웃'}
              </button>
            </section>
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
    </motion.div>
  );
};

const MYPAGE_PROVIER_IMAGE_SIZE = 24;

const ProviderIcon = ({ provider }: { provider: string }) => {
  if (provider === 'email') return null;
  return (
    <Image
      src={`/images/${provider}_mypage.png`}
      alt={provider}
      width={MYPAGE_PROVIER_IMAGE_SIZE}
      height={MYPAGE_PROVIER_IMAGE_SIZE}
    />
  );
};

export default MypageModal;

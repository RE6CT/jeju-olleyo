'use client';

import BookmarkIcon from '@/components/icons/bookmark-icon';
import { PATH } from '@/constants/path.constants';
import useAlert from '@/lib/hooks/use-alert';
import { useBookmarkMutation } from '@/lib/mutations/use-bookmark-mutation';
import { useCurrentUser } from '@/lib/queries/auth-queries';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';

/**
 * 북마크 버튼 컴포넌트 - 반응형 지원
 * @param isBookmarked - 북마크 여부
 * @param placeId - 카드의 장소 id
 * @param className - 추가 스타일 클래스
 */
const BookmarkButton = ({
  isBookmarked,
  placeId,
  className,
}: {
  isBookmarked: boolean;
  placeId: number;
  className?: string;
}) => {
  const { mutate: toggleBookmark, isPending } = useBookmarkMutation();
  const { data: user } = useCurrentUser();
  const { showQuestion } = useAlert();
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  /** 현재 전체 URL 가져오기 (쿼리 파라미터 포함) */
  const getCurrentUrl = () => {
    const params = new URLSearchParams(searchParams.toString());
    const queryString = params.toString();
    return `${pathname}${queryString ? `?${queryString}` : ''}`;
  };

  /** 북마크 버튼 클릭 핸들러 */
  const handleBookmarkClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (!user) {
      const currentUrl = getCurrentUrl();
      showQuestion(
        '로그인 필요',
        '일정을 만들기 위해서는 로그인이 필요합니다.\n로그인 페이지로 이동하시겠습니까?',
        {
          onConfirm: () =>
            router.push(
              `${PATH.SIGNIN}?redirectTo=${encodeURIComponent(currentUrl)}`,
            ),
          onCancel: () => {},
        },
      );
      return;
    }
    if (!isPending) {
      toggleBookmark({ userId: user.id, placeId });
    }
  };

  return (
    <button
      onClick={handleBookmarkClick}
      className={`flex h-8 w-8 cursor-pointer items-center justify-center rounded-[8px] border-none bg-white/10 md:h-14 md:w-14 lg:rounded-12 ${className}`}
      aria-label={isBookmarked ? '북마크 해제' : '북마크'}
    >
      <BookmarkIcon
        fill={isBookmarked ? 'primary-500' : 'gray-200'}
        size={56}
      />
    </button>
  );
};

export default BookmarkButton;

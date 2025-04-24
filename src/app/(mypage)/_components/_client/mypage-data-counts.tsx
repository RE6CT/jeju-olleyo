'use client';

import Loading from '@/app/loading';
import useAuth from '@/lib/hooks/use-auth';
import { useGetDataCount } from '@/lib/queries/use-get-data-count';

/**
 * 마이페이지에서 데이터의 개수를 가져오는 컴포넌트
 * @param pageType - 현재 페이지 타입
 * @returns
 */
const MypageDataCounts = ({
  pageType,
}: {
  pageType: 'bookmarks' | 'likes' | 'comments';
}) => {
  const { user, isLoading } = useAuth();
  const { data: countData, isLoading: isCountLoading } = useGetDataCount(
    user?.id,
  );

  if (isLoading || isCountLoading) return <Loading />;

  let countValue;
  let message;

  switch (pageType) {
    case 'bookmarks':
      countValue = countData?.bookmarkCount.all ?? 0;
      message = `${countValue}개의 장소를 북마크했어요`;
      break;
    case 'likes':
      countValue = countData?.likeCount ?? 0;
      message = `${countValue}개의 장소에 좋아요를 눌렀어요`;
      break;
    case 'comments':
      countValue = countData?.commentCount ?? 0;
      message = `${countValue}개의 댓글을 남겼어요`;
      break;
    default:
      countValue = 0;
      message = '데이터가 없습니다';
  }

  return <p className="medium-16 text-secondary-300">{message}</p>;
};

export default MypageDataCounts;

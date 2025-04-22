'use client';

import Loading from '@/app/loading';
import Pagination from '@/components/ui/pagination';
import useAuth from '@/lib/hooks/use-auth';
import { useGetDataCount } from '@/lib/queries/use-get-data-count';
import { CategoryParamType } from '@/types/category.type';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';

/**
 * 마이페이지에서 사용하는 페이지네이션 컴포넌트
 * @param pageType - 현재 페이지 타입
 * @param pageSize - 한 페이지당 보여줄 데이터 수
 */
const MypagePagination = ({
  pageType,
  pageSize,
}: {
  pageType: 'bookmarks' | 'likes' | 'comments';
  pageSize: number;
}) => {
  const router = useRouter();

  // 페이지 번호 가져오기
  const searchParams = useSearchParams();
  const currentPage = parseInt(searchParams.get('page') || '1');

  // 파라미터(카테고리) 가져오기
  const pathname = usePathname();

  // 데이터 개수 가져오기
  const { user, isLoading } = useAuth();
  const { data: countData, isLoading: isCountLoading } = useGetDataCount(
    user?.id,
  );

  let count: number | undefined;

  switch (pageType) {
    case 'bookmarks':
      const category = (pathname.split('/').filter(Boolean)[1] ??
        'all') as CategoryParamType;
      count = countData?.bookmarkCount[category];
      break;
    case 'likes':
      count = countData?.likeCount;
      break;
    case 'comments':
      count = countData?.commentCount;
      break;
  }

  /**
   * 페이지 이동 핸들러
   * @param page - 이동할 페이지 숫자
   */
  const handlePageChange = (page: number) => {
    router.push(`?page=${page}`);
  };

  if (isLoading || isCountLoading) return <Loading />;

  return (
    <Pagination
      currentPage={currentPage}
      totalPages={Math.ceil((count ?? 1) / pageSize)}
      onPageChange={handlePageChange}
      backgroundColor="primary-500"
      hideOnSinglePage={false}
    />
  );
};

export default MypagePagination;

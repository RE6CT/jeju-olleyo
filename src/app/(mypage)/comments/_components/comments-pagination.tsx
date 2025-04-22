'use client';

import Pagination from '@/components/ui/pagination';
import useAuth from '@/lib/hooks/use-auth';
import { useGetDataCount } from '@/lib/queries/use-get-data-count';
import { useRouter, useSearchParams } from 'next/navigation';
import { useState } from 'react';

const CommentsPagination = ({ pageSize }: { pageSize: number }) => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const { user, isLoading } = useAuth();
  const { data: countData, isLoading: isCountLoading } = useGetDataCount(
    user?.id,
  );

  // URL에서 페이지 번호 가져오기
  const currentPage = parseInt(searchParams.get('page') || '1');
  const [page, setPage] = useState<number>(currentPage);

  /**
   * 페이지 이동 클릭 핸들러
   * @param page - 이동할 페이지 숫자
   */
  const handlePageChange = (page: number) => {
    router.push(`?page=${page}`);
    setPage(page);
  };

  return (
    <Pagination
      currentPage={page}
      totalPages={Math.ceil((countData?.commentCount ?? 1) / pageSize)}
      onPageChange={handlePageChange}
      backgroundColor="primary-500"
      hideOnSinglePage={false}
    />
  );
};

export default CommentsPagination;

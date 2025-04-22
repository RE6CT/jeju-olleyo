'use client';

import Loading from '@/app/loading';
import useAuth from '@/lib/hooks/use-auth';
import { useGetDataCount } from '@/lib/queries/use-get-data-count';

const CommentsCounts = () => {
  const { user, isLoading } = useAuth();
  const { data: countData, isLoading: isCountLoading } = useGetDataCount(
    user?.id,
  );

  if (isLoading || isCountLoading) return <Loading />;

  return (
    <p className="medium-16 text-secondary-300">
      {countData?.commentCount}개의 댓글을 남겼어요
    </p>
  );
};

export default CommentsCounts;

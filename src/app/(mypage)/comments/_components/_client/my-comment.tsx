import Link from 'next/link';

import { PATH } from '@/constants/path.constants';
import { formatDate } from '@/lib/utils/date';
import { MyCommentType } from '@/types/comment.type';

/**
 * 개별 댓글 하나를 나타내는 컴포넌트
 * @param comment - 댓글 데이터 객체
 */
const MyComment = ({ comment }: { comment: MyCommentType }) => {
  return (
    <Link
      href={`${PATH.PLAN_DETAIL}/${comment.planId}?isReadOnly=true`}
      className="flex flex-col gap-2 rounded-24 bg-white p-5"
    >
      <div className="flex justify-between gap-2">
        <h4 className="medium-12 text-gray-600">{comment.title}</h4>
        <span className="medium-12 text-gray-500">
          {formatDate(comment.createdAt)}
        </span>
      </div>
      <p className="medium-16">{comment.content}</p>
    </Link>
  );
};

export default MyComment;

'use client';

import { useState } from 'react';

import { Input } from '@/components/ui/input';
import { CommentProps } from '@/types/plan-detail.type';
import { formatDate } from '@/lib/utils/date';
import useAuth from '@/lib/hooks/use-auth';
import { Separator } from '@/components/ui/separator';
import {
  useDeleteComment,
  useUpdateComment,
} from '@/lib/mutations/use-comment-mutation';

/**
 * 댓글 컴포넌트
 * @param planCommentId - 댓글의 id
 * @param userId - 댓글 작성한 유저의 id
 * @param nickname - 댓글 작성한 유저의 닉네임
 * @param content - 댓글 내용
 * @param createdAt - 댓글 작성 시간
 */
const Comment = ({
  planCommentId,
  userId,
  nickname,
  content,
  createdAt,
}: CommentProps) => {
  const { user } = useAuth();
  const [isEditMode, setIsEditMode] = useState<boolean>(false);
  const [inputText, setInputText] = useState<string>(content);
  const { mutate: updateComment } = useUpdateComment();
  const { mutate: deleteComment } = useDeleteComment();

  /** 댓글 삭제 핸들러 함수 */
  const handleDeleteCommentButtonClick = () => {
    const isConfirmed = confirm('댓글을 삭제하시겠습니까?');
    if (!isConfirmed) return;
    deleteComment(planCommentId);
  };

  /** 댓글 수정 핸들러 함수 */
  const handleEditCommentButtonClick = () => {
    updateComment({ commentId: planCommentId, content: inputText });
    setIsEditMode(false);
  };

  /** 댓글 수정 취소 핸들러 함수 */
  const handleEditCancel = () => {
    setIsEditMode(false);
    setInputText(content);
  };

  return (
    <div className="flex flex-col gap-1 py-2">
      <div className="regular-10 flex justify-between">
        <span>{nickname}</span>
        <span>{formatDate(createdAt)}</span>
      </div>
      {isEditMode ? (
        <Input
          className="medium-12"
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
        />
      ) : (
        <p className="medium-12 break-all">{content}</p>
      )}
      {isEditMode ? (
        <div className="regular-10 flex">
          <button
            className="regular-10 px-[6px] py-[2px] text-gray-500"
            onClick={handleEditCommentButtonClick}
            disabled={inputText === ''}
          >
            수정 완료
          </button>
          <Separator
            orientation="vertical"
            className="mx-[2px] text-gray-100"
          />
          <button
            className="px-[6px] py-[2px] text-red"
            onClick={handleEditCancel}
          >
            취소
          </button>
        </div>
      ) : (
        <>
          {userId === user?.id && (
            <div className="regular-10 flex">
              <button
                className="px-[6px] py-[2px] text-gray-500"
                onClick={() => setIsEditMode(true)}
              >
                수정
              </button>
              <Separator
                orientation="vertical"
                className="mx-[2px] text-gray-100"
              />
              <button
                className="px-[6px] py-[2px] text-red"
                onClick={handleDeleteCommentButtonClick}
              >
                삭제
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default Comment;

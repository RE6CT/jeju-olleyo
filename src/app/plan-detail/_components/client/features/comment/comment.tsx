'use client';

import { useState } from 'react';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { CommentProps } from '@/types/plan-detail.type';

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
  const user = ''; // 유저의 uuid 불러오는 로직 추후 추가
  const [isEditMode, setIsEditMode] = useState<boolean>(false);
  const [inputText, setInputText] = useState<string>(content);

  /** 댓글 삭제 핸들러 함수 */
  const handleDeleteCommentButtonClick = () => {
    const isConfirmed = confirm('댓글을 삭제하시겠습니까?');
    if (isConfirmed) return;
    // 댓글 삭제 로직
  };

  /** 댓글 수정 핸들러 함수 */
  const handleEditCommentButtonClick = () => {
    // 댓글 업데이트 로직
    setIsEditMode(false);
  };

  return (
    <li>
      {nickname}
      {isEditMode ? (
        <Input
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
        />
      ) : (
        <>{content}</>
      )}
      {createdAt.toLocaleString()}
      {isEditMode ? (
        <Button onClick={handleEditCommentButtonClick}>수정 완료</Button>
      ) : (
        <>
          {userId === user && (
            <>
              <Button onClick={() => setIsEditMode(true)}>수정</Button>
              <Button onClick={handleDeleteCommentButtonClick}>삭제</Button>
            </>
          )}
        </>
      )}
    </li>
  );
};

export default Comment;

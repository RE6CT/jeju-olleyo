'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

/**
 * 댓글을 입력할 수 있는 input 컴포넌트
 * @returns
 */
const CommentInput = () => {
  const handleRegisterButtonClick = () => {
    // 댓글 등록 로직
  };

  return (
    <div className="flex">
      <Input placeholder="댓글을 남겨주세요!" />
      <Button onClick={handleRegisterButtonClick}>등록</Button>
    </div>
  );
};

export default CommentInput;

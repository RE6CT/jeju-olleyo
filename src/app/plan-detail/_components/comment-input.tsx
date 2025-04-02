'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

/**
 * 댓글을 입력할 수 있는 input 컴포넌트
 * @returns
 */
const CommentInput = () => {
  const user = ''; // 유저의 uuid 불러오는 로직 추후 추가

  /** 댓글 등록 버튼 이벤트 핸들러 */
  const handleRegisteCommentrButtonClick = () => {
    if (!user) {
      alert('로그인이 필요합니다.');
      return;
    }
    // 댓글 등록 함수 호출
  };

  return (
    <div className="flex">
      <Input placeholder="댓글을 남겨주세요!" />
      <Button onClick={handleRegisteCommentrButtonClick}>등록</Button>
    </div>
  );
};

export default CommentInput;

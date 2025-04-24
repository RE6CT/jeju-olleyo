'use client';

import { Input } from '@/components/ui/input';
import useAuth from '@/lib/hooks/use-auth';
import useCustomToast from '@/lib/hooks/use-custom-toast';
import { useAddComment } from '@/lib/mutations/use-comment-mutation';
import { useState } from 'react';

/**
 * 댓글을 입력할 수 있는 input 컴포넌트
 */
const CommentInput = ({ planId }: { planId: number }) => {
  const { user } = useAuth(); // 유저의 uuid 불러오는 로직 추후 추가
  const { mutate } = useAddComment();
  const { successToast } = useCustomToast();
  const [inputText, setInputText] = useState<string>('');

  /** 댓글 등록 버튼 이벤트 핸들러 */
  const handleRegisteCommentrButtonClick = () => {
    if (!user) {
      successToast('로그인이 필요합니다.');
      return;
    }
    mutate({ userId: user.id, content: inputText, planId });
    successToast('댓글이 등록되었습니다.');
    setInputText('');
  };

  return (
    <div className="flex">
      <Input
        className="medium-12 placeholder:medium-12"
        placeholder="댓글을 남겨주세요!"
        value={inputText}
        onChange={(e) => setInputText(e.target.value)}
      />
      <button
        className="medium-12 flex-grow whitespace-nowrap px-2 py-1 text-secondary-300"
        onClick={handleRegisteCommentrButtonClick}
      >
        등록
      </button>
    </div>
  );
};

export default CommentInput;

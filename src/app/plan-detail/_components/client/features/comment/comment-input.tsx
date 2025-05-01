'use client';

import { Input } from '@/components/ui/input';
import useAuth from '@/lib/hooks/use-auth';
import useCustomToast from '@/lib/hooks/use-custom-toast';
import { useAddComment } from '@/lib/mutations/use-comment-mutation';
import { FormEvent, useState } from 'react';

/**
 * 댓글을 입력할 수 있는 input 컴포넌트
 */
const CommentInput = ({ planId }: { planId: number }) => {
  const { user } = useAuth(); // 유저의 uuid 불러오는 로직 추후 추가
  const { mutate } = useAddComment();
  const { successToast } = useCustomToast();
  const [inputText, setInputText] = useState<string>('');

  /** 댓글 등록 버튼 이벤트 핸들러 */
  const handleRegisteCommentrButtonClick = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!user) {
      successToast('로그인이 필요합니다.');
      return;
    }
    if (inputText === '') {
      successToast('댓글을 입력해주세요.');
      return;
    }
    mutate({ userId: user.id, content: inputText, planId });
    successToast('댓글이 등록되었습니다.');
    // 현재 실행 중인 이벤트 루프가 완료된 후에 콜백 함수를 실행
    // input 초기화가 바텀시트의 상태 변경과 동시에 발생하지 않도록
    setTimeout(() => {
      setInputText('');
    }, 0);
  };

  return (
    <form className="flex" onSubmit={handleRegisteCommentrButtonClick}>
      <Input
        type="text"
        className="medium-12 placeholder:medium-12"
        placeholder="댓글을 남겨주세요!"
        value={inputText}
        onChange={(e) => setInputText(e.target.value)}
      />
      <button className="medium-12 flex-grow whitespace-nowrap px-2 py-1 text-secondary-300">
        등록
      </button>
    </form>
  );
};

export default CommentInput;

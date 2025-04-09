'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import clsx from 'clsx';
import { useState } from 'react';

const TITLE_STYLE = 'my-3 text-lg font-semibold col-span-4 w-full';
const ROW_LABEL_STYLE = 'text-md whitespace-nowrap font-normal';
const ROW_VALUE_STYLE = 'whitespace-nowrap';

/** 회원정보 수정 페이지의 개인 정보 섹션 컴포넌트 */
const PersonalInfo = () => {
  const [isEditMode, setIsEditMode] = useState<boolean>(false);

  /** 휴대폰 수정 버튼 클릭 핸들러 */
  const handleEditButtonClick = () => {
    setIsEditMode(true);
  };

  /** 휴대폰 수정 완료 버튼 클릭 핸들러  */
  const handleEditCompleteButtonClick = () => {
    const isConfirmed = confirm('휴대폰 번호를 수정하시겠습니까?');
    if (!isConfirmed) return;
    // 휴대폰 번호 수정 로직
    setIsEditMode(false);
  };

  return (
    <>
      <h3 className={clsx(TITLE_STYLE)}>개인 정보</h3>
      <div className="invisible" />
      <div className={clsx(ROW_VALUE_STYLE)}>이메일</div>
      <div>test@test.com</div>
      <div className="invisible" />
      <div className="invisible" />
      <Label htmlFor="phone" className={clsx(ROW_LABEL_STYLE)}>
        휴대폰
      </Label>
      {isEditMode ? (
        <Input id="phone" placeholder="010 1111 2222" />
      ) : (
        <span className={clsx(ROW_VALUE_STYLE)}>010-1111-2222</span>
      )}
      {isEditMode ? (
        <Button onClick={handleEditCompleteButtonClick}>완료</Button>
      ) : (
        <Button onClick={handleEditButtonClick}>수정</Button>
      )}
    </>
  );
};

export default PersonalInfo;

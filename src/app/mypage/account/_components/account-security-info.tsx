'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  ACCOUNT_PROFILE_SIZE,
  ROW_LABEL_STYLE,
  ROW_VALUE_STYLE,
  TITLE_STYLE,
} from '@/constants/mypage.constants';
import clsx from 'clsx';
import { useState } from 'react';

/** 회원정보 수정 페이지의 보안 섹션 컴포넌트 */
const SecurityInfo = () => {
  const [isEditMode, setIsEditMode] = useState<boolean>(false);
  const imageSize = ACCOUNT_PROFILE_SIZE;

  /** 비밀번호 수정 버튼 클릭 핸들러 */
  const handleEditButtonClick = () => {
    setIsEditMode(true);
  };

  /** 비밀번호 수정 완료 버튼 클릭 핸들러  */
  const handleEditCompleteButtonClick = () => {
    const isConfirmed = confirm('비밀번호를 수정하시겠습니까?');
    if (!isConfirmed) return;
    // 비밀번호 번호 수정 로직
    setIsEditMode(false);
  };

  return (
    <>
      <h3 className={clsx(TITLE_STYLE)}>보안</h3>
      {isEditMode ? (
        <>
          <div className="invisible" />
          <Label htmlFor="currentPassword" className={clsx(ROW_LABEL_STYLE)}>
            현재 비밀번호
          </Label>
          <Input id="currentPassword" placeholder="********" />
          <div className="invisible" />
          <div className="invisible" />
          <Label htmlFor="newPassword" className={clsx(ROW_LABEL_STYLE)}>
            새 비밀번호
          </Label>
          <Input
            id="newPassword"
            placeholder="숫자, 문자, 특수문자를 포함하여 8자 이상"
          />
          <div className="invisible" />
          <div className="invisible" />
          <Label htmlFor="newPasswordCheck" className={clsx(ROW_LABEL_STYLE)}>
            새 비밀번호 확인
          </Label>
          <Input
            id="newPasswordCheck"
            placeholder="숫자, 문자, 특수문자를 포함하여 8자 이상"
          />
          <Button onClick={handleEditCompleteButtonClick}>완료</Button>
        </>
      ) : (
        <>
          <div className="invisible" />
          <div className={clsx(ROW_VALUE_STYLE)}>현재 비밀번호</div>
          <div>********</div>
          <Button onClick={handleEditButtonClick}>수정</Button>
        </>
      )}
    </>
  );
};

export default SecurityInfo;

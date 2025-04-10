'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useState } from 'react';

// TODO - rowLabel에 하드코딩된 width 바꾸기
const PERSONAL_INFO_STYLE = {
  imageSize: 88,
  invisibleBox: 'invisible w-[88px]',
  title: 'my-3 text-lg font-semibold col-span-4 w-full',
  rowLabel: 'text-md whitespace-nowrap font-normal w-[110px]',
  rowValue: 'whitespace-nowrap',
};

/** 회원정보 수정 페이지의 개인 정보 섹션 컴포넌트 */
const PersonalInfo = ({ email, phone }: { email: string; phone: string }) => {
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
    <div className="m-1 grid grid-cols-[auto_auto_1fr_auto] items-center gap-3">
      <h3 className={PERSONAL_INFO_STYLE.title}>개인 정보</h3>
      <div className={PERSONAL_INFO_STYLE.invisibleBox} />
      <div className={PERSONAL_INFO_STYLE.rowLabel}>이메일</div>
      <div className={PERSONAL_INFO_STYLE.rowValue}>{email}</div>
      <div className="invisible" />
      <div className="invisible" />
      <Label htmlFor="phone" className={PERSONAL_INFO_STYLE.rowLabel}>
        휴대폰
      </Label>
      {isEditMode ? (
        <Input id="phone" placeholder={`${phone}`} />
      ) : (
        <span className={PERSONAL_INFO_STYLE.rowValue}>{phone}</span>
      )}
      {isEditMode ? (
        <Button onClick={handleEditCompleteButtonClick}>완료</Button>
      ) : (
        <Button onClick={handleEditButtonClick}>수정</Button>
      )}
    </div>
  );
};

export default PersonalInfo;

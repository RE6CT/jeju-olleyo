'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import useProviderFromCookie from '@/lib/hooks/use-get-provider';
import { useState } from 'react';

// TODO - rowLabel에 하드코딩된 width 바꾸기
const SECURITY_INFO_STYLE = {
  imageSize: 88,
  invisibleBox: 'invisible w-[88px]',
  title: 'my-3 text-lg font-semibold col-span-4 w-full',
  rowLabel: 'text-md whitespace-nowrap font-normal w-[110px]',
  rowValue: 'whitespace-nowrap',
};

/** 회원정보 수정 페이지의 보안 섹션 컴포넌트 */
const SecurityInfo = ({ userId }: { userId: string }) => {
  const [isEditMode, setIsEditMode] = useState<boolean>(false);
  const provider = useProviderFromCookie(userId);

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
    <div className="m-1 grid grid-cols-[auto_auto_1fr_auto] items-center gap-3">
      <h3 className={SECURITY_INFO_STYLE.title}>보안</h3>
      {isEditMode ? (
        <>
          <div className={SECURITY_INFO_STYLE.invisibleBox} />
          <Label
            htmlFor="currentPassword"
            className={SECURITY_INFO_STYLE.rowLabel}
          >
            현재 비밀번호
          </Label>
          <Input id="currentPassword" placeholder="********" />
          <div className="invisible" />
          <div className="invisible" />
          <Label htmlFor="newPassword" className={SECURITY_INFO_STYLE.rowLabel}>
            새 비밀번호
          </Label>
          <Input
            id="newPassword"
            placeholder="숫자, 문자, 특수문자를 포함하여 8자 이상"
          />
          <div className="invisible" />
          <div className="invisible" />
          <Label
            htmlFor="newPasswordCheck"
            className={SECURITY_INFO_STYLE.rowLabel}
          >
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
          <div className={SECURITY_INFO_STYLE.invisibleBox} />
          <div className={SECURITY_INFO_STYLE.rowLabel}>현재 비밀번호</div>
          <div>********</div>
          {provider !== 'email' ? (
            <div className="invisible" />
          ) : (
            <Button onClick={handleEditButtonClick}>수정</Button>
          )}
        </>
      )}
    </div>
  );
};

export default SecurityInfo;

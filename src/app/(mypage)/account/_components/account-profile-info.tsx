'use client';

import ProfileImage from '@/components/commons/profile-image';
import { Button } from '@/components/ui/button';
import ProfileImageButton from './account-profile-image-button';
import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import clsx from 'clsx';

const ACCOUNT_PROFILE_SIZE = 88;
const TITLE_STYLE = 'my-3 text-lg font-semibold col-span-4 w-full';
const ROW_LABEL_STYLE = 'text-md whitespace-nowrap font-normal';
const ROW_VALUE_STYLE = 'whitespace-nowrap';

/** 회원정보 수정 페이지의 프로필 섹션 컴포넌트 */
const ProfileInfo = () => {
  const [isEditMode, setIsEditMode] = useState<boolean>(false);

  /** 프로필/닉네임 수정 버튼 클릭 핸들러 */
  const handleEditButtonClick = () => {
    setIsEditMode(true);
  };

  /** 프로필/닉네임 수정 완료 버튼 클릭 핸들러  */
  const handleEditCompleteButtonClick = () => {
    const isConfirmed = confirm('프로필 이미지 및 닉네임을 수정하시겠습니까?');
    if (!isConfirmed) return;
    // 프로필 이미지 수정 로직
    // 닉네임 수정 로직
    setIsEditMode(false);
  };

  return (
    <>
      <h3 className={clsx(TITLE_STYLE)}>프로필</h3>
      <div
        className="relative mx-3 w-fit"
        style={{ minWidth: `${ACCOUNT_PROFILE_SIZE}px` }}
      >
        <ProfileImage
          image={null}
          width={ACCOUNT_PROFILE_SIZE}
          height={ACCOUNT_PROFILE_SIZE}
          className="rounded-full"
        />
        <ProfileImageButton />
      </div>
      <Label htmlFor="nickname" className={clsx(ROW_LABEL_STYLE)}>
        닉네임
      </Label>
      {isEditMode ? (
        <Input id="nickname" placeholder="부앙이" />
      ) : (
        <span className={clsx(ROW_VALUE_STYLE)}>부앙이</span>
      )}
      {isEditMode ? (
        <Button onClick={handleEditCompleteButtonClick}>완료</Button>
      ) : (
        <Button onClick={handleEditButtonClick}>수정</Button>
      )}
    </>
  );
};

export default ProfileInfo;

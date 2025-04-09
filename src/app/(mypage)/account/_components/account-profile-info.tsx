'use client';

import ProfileImage from '@/components/commons/profile-image';
import { Button } from '@/components/ui/button';
import ProfileImageButton from './account-profile-image-button';
import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

// TODO - rowLabel에 하드코딩된 width 바꾸기
const RROFILE_INFO_STYLE = {
  imageSize: 88,
  title: 'my-3 text-lg font-semibold col-span-4 w-full',
  rowLabel: 'text-md whitespace-nowrap font-normal w-[110px]',
  rowValue: 'whitespace-nowrap',
};

/** 회원정보 수정 페이지의 프로필 섹션 컴포넌트 */
const ProfileInfo = ({
  nickname,
  profileImage,
  provider,
}: {
  nickname: string;
  profileImage: string;
  provider: string;
}) => {
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
    <div className="m-1 grid grid-cols-[auto_auto_1fr_auto] items-center gap-3">
      <h3 className={RROFILE_INFO_STYLE.title}>프로필</h3>
      <div className="relative w-fit">
        <ProfileImage
          image={profileImage}
          width={RROFILE_INFO_STYLE.imageSize}
          height={RROFILE_INFO_STYLE.imageSize}
          className="rounded-full"
        />
        {provider === 'email' && <ProfileImageButton />}
      </div>
      <Label htmlFor="nickname" className={RROFILE_INFO_STYLE.rowLabel}>
        닉네임
      </Label>
      {isEditMode ? (
        <Input id="nickname" placeholder={`${nickname}`} />
      ) : (
        <span className={RROFILE_INFO_STYLE.rowValue}>{nickname}</span>
      )}
      {isEditMode ? (
        <Button onClick={handleEditCompleteButtonClick}>완료</Button>
      ) : (
        <>
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

export default ProfileInfo;

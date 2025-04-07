'use client';

import ProfileImage from '@/components/commons/profile-image';
import { Button } from '@/components/ui/button';
import ProfileImageButton from './account-profile-image-button';
import { useState } from 'react';
import { Input } from '@/components/ui/input';

/** 회원정보 수정 페이지의 프로필 섹션 컴포넌트 */
const ProfileInfo = () => {
  const [isEditMode, setIsEditMode] = useState<boolean>(false);

  /** 프로필/닉네임 수정 버튼 클릭 핸들러 */
  const handleEditButtonClick = () => {
    setIsEditMode(true);
  };

  /** 프로필/닉네임 수정 완료 버튼 클릭 핸들러  */
  const handleEditCompleteButtonClick = () => {
    // 프로필 이미지 수정 로직
    // 닉네임 수정 로직
    setIsEditMode(false);
  };

  return (
    <section className="flex flex-col gap-3">
      <h3 className="text-lg font-semibold">프로필</h3>
      <div className="flex">
        <div className="flex min-w-[176px]">
          <div className="relative">
            <ProfileImage
              image={null}
              width={88}
              height={88}
              className="rounded-[44px]"
            />
            <ProfileImageButton />
          </div>
        </div>
        <div className="flex w-full items-center">
          <span className="w-[120px]">닉네임</span>
          {isEditMode ? (
            <Input placeholder="부앙이" />
          ) : (
            <span className="flex-grow">부앙이</span>
          )}
          {isEditMode ? (
            <Button onClick={handleEditCompleteButtonClick} className="w-fit">
              완료
            </Button>
          ) : (
            <Button onClick={handleEditButtonClick} className="w-fit">
              수정
            </Button>
          )}
        </div>
      </div>
    </section>
  );
};

export default ProfileInfo;

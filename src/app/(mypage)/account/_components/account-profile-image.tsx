import ProfileImage from '@/components/commons/profile-image';
import ProfileImageButton from './account-profile-image-button';
import { useState } from 'react';
import ProfileModal from './account-profile-modal';

const IMAGE_SIZE = 88;

/**
 * 프로필 이미지와 수정 버튼을 띄우는 컴포넌트
 * @param userId - 유저의 uuid
 * @param profileImage - 유저의 프로필 이미지
 * @param provider - 현재 로그인한 유저의 provider
 */
const AccountProfileImage = ({
  userId,
  profileImage,
  provider,
}: {
  userId: string;
  profileImage: string;
  provider: string | undefined;
}) => {
  const [isModalOpen, setModalOpen] = useState<boolean>(false);

  /** 드롭다운 [사진 변경] 메뉴 클릭 핸들러 */
  const handleProfileImageEdit = () => {
    setModalOpen(true);
  };

  /** 프로필 사진 초기화 핸들러 */
  const handleProfileImageDelete = () => {
    const isConfirmed = confirm(
      '프로필 사진을 기본 이미지로 변경하시겠습니까?',
    );
    if (!isConfirmed) return;
  };

  return (
    <>
      <div className="relative w-fit">
        <ProfileImage
          image={profileImage}
          width={IMAGE_SIZE}
          height={IMAGE_SIZE}
          className="rounded-full"
        />
        {provider === 'email' && (
          <ProfileImageButton
            onEdit={handleProfileImageEdit}
            onDelete={handleProfileImageDelete}
          />
        )}
        <ProfileModal
          userId={userId}
          isModalOpen={isModalOpen}
          setModalOpen={setModalOpen}
        />
      </div>
    </>
  );
};

export default AccountProfileImage;

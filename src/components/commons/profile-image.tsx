import { getProfileImageWithFallback } from '@/lib/utils/get-image-with-fallback';
import { ProfileImageProps } from '@/types/common.type';
import Image from 'next/image';

/**
 * 프로필 이미지 컴포넌트
 * @param image - 프로필 이미지
 * @param width - 이미지 너비 (디폴트 50)
 * @param height - 이미지 높이 (디폴트 50)
 * @param className - 커스텀 클래스 속성 넣고 싶은 경우 추가 (필수 X)
 *
 * @example
 * <ProfileImage image={user.profileImg} width={58} height={58} />
 */
const ProfileImage = ({
  image,
  className,
  width = 50,
  height = 50,
  ...props
}: ProfileImageProps) => {
  // null 여부 판단해서 디폴트 이미지 추가
  const profileImage = getProfileImageWithFallback(image);

  return (
    <Image
      src={profileImage}
      width={width}
      height={height}
      alt="프로필 이미지"
      className={`object-cover ${className}`}
      {...props}
    />
  );
};

export default ProfileImage;

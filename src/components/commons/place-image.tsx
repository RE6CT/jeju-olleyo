import { getPlaceImageWithFallback } from '@/lib/utils/get-image-with-fallback';
import { PlaceImageProps } from '@/types/common.type';

/**
 * 장소 이미지 컴포넌트
 * @param image - 장소 이미지
 * @param title - 장소의 타이틀 (alt 속성용)
 * @param className - 커스텀 클래스 속성 넣고 싶은 경우 추가 (필수 X)
 * - 반응형 고려하여 높이와 너비를 받지 않고 fill로 설정하였습니다.
 *
 * @example
 * <PlaceImage image={place.image} title={place.title} />
 */
const PlaceImage = ({ image, className, title, ...props }: PlaceImageProps) => {
  // null 여부 판단해서 디폴트 이미지 추가
  const placeImage = getPlaceImageWithFallback(image);

  return (
    <img
      src={placeImage}
      alt={title}
      draggable="false"
      className={`object-cover ${className} aspect-square w-full`}
      {...props}
    />
  );
};

export default PlaceImage;

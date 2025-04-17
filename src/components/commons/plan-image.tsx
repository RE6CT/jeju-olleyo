import { getPlanImageWithFallback } from '@/lib/utils/get-image-with-fallback';
import { PlaceImageProps } from '@/types/common.type';
import Image from 'next/image';

/**
 * 일정 이미지 컴포넌트
 * @param image - 일정 이미지
 * @param title - 일정의 타이틀 (alt 속성용)
 * @param className - 커스텀 클래스 속성 넣고 싶은 경우 추가 (필수 X)
 * - 반응형 고려하여 높이와 너비를 받지 않고 fill로 설정하였습니다.
 *
 * @example
 * <PlanImage image={plan.planImg} title={plan.title} />
 */
const PlanImage = ({ image, className, title, ...props }: PlaceImageProps) => {
  // null 여부 판단해서 디폴트 이미지 추가
  const planImage = getPlanImageWithFallback(image);

  return (
    <Image
      src={planImage}
      alt={title}
      fill
      className={`object-cover ${className}`}
      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
      {...props}
    />
  );
};

export default PlanImage;

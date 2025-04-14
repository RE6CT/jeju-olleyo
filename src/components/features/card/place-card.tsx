import { PlaceCardProps } from '@/types/card.type';
import Link from 'next/link';
import PlaceImage from '@/components/commons/place-image';

/**
 * @param placeId 장소의 id
 * @param image 이미지 값
 * @param title 장소 이름
 * @param isLiked 좋아요 여부
 * @param className 스타일
 *
 */
const PlaceCard = ({
  placeId,
  image,
  title,
  isLiked,
  className,
}: PlaceCardProps) => {
  //현재 카테고리 카드는 이벤트 없음
  return (
    <Link href={`/place/${placeId}`} className={`${className}`}>
      <div className="relative flex flex-col gap-2">
        <div className="relative aspect-square">
          <PlaceImage image={image} title={title} className="rounded-12" />
        </div>
        <h4 className="medium-16 px-2">{title}</h4>
        {/* 추후 기능 추가된 좋아요 버튼이 생긴다면 이 부분을 대체하면 됩니다. */}
        <button className="absolute right-3 top-3">
          <svg
            width="44"
            height="42"
            viewBox="0 0 44 42"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M13.4293 35C13.1839 34.9992 12.9428 34.9295 12.7293 34.7978C12.5087 34.6627 12.325 34.4662 12.197 34.2284C12.0689 33.9906 12.0013 33.7201 12.0008 33.4444V10.6244C11.9815 9.6916 12.3006 8.78805 12.8888 8.10961C13.477 7.43117 14.2871 7.0325 15.1434 7H28.8566C29.7129 7.0325 30.523 7.43117 31.1112 8.10961C31.6994 8.78805 32.0185 9.6916 31.9992 10.6244V33.4444C31.9977 33.7159 31.931 33.9822 31.8057 34.2169C31.6804 34.4516 31.5008 34.6465 31.2849 34.7822C31.0678 34.9188 30.8215 34.9906 30.5707 34.9906C30.32 34.9906 30.0736 34.9188 29.8565 34.7822L21.7572 29.7889L14.1435 34.7667C13.9286 34.9119 13.6821 34.9925 13.4293 35Z"
              className={`${isLiked ? 'fill-primary-500' : 'fill-gray-200'}`}
            />
          </svg>
        </button>
      </div>
    </Link>
  );
};

export default PlaceCard;

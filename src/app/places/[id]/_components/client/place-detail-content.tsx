'use client';

import BookmarkButton from '@/components/features/like/bookmark-button';
import CategoryBadge from '@/components/commons/category-badge';
import PlaceImage from '@/components/commons/place-image';
import PlaceLocation from './place-location';
import { CategoryType } from '@/types/category.type';
import { Place } from '@/types/search.type';
import { DetailIntroRaw } from '@/types/korea-tour.type';

const PlaceDetailContent = ({
  place,
  detailJson,
  isBookmarked,
}: {
  place: Place;
  detailJson: DetailIntroRaw;
  isBookmarked: boolean;
}) => {
  const placeId = place.placeId;
  const isHotel = place.contentTypeId === 32;

  const rawSummary = isHotel
    ? detailJson
      ? `${detailJson.openTime || '체크인/아웃 시간 정보 없음'}`
      : '정보 없음'
    : detailJson
      ? `${detailJson.openTime || '운영 시간 정보 없음'}${
          detailJson.closeDay ? ` (휴무: ${detailJson.closeDay})` : ''
        }`
      : '정보 없음';

  const openSummary = rawSummary.replace(/<br\s*\/?>/gi, '\n');

  return (
    <div className="mt-[73px] flex flex-col items-center justify-center px-9">
      <div className="flex gap-8">
        <div className="relative aspect-square w-[479px] bg-no-repeat object-cover">
          <PlaceImage image={place.image} title={place.title} />
        </div>

        <div className="flex flex-col justify-start space-y-3 pt-2">
          <div className="flex items-center gap-2">
            <CategoryBadge
              category={place.category as CategoryType}
              badgeType="modal"
            />
          </div>

          <div className="mb-[10px] mt-[10px] flex items-center gap-2">
            <div className="bold-28 text-xl">{place.title}</div>
            <div className="ml-auto">
              <BookmarkButton isBookmarked={isBookmarked} placeId={placeId} />
            </div>
          </div>

          <div className="mt-2 space-y-[9.5px] text-gray-300">
            <div className="medium-18 flex space-x-2">
              <svg
                width="28"
                height="28"
                viewBox="0 0 48 48"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M6 24C6 14.0586 14.0586 6 24 6C33.9414 6 42 14.0586 42 24C42 33.9414 33.9414 42 24 42C14.0586 42 6 33.9414 6 24ZM25.8 15C25.8 14.5226 25.6104 14.0648 25.2728 13.7272C24.9352 13.3896 24.4774 13.2 24 13.2C23.5226 13.2 23.0648 13.3896 22.7272 13.7272C22.3896 14.0648 22.2 14.5226 22.2 15V21.7752C22.2 22.7779 22.4792 23.7608 23.0063 24.6137C23.5334 25.4667 24.2876 26.1561 25.1844 26.6046L30.3954 29.2092C30.6076 29.3236 30.8406 29.3943 31.0806 29.4169C31.3206 29.4396 31.5627 29.4138 31.7925 29.3411C32.0223 29.2684 32.2352 29.1503 32.4186 28.9938C32.6019 28.8372 32.7519 28.6455 32.8597 28.4299C32.9675 28.2142 33.0309 27.9792 33.0462 27.7386C33.0614 27.498 33.0281 27.2568 32.9484 27.0293C32.8686 26.8019 32.744 26.5927 32.5819 26.4143C32.4197 26.2359 32.2234 26.0919 32.0046 25.9908L26.7954 23.3844C26.4965 23.235 26.245 23.0054 26.0692 22.7211C25.8934 22.4369 25.8002 22.1094 25.8 21.7752V15Z"
                  fill="#A7BDC8"
                />
              </svg>
              {isHotel ? '체크인/체크아웃' : ''}
              {openSummary}
            </div>
            <div className="medium-18 flex space-x-2">
              <svg
                width="28"
                height="28"
                viewBox="0 0 48 48"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M31.1135 28.8121L30.2036 29.7181C30.2036 29.7181 28.0376 31.8702 22.1276 25.9941C16.2176 20.1181 18.3836 17.966 18.3836 17.966L18.9556 17.394C20.3696 15.99 20.5036 13.734 19.2696 12.086L16.7496 8.71997C15.2216 6.67996 12.2717 6.40995 10.5217 8.14997L7.3817 11.27C6.51571 12.134 5.93571 13.25 6.00571 14.49C6.18571 17.664 7.6217 24.4901 15.6296 32.4542C24.1236 40.8982 32.0935 41.2342 35.3515 40.9302C36.3835 40.8342 37.2795 40.3102 38.0015 39.5902L40.8415 36.7662C42.7615 34.8602 42.2215 31.5902 39.7655 30.2561L35.9455 28.1781C34.3335 27.3041 32.3735 27.5601 31.1135 28.8121Z"
                  fill="#A7BDC8"
                />
              </svg>
              {detailJson?.phone || '전화번호 미제공'}
            </div>
          </div>

          <div className="semibold-18 mt-[11px] text-gray-300">
            <div className="flex space-x-2">
              <svg
                width="28"
                height="28"
                viewBox="0 0 48 48"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M36.7273 9.14727C40.0319 12.3733 41.9219 16.7277 41.9976 21.2896C42.0734 25.8516 40.329 30.2635 37.1333 33.5924L36.7273 34.0025L28.2415 42.2856C27.1648 43.3362 25.7193 43.9479 24.1979 43.9968C22.6765 44.0458 21.193 43.5283 20.0477 42.5492L19.7598 42.2856L11.272 34.0005C7.89639 30.7048 6 26.2348 6 21.5739C6 16.913 7.89639 12.443 11.272 9.14727C14.6476 5.85153 19.2258 4 23.9996 4C28.7734 4 33.3517 5.85153 36.7273 9.14727ZM23.9996 15.716C21.238 15.716 18.9998 17.9542 18.9998 20.7159C18.9998 23.4775 21.238 25.7158 23.9996 25.7158C26.7613 25.7158 28.9995 23.4775 28.9995 20.7159C28.9995 17.9542 26.7613 15.716 23.9996 15.716Z"
                  fill="#A7BDC8"
                />
              </svg>
              {place.address}
            </div>
          </div>

          {/* 지도영역 */}
          <div className="mb-auto">
            <PlaceLocation
              lat={place.lat}
              lng={place.lng}
              title={place.title}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlaceDetailContent;

'use client';

import CategoryBadge from '@/components/commons/category-badge';
import PlaceImage from '@/components/commons/place-image';
import { getBrowserClient } from '@/lib/supabase/client';
import { CategoryType } from '@/types/category-badge.type';
import { DetailIntroRaw } from '@/types/korea-tour.type';
import { Place } from '@/types/search.type';
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import PlaceLocation from './_components/place-location';

const PlaceDetailPage = () => {
  const params = useParams();

  const [place, setPlace] = useState<Place | null>(null);
  const [detailInfo, setDetailInfo] = useState<DetailIntroRaw | undefined>(
    undefined,
  );
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchGetPlaceById = async () => {
      try {
        const supabase = await getBrowserClient();

        const { data, error } = await supabase
          .from('places')
          .select('*')
          .eq('place_id', Number(params.id))
          .single();

        if (error || !data) {
          setError('수파베이스 장소 불러오기 실패');
          return;
        }

        setPlace(data);

        const contentId = data.place_id;
        const contentTypeId = data.content_type_id;

        const detailRes = await fetch(
          `/api/korea-tour/detail?contentId=${contentId}&contentTypeId=${contentTypeId}`,
        );

        const detailJson = await detailRes.json();

        if (!detailRes.ok) {
          setError('상세정보 불러오기 실패');
          return;
        }

        setDetailInfo(detailJson);
      } catch (err) {
        console.error('장소 불러오기 에러:', err);
      }
    };

    if (params?.id) {
      fetchGetPlaceById();
    }
  }, [params]);

  return (
    <>
      {place ? (
        <div className="flex gap-8">
          <div className="relative aspect-square h-[415px] w-[553px] bg-no-repeat object-cover">
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
              <div>북마크 영역</div>
            </div>

            {detailInfo ? (
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
                      fill-rule="evenodd"
                      clip-rule="evenodd"
                      d="M6 24C6 14.0586 14.0586 6 24 6C33.9414 6 42 14.0586 42 24C42 33.9414 33.9414 42 24 42C14.0586 42 6 33.9414 6 24ZM25.8 15C25.8 14.5226 25.6104 14.0648 25.2728 13.7272C24.9352 13.3896 24.4774 13.2 24 13.2C23.5226 13.2 23.0648 13.3896 22.7272 13.7272C22.3896 14.0648 22.2 14.5226 22.2 15V21.7752C22.2 22.7779 22.4792 23.7608 23.0063 24.6137C23.5334 25.4667 24.2876 26.1561 25.1844 26.6046L30.3954 29.2092C30.6076 29.3236 30.8406 29.3943 31.0806 29.4169C31.3206 29.4396 31.5627 29.4138 31.7925 29.3411C32.0223 29.2684 32.2352 29.1503 32.4186 28.9938C32.6019 28.8372 32.7519 28.6455 32.8597 28.4299C32.9675 28.2142 33.0309 27.9792 33.0462 27.7386C33.0614 27.498 33.0281 27.2568 32.9484 27.0293C32.8686 26.8019 32.744 26.5927 32.5819 26.4143C32.4197 26.2359 32.2234 26.0919 32.0046 25.9908L26.7954 23.3844C26.4965 23.235 26.245 23.0054 26.0692 22.7211C25.8934 22.4369 25.8002 22.1094 25.8 21.7752V15Z"
                      fill="#A7BDC8"
                    />
                  </svg>
                  {detailInfo.openTime}
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
                  {detailInfo.phone}
                </div>
              </div>
            ) : (
              <p className="text-sm text-gray-300">
                상세 정보를 불러오는 중...
              </p>
            )}

            <div className="semibold-18 mt-[11px] text-gray-300">
              <div className="flex space-x-2">
                <svg
                  width="28"
                  height="28"
                  viewBox="0 0 48 48"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <g id="&#236;&#167;&#128;&#235;&#143;&#132; &#237;&#149;&#128;">
                    <path
                      id="Vector"
                      d="M36.7273 9.14727C40.0319 12.3733 41.9219 16.7277 41.9976 21.2896C42.0734 25.8516 40.329 30.2635 37.1333 33.5924L36.7273 34.0025L28.2415 42.2856C27.1648 43.3362 25.7193 43.9479 24.1979 43.9968C22.6765 44.0458 21.193 43.5283 20.0477 42.5492L19.7598 42.2856L11.272 34.0005C7.89639 30.7048 6 26.2348 6 21.5739C6 16.913 7.89639 12.443 11.272 9.14727C14.6476 5.85153 19.2258 4 23.9996 4C28.7734 4 33.3517 5.85153 36.7273 9.14727ZM23.9996 15.716C23.2117 15.716 22.4315 15.8675 21.7036 16.1619C20.9757 16.4563 20.3142 16.8878 19.7571 17.4317C19.2 17.9757 18.758 18.6214 18.4565 19.3322C18.155 20.0429 17.9998 20.8046 17.9998 21.5739C17.9998 22.3432 18.155 23.1049 18.4565 23.8156C18.758 24.5263 19.2 25.1721 19.7571 25.7161C20.3142 26.26 20.9757 26.6915 21.7036 26.9859C22.4315 27.2803 23.2117 27.4318 23.9996 27.4318C25.5909 27.4318 27.117 26.8146 28.2422 25.7161C29.3674 24.6175 29.9995 23.1275 29.9995 21.5739C29.9995 20.0203 29.3674 18.5303 28.2422 17.4317C27.117 16.3331 25.5909 15.716 23.9996 15.716Z"
                      fill="#A7BDC8"
                    />
                  </g>
                </svg>
                {place.address}
              </div>
            </div>

            <PlaceLocation
              lat={place.lat}
              lng={place.lng}
              title={place.title}
            />
          </div>
        </div>
      ) : (
        <p className="text-gray-300">장소 정보를 불러오는 중...</p>
      )}
    </>
  );
};

export default PlaceDetailPage;

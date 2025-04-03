import {
  AREA_CODE_JEJU,
  KOREA_TOUR_API_KEY,
  KOREA_TOUR_APP_NAME,
  KOREA_TOUR_BASE_URL,
  PAGE_SIZE,
  TOTAL_PAGES,
} from '@/constants/\bkorea-tour-api';
import { ApiError } from 'next/dist/server/api-utils';
import { NextResponse, NextRequest } from 'next/server';

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url, 'http://localhost:3000');
  const keyword = searchParams.get('query');

  const areaCode = AREA_CODE_JEJU;
  const appName = encodeURIComponent(KOREA_TOUR_APP_NAME);
  const apiKey = encodeURIComponent(KOREA_TOUR_API_KEY);
  if (!areaCode || !appName || !apiKey) {
    throw new ApiError(500, 'API 설정 누락');
  }
  const baseUrl = KOREA_TOUR_BASE_URL;
  if (!baseUrl) {
    throw new ApiError(500, 'API endpoint URL 설정이 잘못되었습니다.');
  }

  // 제주 데이터 모든 페이지 순회
  const requests = Array.from({ length: TOTAL_PAGES }, (_, idx) => {
    const page = idx + 1;
    const url = `${baseUrl}?numOfRows=${PAGE_SIZE}&pageNo=${page}&MobileOS=ETC&MobileApp=${appName}&areaCode=${areaCode}&_type=json&serviceKey=${apiKey}`;
    return fetch(url)
      .then(async (res) => {
        if (!res.ok) {
          const errorText = await res.text();
          throw new ApiError(
            res.status,
            `page ${page} 요청 실패: ${errorText}`,
          );
        }
        return res.json();
      })
      .catch((e) => {
        throw new ApiError(500, `page ${page} 요청 실패: ${e.message}`);
      });
  });

  // 지역기반 관광정보조회 (한국관광공사_국문 관광정보 서비스_GW) - 전체검색
  try {
    const res = await Promise.all(requests);

    const allPlaces = res.flatMap((data) => {
      const rawData = data?.response?.body?.items?.item;
      return Array.isArray(rawData) ? rawData : Object.values(rawData ?? {});
    });

    // 쿼리 기준 필터링
    const filteredPlace = allPlaces.filter((p: any) => {
      return p.title?.includes(keyword);
    });

    return NextResponse.json(filteredPlace);
  } catch (error) {
    return NextResponse.json({ error: '검색 중 오류 발생' }, { status: 500 });
  }
}

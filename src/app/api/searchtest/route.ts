import {
  AREA_CODE_JEJU,
  KOREA_TOUR_API_KEY,
  KOREA_TOUR_APP_NAME,
  KOREA_TOUR_BASE_URL,
} from '@/constants/\bkorea-tour-api';
import { NextResponse, NextRequest } from 'next/server';

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url, 'http://localhost:3000');
  const keyword = searchParams.get('query');

  const areaCode = AREA_CODE_JEJU;
  const appName = encodeURIComponent(KOREA_TOUR_APP_NAME);
  const apiKey = encodeURIComponent(KOREA_TOUR_API_KEY);
  const baseUrl = KOREA_TOUR_BASE_URL;
  const url = `${baseUrl}?numOfRows=100&MobileOS=ETC&MobileApp=${appName}&areaCode=${areaCode}&_type=json&serviceKey=${apiKey}`;

  // 지역기반 관광정보조회 (한국관광공사_국문 관광정보 서비스_GW) - 전체검색
  try {
    const res = await fetch(url);
    if (!res.ok) {
      const errorText = await res.text();
      throw new Error(`api 호출 실패: ${res.status} => ${errorText}`);
    }

    const data = await res.json();
    const rawData = data?.response?.body?.items?.item;
    if (!rawData) {
      throw new Error('데이터가 없음');
    }

    const placeInfo = Array.isArray(rawData)
      ? rawData
      : Object.values(rawData ?? {});

    // 쿼리 기준 필터링
    const filteredPlace = placeInfo.filter((p: any) => {
      return p.title?.includes(keyword);
    });

    return NextResponse.json(filteredPlace);
  } catch (error) {
    return NextResponse.json({ error: '검색 중 오류 발생' }, { status: 500 });
  }
}

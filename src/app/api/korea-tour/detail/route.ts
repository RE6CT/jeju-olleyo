import { ApiError } from 'next/dist/server/api-utils';
import { NextResponse, NextRequest } from 'next/server';

import {
  AREA_CODE_JEJU,
  KOREA_TOUR_API_KEY,
  KOREA_TOUR_APP_NAME,
  KOREA_TOUR_BASE_URL,
} from '@/constants/korea-tour-api';
import { DetailIntroRaw } from '@/types/korea-tour.type';

export async function GET(req: NextRequest) {
  const searchParams = req.nextUrl.searchParams;

  const contentId = searchParams.get('contentId');
  const contentTypeId = searchParams.get('contentTypeId');

  const areaCode = AREA_CODE_JEJU;
  const appName = encodeURIComponent(KOREA_TOUR_APP_NAME);
  const apiKey = encodeURIComponent(KOREA_TOUR_API_KEY);
  const baseUrl = KOREA_TOUR_BASE_URL;

  if (
    !contentId ||
    !contentTypeId ||
    !areaCode ||
    !appName ||
    !apiKey ||
    !baseUrl
  ) {
    throw new ApiError(500, 'API 설정 누락');
  }

  const url = `${baseUrl}?MobileOS=ETC&MobileApp=${appName}&_type=json&contentId=${contentId}&contentTypeId=${contentTypeId}&serviceKey=${apiKey}`;

  try {
    const res = await fetch(url);
    if (!res.ok) {
      return NextResponse.json(
        { error: '외부 API 요청 실패' },
        { status: res.status },
      );
    }

    const data = await res.json();
    const rawData: DetailIntroRaw =
      data?.response?.body?.items?.item?.[0] || {};

    let phone = '';
    let openTime = '';
    let closeDay = '';

    switch (contentTypeId) {
      case '32': // 숙박
        phone = rawData.infocenterlodging || '';
        openTime = `${rawData.checkintime || ''} ~ ${rawData.checkouttime || ''}`;
        break;

      case '39': // 음식점 (카페 포함됨)
        phone = rawData.infocenterfood || '';
        openTime = rawData.opentimefood || '';
        closeDay = rawData.restdatefood || '';
        break;

      case '12': // 명소 (공공 api 상 관광지)
      default:
        phone = rawData.infocenter || '';
        openTime = rawData.usetime || '';
        break;
    }

    return NextResponse.json({ phone, openTime, closeDay, rawData });
  } catch (err: unknown) {
    return NextResponse.json(
      { error: (err as Error).message },
      { status: 500 },
    );
  }
}

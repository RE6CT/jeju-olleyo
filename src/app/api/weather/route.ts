import { NextRequest, NextResponse } from 'next/server';
import { weatherApi } from '@/lib/apis/home/home.weather.api';

// 환경 변수에서 API 키 가져오기
const API_KEY = process.env.VISUALCROSSING_API_KEY;
// 제주도 위치
const LOCATION = 'Jeju,KR';

export const dynamic = 'force-dynamic';
export const revalidate = 21600; // 6시간마다 갱신 (하루 4번)

/**
 * 날씨 데이터 API 라우트 핸들러
 * @param request NextRequest 객체
 * @returns 날씨 데이터 또는 에러 응답
 */
export async function GET(request: NextRequest) {
  // 강제 갱신 요청인지 확인
  const forceFresh = request.nextUrl.searchParams.get('fresh') === 'true';

  try {
    if (!API_KEY) {
      return NextResponse.json(
        { error: 'API 키가 설정되지 않았습니다' },
        { status: 500 },
      );
    }

    // 날씨 데이터 가져오기 (force 옵션 전달)
    const weatherData = await weatherApi.fetchWeatherFromAPI(
      API_KEY,
      LOCATION,
      forceFresh,
    );

    if (weatherData.length === 0) {
      return NextResponse.json(
        { error: '날씨 데이터를 가져오는데 실패했습니다' },
        { status: 500 },
      );
    }

    // 마지막 갱신 시간 추가
    const responseData = {
      data: weatherData,
      lastUpdated: new Date().toISOString(),
    };

    return NextResponse.json(responseData);
  } catch (error) {
    console.error('날씨 API 오류:', error);
    return NextResponse.json(
      { error: '날씨 데이터를 가져오는데 실패했습니다' },
      { status: 500 },
    );
  }
}

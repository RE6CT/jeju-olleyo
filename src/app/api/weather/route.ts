import { NextRequest, NextResponse } from 'next/server';
import { weatherApi } from '@/lib/apis/home/home.weather.api';

// 환경 변수에서 API 키 가져오기
const API_KEY = process.env.VISUALCROSSING_API_KEY;
// 제주도 위치
const LOCATION = 'Jeju,KR';

// 6시간마다 자동 갱신 설정 (하루 4번)
export const revalidate = 21600;

/**
 * 날씨 데이터 API 라우트 핸들러
 *
 * @description API 엔드포인트로 날씨 데이터를 제공합니다.
 * 기본적으로 캐시된 데이터를 반환하며, `fresh=true` 쿼리 파라미터로 강제 갱신할 수 있습니다.
 *
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

    // HTTP 헤더 설정
    const headers = new Headers();

    // 캐시 설정 (강제 갱신이 아닌 경우만)
    if (!forceFresh) {
      // HTTP 캐싱 지시문
      headers.set(
        'Cache-Control',
        'public, s-maxage=21600, stale-while-revalidate=3600',
      );
    } else {
      // 강제 갱신 시 캐싱 비활성화
      headers.set('Cache-Control', 'no-store, must-revalidate');
    }

    return NextResponse.json(responseData, {
      status: 200,
      headers,
    });
  } catch (error) {
    console.error('날씨 API 오류:', error);
    return NextResponse.json(
      { error: '날씨 데이터를 가져오는데 실패했습니다' },
      { status: 500 },
    );
  }
}

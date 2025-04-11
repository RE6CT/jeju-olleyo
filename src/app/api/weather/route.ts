import { NextResponse } from 'next/server';
import { weatherService } from '@/lib/apis/home/home.weather.api';

// 환경 변수에서 API 키 가져오기
const API_KEY = process.env.VISUALCROSSING_API_KEY;
// 제주도 위치
const LOCATION = 'Jeju,KR';

export const dynamic = 'force-dynamic';
export const revalidate = 86400; // 하루에 한 번 갱신

/**
 * 날씨 데이터 API 라우트 핸들러
 */
export async function GET() {
  try {
    if (!API_KEY) {
      throw new Error('API 키가 설정되지 않았습니다');
    }

    const weatherData = await weatherService.fetchWeatherFromAPI(
      API_KEY,
      LOCATION,
    );

    return NextResponse.json(weatherData);
  } catch (error) {
    console.error('날씨 API 오류:', error);
    return NextResponse.json(
      { error: '날씨 데이터를 가져오는데 실패했습니다' },
      { status: 500 },
    );
  }
}

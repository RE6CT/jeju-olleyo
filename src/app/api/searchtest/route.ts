import { NextResponse, NextRequest } from 'next/server';

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url, 'http://localhost:3000');
  const keyword = searchParams.get('query');

  const areaCode = '39';
  const apiKey = process.env.NEXT_PUBLIC_KOREA_TOUR_API_KEY;
  const baseUrl = 'https://apis.data.go.kr/B551011/KorService1/areaBasedList1';
  const url = `${baseUrl}?MobileOS=ETC&MobileApp=%EC%A0%9C%EC%A3%BC%EC%98%AC%EB%A0%88%EC%9A%94&areaCode=${areaCode}&serviceKey=${apiKey}`;

  // 지역기반 관광정보조회 (한국관광공사_국문 관광정보 서비스_GW) - 전체검색
  try {
    const res = await fetch(url);
    const data = await res.json();
    console.log(data);
    const placeInfo = Array.isArray(data) ? data : Object.values(data ?? {});

    const filteredPlace = placeInfo.filter((p: any) => {
      return p.title?.includes(keyword);
    });

    return NextResponse.json(filteredPlace);
  } catch (error) {
    return NextResponse.json({ error: '검색 중 오류 발생' }, { status: 500 });
  }
}

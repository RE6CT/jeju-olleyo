import axios from 'axios';

export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const schDate = searchParams.get('schDate');
  const schDeptCityCode = searchParams.get('schDeptCityCode');
  const schArrvCityCode = searchParams.get('schArrvCityCode');

  const serviceKey = process.env.NEXT_PUBLIC_FLIGHT_API_KEY;

  const url = `http://openapi.airport.co.kr/service/rest/FlightScheduleList/getDflightScheduleList?serviceKey=${serviceKey}&schDate=${schDate}&schDeptCityCode=${schDeptCityCode}&schArrvCityCode=${schArrvCityCode}&_type=json`; // ✅ JSON 응답 요청

  try {
    const response = await axios.get(url);

    const items = response.data?.response?.body?.items?.item || [];

    return new Response(JSON.stringify({ items }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('API 요청 실패:', error.message);

    return new Response(
      JSON.stringify({ error: '항공기 정보를 불러오는데 실패했습니다' }),
      {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      },
    );
  }
}

export const AREA_CODE_JEJU = '39';

export const KOREA_TOUR_APP_NAME = '제주올레요';

export const KOREA_TOUR_BASE_URL =
  'https://apis.data.go.kr/B551011/KorService1/areaBasedList1';

export const KOREA_TOUR_API_KEY = process.env.NEXT_PUBLIC_KOREA_TOUR_API_KEY!;

export const PAGE_SIZE = 100;
export const TOTAL_COUNT = 2330;
export const TOTAL_PAGES = Math.ceil(TOTAL_COUNT / PAGE_SIZE);

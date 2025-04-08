export const FILTER_TYPES = {
  TITLE: 'title',
  DATE: 'date',
  PUBLIC: 'public',
} as const; // string을 리터럴 타입으로 추론되게 하기 위해

export const PUBLIC_OPTIONS = {
  ALL: '전체',
  PUBLIC: '공개',
  PRIVATE: '비공개',
} as const;

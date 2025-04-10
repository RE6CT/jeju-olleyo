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

export const TEXT = {
  noImage: '이미지 없음',
  noDescription: '설명이 없습니다.',
  noDate: '날짜 미정',
  dateSeparator: '-',
  edit: '수정하기',
  delete: '삭제하기',
} as const;

export const ITEMS_PER_PAGE = 10; // 페이지당 표시할 일정 수

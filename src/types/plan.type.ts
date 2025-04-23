import { FILTER_TYPES, PUBLIC_OPTIONS } from '@/constants/plan.constants';

import { CamelCaseObject } from './common.type';
import { Database } from './supabase.type';
import { DayPlaces, TabType } from './plan-detail.type';

/**
 * 계획(Plan) 관련 타입들
 */

/**
 * 데이터베이스에서 가져온 원본 계획 데이터 타입
 */
export type PlansRow = Database['public']['Tables']['plans']['Row'];

/**
 * 사용자 정보 중 닉네임만 선택적으로 가져오는 타입
 */
export type UsersNicknameRow = Pick<
  Database['public']['Tables']['users']['Row'],
  'nickname'
>;

/**
 * 계획의 기본 정보를 나타내는 타입
 * PlansRow와 UsersNicknameRow 합친 후 CamelCase로 변환
 */
export type Plan = CamelCaseObject<
  PlansRow & UsersNicknameRow & { is_liked: boolean }
>;

/**
 * 일자별 방문 장소 정보가 포함된 계획 타입
 */
export type PlanWithDays = Plan & {
  /** 일자별 정보 배열 */
  days: {
    /** 일자의 고유 식별자 */
    dayId: number;
    /** 일차 (1일차, 2일차, ...) */
    day: number;
    /** 해당 일자의 방문 장소 목록 */
    locations: {
      /** 방문 순서 */
      visitOrder: number;
      /** 장소 정보 */
      places: {
        /** 장소의 고유 식별자 */
        placeId: number;
        /** 장소 이름 */
        name: string;
        /** 장소 주소 */
        address: string;
        /** 위도 */
        latitude: number;
        /** 경도 */
        longitude: number;
        /** 장소 카테고리 */
        category: string;
        /** 장소 이미지 URL */
        imageUrl: string | null;
      };
    }[];
  }[];
};

/**
 * 계획 카드에 표시되는 정보 타입
 */
export type PlanCardType = {
  /** 계획의 고유 식별자 */
  planId: number;
  /** 계획의 대표 이미지 URL */
  planImg: string;
  /** 계획의 제목 */
  title: string;
  /** 계획의 설명 */
  description: string;
  /** 작성자 닉네임 */
  nickname: string;
  /** 여행 시작일 */
  travelStartDate: string;
  /** 여행 종료일 */
  travelEndDate: string;
  /** 좋아요 여부 */
  isLiked: boolean;
};

/**
 * 수평형 계획 카드 컴포넌트의 props 타입
 */
export type PlanHorizontalCardProps = {
  /** 계획 정보 */
  plan: Plan;
  /** 작성자 닉네임 (선택적) */
  nickname?: string;
  /** 수정 핸들러 함수 */
  onEdit?: (id: number) => void;
  /** 삭제 핸들러 함수 */
  onDelete?: (id: number) => void;
};

/**
 * 수직형 계획 카드 컴포넌트의 props 타입
 */
export type PlanVerticalCardProps = {
  /** 계획 카드 정보 */
  plan: PlanCardType;
};

/**
 * 계획 필터링 옵션 타입
 */
export type PlanFilterOptions = {
  /** 제목 검색 */
  title?: string;
  /** 시작일 */
  startDate?: string;
  /** 종료일 */
  endDate?: string;
  /** 공개 여부 */
  isPublic?: boolean;
};

/**
 * 필터 타입 (최신순, 인기순, 제목순)
 */
export type FilterType =
  | (typeof FILTER_TYPES)[keyof typeof FILTER_TYPES]
  | null;

/**
 * 공개 설정 옵션 타입
 */
export type PublicOption = (typeof PUBLIC_OPTIONS)[keyof typeof PUBLIC_OPTIONS];

/**
 * 필터 상태 타입
 */
export type FilterState = {
  /** 필터 타입 */
  type: FilterType;
  /** 필터 값 */
  value: string;
};

/**
 * 여행 계획 데이터 타입
 */
export type PlanType = {
  /** 계획의 고유 식별자 */
  planId: number;
  /** 계획의 대표 이미지 URL */
  planImg: string;
  /** 계획의 제목 */
  title: string;
  /** 계획의 설명 */
  description: string;
  /** 작성자 닉네임 */
  nickname: string;
  /** 여행 시작일 */
  travelStartDate: string;
  /** 여행 종료일 */
  travelEndDate: string;
  /** 좋아요 여부 */
  isLiked: boolean;
};

export type PlanState = {
  // 여행 기간
  startDate: Date | null;
  endDate: Date | null;
  setStartDate: (date: Date | null) => void;
  setEndDate: (date: Date | null) => void;

  // 계획 기본 정보
  title: string;
  description: string;
  planImg: string;
  isReadOnly: boolean;
  setTitle: (title: string) => void;
  setDescription: (description: string) => void;
  setPlanImg: (planImg: string) => void;
  setIsReadOnly: (isReadOnly: boolean) => void;

  // 일정 관련 정보
  dayPlaces: DayPlaces; // 일정별 장소 정보
  setDayPlaces: (dayPlaces: DayPlaces) => void;
  activeTab: TabType; // 현재 활성화된 탭
  setActiveTab: (activeTab: TabType) => void;
};

/**
 * 일정 모달 상태 타입
 */
export type ScheduleModalStore = {
  isDeleteModalOpen: boolean;
  isSaveModalOpen: boolean;
  isPublicModalOpen: boolean;
  dayToDelete: number | null;
  setIsDeleteModalOpen: (isOpen: boolean) => void;
  setIsSaveModalOpen: (isOpen: boolean) => void;
  setIsPublicModalOpen: (isOpen: boolean) => void;
  setDayToDelete: (day: number | null) => void;
};

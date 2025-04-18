import { CategoryType } from './category.type';
import { Place } from './search.type';

/**
 * 계획 상세 페이지에서 사용되는 타입들
 */

/**
 * 계획의 댓글 정보를 나타내는 타입
 */
export type CommentType = {
  /** 댓글의 고유 식별자 */
  planCommentId: number;
  /** 댓글 작성자의 사용자 ID */
  userId: string;
  /** 댓글 작성자의 닉네임 */
  nickname: string;
  /** 댓글 내용 */
  content: string;
  /** 댓글 작성 시간 */
  createdAt: Date;
};

/**
 * 북마크된 장소 정보를 나타내는 타입
 */
export type BookmarkedPlace = {
  /** 장소의 고유 식별자 */
  place_id: number;
  /** 장소의 제목 */
  title: string;
  /** 장소의 카테고리 */
  category: CategoryType;
  /** 장소의 대표 이미지 URL */
  image: string;
  /** 북마크 생성 시간 */
  created_at: string;
};

/**
 * 드래그 앤 드롭 기능을 위한 고유 ID가 추가된 장소 타입
 * 중복된 장소 데이터에 대한 중복 동작을 방지하기 위해 사용
 */
export type PlaceWithUniqueId = Place & {
  /** 장소의 고유 식별자 (UUID 형식) */
  uniqueId: string;
};

/**
 * 일자별 장소 목록을 저장하는 타입
 * key: 일자 (1, 2, 3, ...)
 * value: 해당 일자의 장소 목록
 */
export type DayPlaces = {
  [key: number]: PlaceWithUniqueId[];
};

/**
 * 탭의 타입을 나타내는 타입
 * '전체보기' 또는 일자 (1, 2, 3, ...)
 */
export type TabType = '전체보기' | number;

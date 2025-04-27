import { Dispatch, RefObject, SetStateAction } from 'react';

import { CamelCaseObject } from './common.type';
import { PATH } from '@/constants/path.constants';

/** 모달의 링크 path를 제한하는 타입 */
export type ModalPath =
  | typeof PATH.ACCOUNT
  | typeof PATH.BOOKMARKS
  | typeof PATH.LIKES
  | typeof PATH.COMMENTS
  | typeof PATH.RESERVATIONS;

/** 모달의 props 타입 */
export type MypageModalProps = {
  userId: string;
  onLinkClick: (path: ModalPath) => void;
  setClose: () => void;
  modalRef: RefObject<HTMLDivElement>;
  className?: string;
};

/** 유저의 북마크 목록에서 사용하는 북마크 타입 */
type UserBookmarkRow = {
  id: number;
  place_id: number;
  title: string;
  image: string;
  created_at: string;
  category: string;
  content_type_id: number;
  address: string;
  lng: number;
  lat: number;
};
export type UserBookmark = CamelCaseObject<UserBookmarkRow>;

export type ProfileImageButtonProps = {
  onEdit: () => void;
  onDelete: () => void;
};

export type ProfileModalProps = {
  isModalOpen: boolean;
  setModalOpen: Dispatch<SetStateAction<boolean>>;
};

/** 항공권 예약 카드에 들어가는 예약 내역 타입 */
export type ReservationType = {
  airplaneName: string;
  arriveLocation: string;
  arriveTime: string;
  carrierCode: string;
  createdAt: string;
  departureLocation: string;
  departureTime: string;
  price: number | null;
  ticketId: number;
  userId: string;
  size: number;
  class: string | null;
};

/** 항공권 예약 페이지 카드의 각 장소 정보 props 타입 */
export type FlightInfoType = {
  dateTime: string;
  size: number;
  location: string;
  airplaneName: string;
  carrierCode: string;
};

import { Dispatch, RefObject, SetStateAction } from 'react';

import { CamelCaseObject } from './common.type';
import { Database } from './supabase.type';

/** 모달의 링크 path를 제한하는 타입 */
export type ModalPath =
  | '/account'
  | '/bookmarks'
  | '/likes'
  | '/comments'
  | '/reservations';

/** 모달의 props 타입 */
export type MypageModalProps = {
  userId: string;
  onLinkClick: (path: ModalPath) => void;
  setClose: () => void;
  modalRef: RefObject<HTMLDivElement>;
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
  userId: string;
  isModalOpen: boolean;
  setModalOpen: Dispatch<SetStateAction<boolean>>;
};

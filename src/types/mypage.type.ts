import { Dispatch, RefObject, SetStateAction } from 'react';
import { Database } from './supabase.type';
import { CamelCaseObject } from './common.type';

/** 모달의 링크 path를 제한하는 타입 */
export type ModalPath =
  | '/account'
  | '/bookmarks'
  | '/likes'
  | '/comments'
  | '/reservations';

/** 모달의 props 타입 */
export type MypageModalProps = {
  onLinkClick: (path: ModalPath) => void;
  setClose: () => void;
  modalRef: RefObject<HTMLDivElement>;
};

/** 유저의 북마크 목록에서 사용하는 북마크 타입 */
type UserBookmarkRows =
  Database['public']['Functions']['get_user_bookmarks']['Returns'];
export type UserBookmarks = CamelCaseObject<UserBookmarkRows>;

export type ProfileImageButtonProps = {
  onEdit: () => void;
  onDelete: () => void;
};

export type ProfileModalProps = {
  userId: string;
  isModalOpen: boolean;
  setModalOpen: Dispatch<SetStateAction<boolean>>;
};

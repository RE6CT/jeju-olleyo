import { RefObject } from 'react';

export type ModalPath =
  | 'profile'
  | 'bookmarks'
  | 'likes'
  | 'comments'
  | 'reservations';

export type MypageModalProps = {
  onLinkClick: (path: ModalPath) => void;
  setClose: () => void;
  modalRef: RefObject<HTMLDivElement>;
};

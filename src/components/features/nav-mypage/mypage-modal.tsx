'use client';

import Image from 'next/image';
import { Button } from '../../ui/button';
import { Separator } from '../../ui/separator';
import { Dispatch, MouseEvent, RefObject, SetStateAction } from 'react';

type MypageModalProps = {
  onLinkClick: (path: string) => void;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  modalRef: RefObject<HTMLDivElement>;
};

/**
 * nav의 마이페이지 버튼 클릭 시 나타나는 모달 컴포넌트
 * @param onLinkClick - 링크 클릭시 실행되는 이벤트 핸들러
 * @param setIsOpen - 모달 오픈 여부 set 함수
 * @param modalRef - 모달에 전달할 모달 ref
 */
const MypageModal = ({
  onLinkClick,
  setIsOpen,
  modalRef,
}: MypageModalProps) => {
  /**
   * 로그아웃 버튼 이벤트 핸들러
   * @param e - 이벤트
   */
  const handleSignout = (e: MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    const isConfirmed = confirm('로그아웃하시겠습니까?');
    if (!isConfirmed) return;

    // 여기에 로그아웃 로직
    setIsOpen(false);
  };

  return (
    <div
      ref={modalRef}
      className="absolute right-10 top-full flex flex-col gap-3 border p-3 text-black"
    >
      <section
        onClick={() => onLinkClick('profile')}
        className="flex cursor-pointer"
      >
        <Image src="" alt="" width={58} height={58} />
        <div className="flex flex-col">
          <div className="flex">
            <h3 className="whitespace-nowrap font-semibold">리왹트</h3>
            <Button onClick={(e) => handleSignout(e)} variant="outline">
              로그아웃
            </Button>
          </div>
          re6ct@email.com
        </div>
      </section>
      <Separator />
      <section>
        <ul className="flex justify-between">
          <li
            onClick={() => onLinkClick('bookmarks')}
            className="flex cursor-pointer flex-col items-center"
          >
            <h5>장소</h5>
            <Image src="" alt="" width={50} height={50} />
            <span>123개</span>
          </li>
          <li
            onClick={() => onLinkClick('likes')}
            className="flex cursor-pointer flex-col items-center"
          >
            <h5>일정</h5>
            <Image src="" alt="" width={50} height={50} />
            <span>123개</span>
          </li>
          <li
            onClick={() => onLinkClick('comments')}
            className="flex cursor-pointer flex-col items-center"
          >
            <h5>댓글</h5>
            <Image src="" alt="" width={50} height={50} />
            <span>123개</span>
          </li>
        </ul>
      </section>
      <Separator />
      <section className="text-center">
        <span
          onClick={() => onLinkClick('reservation')}
          className="cursor-pointer"
        >
          항공권 예약 내역
        </span>
      </section>
    </div>
  );
};

export default MypageModal;

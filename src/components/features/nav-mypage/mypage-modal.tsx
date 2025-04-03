'use client';

import Image from 'next/image';
import { Button } from '../../ui/button';
import { Separator } from '../../ui/separator';

type MypageModalProps = {
  onLinkClick: (path: string) => void;
};

const MypageModal = ({ onLinkClick }: MypageModalProps) => {
  return (
    <div className="absolute right-10 top-full flex flex-col gap-3 border p-3 text-black">
      <section
        onClick={() => onLinkClick('profile')}
        className="flex cursor-pointer"
      >
        <Image src="" alt="" width={58} height={58} />
        <div className="flex flex-col">
          <div className="flex">
            <h3 className="whitespace-nowrap font-semibold">리왹트</h3>
            <Button variant="outline">로그아웃</Button>
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

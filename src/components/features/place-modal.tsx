import React from 'react';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';
import { Button } from '../ui/button';
import { Bookmark } from 'lucide-react';

const PlaceModal = () => {
  return (
    <Dialog>
      <DialogTrigger>
        <Button>상세보기</Button>
      </DialogTrigger>
      <DialogContent className="w-[370px] p-6">
        <div className="space-y-4">
          <div className="flex h-80 w-80 items-center justify-center rounded-md bg-gray-200">
            <span className="text-sm text-gray-600">장소 이미지 1개</span>
          </div>

          <div className="flex items-start justify-between">
            <div>
              <span className="border px-2 py-0.5 text-xs">명소</span>
              <h2 className="mt-2 text-lg font-semibold">새별 오름</h2>
              <p className="text-sm text-muted-foreground">
                서귀포시 어쩌구 저쩌구: 주소
              </p>
              <p className="mt-1 text-xs text-gray-400">
                야경이 아름다운 어쩌구 명소: 관광공사 api 내 장소 디스크립션
                가져오면 될듯
              </p>
            </div>
            <Bookmark className="h-5 w-5 cursor-pointer text-gray-500" />
          </div>

          <ul className="mt-2 list-inside list-disc space-y-1 text-xs text-gray-500">
            <li>이름</li>
            <li>주소</li>
            <li>전화번호</li>
            <li>영업시간</li>
          </ul>

          <Button className="mt-4 w-full">내 일정에 추가하기</Button>

          <div>
            <h3 className="mb-2 mt-6 text-sm font-medium">댓글</h3>
            <div className="text-sm text-muted-foreground">
              장소 댓글: 카카오 리뷰
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default PlaceModal;

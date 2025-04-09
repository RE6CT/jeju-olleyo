import React from 'react';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';
import { Button } from '../../ui/button';
import { Bookmark } from 'lucide-react';

type PlaceType = {
  address: string;
  category: string;
  content_type_id: number;
  id: number;
  image: string | null;
  lat: number;
  lng: number;
  place_id: number;
  title: string;
};

type PlaceModalProps = {
  place: PlaceType;
};

const PlaceModal = ({ place }: PlaceModalProps) => {
  return (
    <Dialog>
      <DialogTrigger>
        <Button>상세보기</Button>
      </DialogTrigger>
      <DialogContent className="max-h-[90vh] w-[370px]">
        <div className="max-h-[80vh] space-y-4 overflow-y-auto overflow-x-hidden p-4">
          <div className="flex h-80 w-80 items-center justify-center rounded-md bg-gray-200">
            <span className="text-sm text-gray-600">장소 이미지 1개</span>
          </div>

          <div className="flex items-start justify-between">
            <div>
              <span className="border px-2 py-0.5 text-xs">
                {place.category}
              </span>
              <h2 className="mt-2 text-lg font-semibold">{place.title}</h2>
              <p className="text-sm text-muted-foreground">{place.address}</p>
              <p className="mt-1 text-xs text-gray-400">
                야경이 아름다운 어쩌구 명소: 관광공사 api 내 장소 디스크립션
                가져오면 될듯
              </p>
            </div>
            <Bookmark className="h-5 w-5 cursor-pointer text-gray-500" />
          </div>

          <ul className="mt-2 list-inside list-disc space-y-1 text-xs text-gray-500">
            <li>전화번호</li>
            <li>영업시간</li>
          </ul>

          <Button className="mt-4 w-full">내 일정에 추가하기</Button>

          <div>
            <h3 className="mb-2 mt-6 text-sm font-medium">
              해당 장소가 포함된 일정
            </h3>
            <div className="text-sm text-muted-foreground">
              장소 댓글: 카카오 리뷰
            </div>
            <div className="text-sm text-muted-foreground">
              장소 댓글: 카카오 리뷰
            </div>
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

import React from 'react';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';
import { Button } from '../../ui/button';
import { Bookmark } from 'lucide-react';
import PlaceImage from '@/components/commons/place-image';

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

type DetailInfoType = {
  phone?: string;
  openTime?: string;
  closeDay?: string;
};

type PlaceModalProps = {
  place: PlaceType;
  detailInfo?: DetailInfoType;
};

const PlaceModal = ({ place, detailInfo }: PlaceModalProps) => {
  return (
    <Dialog>
      <DialogTrigger>
        <Button>상세보기</Button>
      </DialogTrigger>
      <DialogContent className="max-h-[90vh] w-[370px]">
        <div className="max-h-[80vh] space-y-4 overflow-y-auto overflow-x-hidden p-4">
          <div className="relative aspect-square">
            <PlaceImage image={place.image} title={place.title} />
          </div>

          <div className="flex items-start justify-between">
            <div>
              <span className="border px-2 py-0.5 text-xs">
                {place.category}
              </span>
              <h2 className="mt-2 text-lg font-semibold">{place.title}</h2>
              <p className="text-sm text-muted-foreground">{place.address}</p>
            </div>
            <Bookmark className="h-5 w-5 cursor-pointer text-gray-500" />
          </div>

          <ul className="mt-2 list-inside list-disc space-y-1 text-xs text-gray-500">
            <li>
              운영시간:{' '}
              {detailInfo
                ? `${detailInfo.openTime || '영업시간 미제공'}${
                    detailInfo.closeDay ? ` (휴무: ${detailInfo.closeDay})` : ''
                  }`
                : '휴무일 미제공'}
            </li>
            <li>{detailInfo?.phone || '전화번호 미제공'}</li>
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

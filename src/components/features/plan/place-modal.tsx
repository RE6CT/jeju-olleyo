import { Bookmark } from 'lucide-react';
import React from 'react';

import CategoryBadge from '@/components/commons/category-badge';
import PlaceImage from '@/components/commons/place-image';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';
import { CategoryType } from '@/types/category.type';
import { PlaceModalProps } from '@/types/place-modal.type';

import { Button } from '../../ui/button';


const PlaceModal = ({ place, detailInfo }: PlaceModalProps) => {
  const isHotel = place.content_type_id === 32;

  const rawSummary = isHotel
    ? detailInfo
      ? `${detailInfo.openTime || '체크인/아웃 시간 정보 없음'}`
      : '정보 없음'
    : detailInfo
      ? `${detailInfo.openTime || '운영 시간 정보 없음'}${
          detailInfo.closeDay ? ` (휴무: ${detailInfo.closeDay})` : ''
        }`
      : '정보 없음';

  const openSummary = rawSummary.replace(/<br\s*\/?>/gi, '\n');
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
              <CategoryBadge
                category={place.category as CategoryType}
                badgeType="modal"
              />
              <h2 className="mt-2 text-lg font-semibold">{place.title}</h2>
              <p className="text-sm text-muted-foreground">{place.address}</p>
            </div>
            <Bookmark className="h-5 w-5 cursor-pointer text-gray-500" />
          </div>

          <ul className="mt-2 list-inside list-disc space-y-1 text-xs text-gray-500">
            <li>
              {isHotel ? '체크인/체크아웃' : '운영시간'}: {openSummary}
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

import React from 'react';
import PlaceSidemenu from '../features/sidemenu/place-sidemenu';
import CommentsSection from '../features/comment/comments-section';
import {
  usePlanActiveTab,
  usePlanDayPlaces,
  usePlanId,
  usePlanIsReadOnly,
  usePlanSetDayPlaces,
} from '@/zustand/plan.store';
import { usePlanSidemenu } from '@/lib/hooks/use-sidemenu';
import { useGetComments } from '@/lib/queries/use-get-comments';

const PlanSidemenu = () => {
  const planId = usePlanId();
  const isReadOnly = usePlanIsReadOnly();
  const activeTab = usePlanActiveTab();
  const dayPlaces = usePlanDayPlaces();
  const setDayPlaces = usePlanSetDayPlaces();
  const { data: comments } = useGetComments(planId);

  const { handleAddPlace } = usePlanSidemenu(
    dayPlaces,
    setDayPlaces,
    isReadOnly,
  );

  return (
    <div className="sticky top-4 mt-4 md:w-[212px] lg:w-[280px]">
      <div className="h-fit">
        {!isReadOnly && (
          <div className="flex flex-col">
            <PlaceSidemenu
              selectedDay={
                activeTab === '전체보기' ? null : (activeTab as number)
              }
              onAddPlace={(place) => handleAddPlace(place, activeTab)}
            />
          </div>
        )}
        {isReadOnly && (
          <div className="relative h-full border-gray-200">
            {/* 댓글 섹션 */}
            <CommentsSection comments={comments || []} planId={planId} />
          </div>
        )}
      </div>
    </div>
  );
};

export default PlanSidemenu;

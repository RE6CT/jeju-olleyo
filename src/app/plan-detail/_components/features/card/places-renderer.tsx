import { Draggable, Droppable } from 'react-beautiful-dnd';
import PlaceCard from './place-card';
import { Place } from '@/types/search.type';
import { useMemo } from 'react';

/**
 * 단일 일정 일자 내부 장소 목록 렌더러
 * @param day 일자
 * @param places 장소 목록
 * @param routeSummary 경로 요약
 * @param isReadOnly 읽기 전용 여부
 * @param onRemovePlace 장소 삭제 핸들러
 */
const PlacesRenderer = ({
  day,
  places,
  routeSummary,
  isReadOnly,
  onRemovePlace,
}: {
  day: number;
  places: (Place & { uniqueId: string })[];
  routeSummary?: {
    [key: number]: { distance: number; duration: number }[];
  };
  isReadOnly: boolean;
  onRemovePlace: (day: number, uniqueId: string) => void;
}) => {
  // places가 변경될 때마다 Draggable 컴포넌트를 다시 생성하지 않도록 useMemo 사용
  const draggableItems = useMemo(() => {
    if (places.length === 0) return null;

    // console.log(
    //   'places uniqueIds:',
    //   places.map((p) => p.uniqueId),
    // );
    return places.map((place, index) => {
      const currentRoute = routeSummary?.[day]?.[index];
      return (
        <Draggable
          key={place.uniqueId}
          draggableId={place.uniqueId}
          index={index}
          isDragDisabled={isReadOnly}
        >
          {(provided, snapshot) => (
            <div
              ref={provided.innerRef}
              {...provided.draggableProps}
              {...provided.dragHandleProps}
              className="relative mb-4"
            >
              <PlaceCard
                index={index + 1}
                dayNumber={day}
                category={place.category}
                title={place.title}
                address={place.address}
                distance={currentRoute?.distance}
                duration={currentRoute?.duration}
                imageUrl={place.image || ''}
                isLastItem={index === places.length - 1}
                onDelete={
                  !isReadOnly
                    ? () => onRemovePlace(day, place.uniqueId)
                    : undefined
                }
                isReadOnly={isReadOnly}
                isDragging={snapshot.isDragging}
              />
            </div>
          )}
        </Draggable>
      );
    });
  }, [day, isReadOnly, onRemovePlace, places, routeSummary]);

  // defaultProps 경고 해결을 위한 코드(react-beautiful-dnd)
  if (typeof window !== 'undefined') {
    const { error } = console;
    console.error = (...args: any) => {
      if (/defaultProps/.test(args[0])) return;
      error(...args);
    };
  }

  return (
    <Droppable droppableId={day.toString()}>
      {(provided) => (
        <div
          {...provided.droppableProps}
          ref={provided.innerRef}
          className="flex flex-col gap-4"
        >
          {draggableItems}
          {provided.placeholder}
        </div>
      )}
    </Droppable>
  );
};

export default PlacesRenderer;

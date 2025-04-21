import { Draggable, Droppable } from 'react-beautiful-dnd';
import PlaceCard from './place-card';
import { Place } from '@/types/search.type';

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
  if (places.length === 0) return null;

  return (
    <Droppable droppableId={day.toString()}>
      {(provided) => (
        <div
          {...provided.droppableProps}
          ref={provided.innerRef}
          className="flex flex-col gap-4"
        >
          {places.map((place, index) => {
            const summary = routeSummary?.[day]?.[index];
            return (
              <Draggable
                key={place.uniqueId}
                draggableId={place.uniqueId}
                index={index}
                isDragDisabled={isReadOnly}
              >
                {(provided) => (
                  <div
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                  >
                    <PlaceCard
                      index={index + 1}
                      dayNumber={day}
                      category={place.category}
                      title={place.title}
                      address={place.address}
                      distance={summary?.distance}
                      duration={summary?.duration}
                      imageUrl={place.image || ''}
                      isLastItem={index === places.length - 1}
                      onDelete={
                        !isReadOnly
                          ? () => onRemovePlace(day, place.uniqueId)
                          : undefined
                      }
                      isReadOnly={isReadOnly}
                    />
                  </div>
                )}
              </Draggable>
            );
          })}
          {provided.placeholder}
        </div>
      )}
    </Droppable>
  );
};

export default PlacesRenderer;

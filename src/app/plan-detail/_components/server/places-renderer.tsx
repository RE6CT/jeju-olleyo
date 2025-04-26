import { Draggable, Droppable } from '@hello-pangea/dnd';
import PlaceCard from '../client/features/card/place-card';
import { Place } from '@/types/search.type';
import { usePlanRouteSummary } from '@/zustand/plan.store';

/**
 * 단일 일정 일자 내부 장소 목록 렌더러
 * @param day 일자
 * @param places 장소 목록
 * @param isReadOnly 읽기 전용 여부
 * @param onRemovePlace 장소 삭제 핸들러
 */
const PlacesRenderer = ({
  day,
  places,
  isReadOnly,
  onRemovePlace,
}: {
  day: number;
  places: (Place & { uniqueId: string })[];
  isReadOnly: boolean;
  onRemovePlace: (day: number, uniqueId: string) => void;
}) => {
  const { routeSummary } = usePlanRouteSummary();

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
            const currentRoute = routeSummary[day]?.[index];
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
                    style={{
                      ...provided.draggableProps.style,
                      cursor: isReadOnly ? 'default' : 'grab',
                    }}
                  >
                    <div
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
                        placeId={place.placeId}
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

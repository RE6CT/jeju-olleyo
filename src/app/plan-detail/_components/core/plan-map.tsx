'use client';

import ErrorMessage from '@/app/error';
import Loading from '@/app/loading';
import Clusterer from '@/components/features/map/clusterer';
import KakaoMap from '@/components/features/map/kakao-map';
import Polyline from '@/components/features/map/polyline';
import {
  DEFAULT_MAP_OPTIONS,
  CLUSTERER_OPTIONS,
  POLYLINE_OPTIONS,
} from '@/constants/map.constants';
import { usePlanMap } from '@/lib/hooks/use-plan-map';
import { DayPlaces, TabType } from '@/types/plan-detail.type';

const PlanMap = ({
  dayPlaces,
  activeTab,
  setRouteSummary,
}: {
  dayPlaces: DayPlaces;
  activeTab: TabType;
  setRouteSummary: React.Dispatch<
    React.SetStateAction<{
      [key: number]: { distance: number; duration: number }[];
    }>
  >;
}) => {
  const {
    map,
    isLoading,
    error,
    markers,
    paths,
    handleMapLoad,
    handleMapError,
  } = usePlanMap({ dayPlaces, activeTab, setRouteSummary });

  return (
    <>
      <div className="sticky top-0 h-8 bg-slate-50"></div>
      <div className="sticky top-8 z-40 mt-4 h-[326px] w-full overflow-hidden rounded-[12px]">
        {isLoading && <Loading />}
        {error && <ErrorMessage message={error} />}
        <KakaoMap
          {...DEFAULT_MAP_OPTIONS}
          onMapLoad={handleMapLoad}
          onError={handleMapError}
        />
        {map && !isLoading && !error && (
          <>
            <Clusterer
              map={map}
              markers={markers}
              gridSize={CLUSTERER_OPTIONS.GRID_SIZE}
              minLevel={CLUSTERER_OPTIONS.MIN_LEVEL}
              minClusterSize={CLUSTERER_OPTIONS.MIN_CLUSTER_SIZE}
              disableClickZoom={CLUSTERER_OPTIONS.DISABLE_CLICK_ZOOM}
              styles={[...CLUSTERER_OPTIONS.STYLES]}
            />
            {Object.entries(paths).map(([day, path]) => {
              if (activeTab === '전체보기' || parseInt(day) === activeTab) {
                return (
                  <Polyline
                    key={day}
                    map={map}
                    path={path}
                    strokeWeight={POLYLINE_OPTIONS.STROKE_WEIGHT}
                    strokeColor={
                      parseInt(day) % 2 === 0
                        ? POLYLINE_OPTIONS.COLORS.EVEN
                        : POLYLINE_OPTIONS.COLORS.ODD
                    }
                    strokeOpacity={POLYLINE_OPTIONS.STROKE_OPACITY}
                    strokeStyle={POLYLINE_OPTIONS.STROKE_STYLE}
                  />
                );
              }
              return null;
            })}
          </>
        )}
      </div>
    </>
  );
};

export default PlanMap;

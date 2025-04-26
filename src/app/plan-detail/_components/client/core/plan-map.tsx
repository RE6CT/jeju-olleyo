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
import { MarkerProps } from '@/types/kakao-map.type';
import { memo } from 'react';
import { usePlanActiveTab, usePlanDayPlaces } from '@/zustand/plan.store';

const PlanMap = memo(() => {
  const dayPlaces = usePlanDayPlaces();
  const activeTab = usePlanActiveTab();

  const {
    map,
    isLoading,
    error,
    markers,
    paths,
    handleMapLoad,
    handleMapError,
  } = usePlanMap({ dayPlaces, activeTab });

  return (
    <>
      {/* 스크롤시 상단 overflow 내용 가리는 용도 */}
      <div className="sticky top-8 z-40 h-[228px] w-[656px] overflow-hidden rounded-[12px]">
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
              onMarkerClick={(marker: MarkerProps) => {
                if (marker.onClick) {
                  marker.onClick();
                }
              }}
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
});

PlanMap.displayName = 'PlanMap';

export default PlanMap;

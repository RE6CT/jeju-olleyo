# 카카오맵 컴포넌트 사용 가이드

## 목차

- [카카오맵 컴포넌트 사용 가이드](#카카오맵-컴포넌트-사용-가이드)
  - [목차](#목차)
  - [기본 사용법](#기본-사용법)
  - [마커 추가하기](#마커-추가하기)
  - [경로 그리기](#경로-그리기)
  - [클러스터링 사용하기](#클러스터링-사용하기)
  - [에러 처리](#에러-처리)
  - [주의사항](#주의사항)

## 기본 사용법

```tsx
import KakaoMap from '@/components/features/map/kakao-map';

const MapExample = () => {
  const handleMapLoad = (map) => {
    console.log('지도가 로드되었습니다!', map);
  };

  const handleError = (error) => {
    console.error('지도 로드 중 오류:', error);
  };

  return (
    <div className="h-[400px] w-full">
      <KakaoMap
        center={{ lat: 33.450701, lng: 126.570667 }}
        level={3}
        onMapLoad={handleMapLoad}
        onError={handleError}
      />
    </div>
  );
};
```

## 마커 추가하기

```tsx
import Clusterer from '@/components/features/map/clusterer';

const MapWithMarkers = () => {
  const [map, setMap] = useState(null);
  const markers = [
    {
      position: { lat: 33.450701, lng: 126.570667 },
      title: '제주도',
    },
    // ... 더 많은 마커
  ];

  return (
    <div className="h-[400px] w-full">
      <KakaoMap
        center={{ lat: 33.450701, lng: 126.570667 }}
        level={3}
        onMapLoad={setMap}
      />
      {map && <Clusterer map={map} markers={markers} />}
    </div>
  );
};
```

## 경로 그리기

```tsx
import Polyline from '@/components/features/map/polyline';

const MapWithPath = () => {
  const [map, setMap] = useState(null);
  const path = [
    { lat: 33.450701, lng: 126.570667 },
    { lat: 33.450936, lng: 126.569421 },
    // ... 더 많은 좌표
  ];

  return (
    <div className="h-[400px] w-full">
      <KakaoMap
        center={{ lat: 33.450701, lng: 126.570667 }}
        level={3}
        onMapLoad={setMap}
      />
      {map && (
        <Polyline
          map={map}
          path={path}
          strokeWeight={3}
          strokeColor="#db4040"
          strokeOpacity={0.7}
          strokeStyle="solid"
        />
      )}
    </div>
  );
};
```

## 클러스터링 사용하기

```tsx
const MapWithClustering = () => {
  const [map, setMap] = useState(null);
  const markers = [
    /* 많은 마커 데이터 */
  ];

  return (
    <div className="h-[400px] w-full">
      <KakaoMap
        center={{ lat: 33.450701, lng: 126.570667 }}
        level={7}
        onMapLoad={setMap}
      />
      {map && <Clusterer map={map} markers={markers} />}
    </div>
  );
};
```

## 에러 처리

```tsx
const MapWithErrorHandling = () => {
  const handleError = (error) => {
    // 사용자에게 에러 알림
    alert(`지도 로드 중 오류가 발생했습니다: ${error.message}`);

    // 에러 로깅
    console.error('카카오맵 에러:', error);
  };

  return (
    <div className="h-[400px] w-full">
      <KakaoMap
        center={{ lat: 33.450701, lng: 126.570667 }}
        level={3}
        onMapLoad={(map) => console.log('지도 로드 성공')}
        onError={handleError}
      />
    </div>
  );
};
```

## 주의사항

1. 환경 변수 설정

   - `.env.local` 파일에 카카오맵 API 키를 설정해야 합니다:

   ```
   NEXT_PUBLIC_KAKAO_MAP_API_KEY=your_api_key_here
   ```

2. 컨테이너 설정

   - 지도 컨테이너는 반드시 높이가 지정되어 있어야 합니다.
   - 예: `className="h-[400px]"` 또는 `style={{ height: '400px' }}`

'use client';

import { useEffect, useState } from 'react';
import { ProcessedDayWeather } from '@/types/home.weather.type';
import { weatherApi } from '@/lib/apis/home/home.weather.api';
import { weatherUtil } from '@/lib/utils/home.weather.util';
import useWeatherStore from '@/zustand/home.weather.store';

/**
 * 날씨 데이터 자동 갱신 컴포넌트
 *
 * @description 클라이언트에서 날씨 데이터를 갱신하고 스토어에 저장하는 역할을 합니다.
 * 컴포넌트를 렌더링하지 않고 백그라운드에서 데이터만 갱신합니다.
 */
export const WeatherRefresher = ({
  initialWeatherData,
}: {
  initialWeatherData: ProcessedDayWeather[];
}) => {
  const { setWeatherData, setLastUpdated } = useWeatherStore();
  const [refreshQueued, setRefreshQueued] = useState(false);

  // 초기 데이터 스토어에 저장
  useEffect(() => {
    if (initialWeatherData.length > 0) {
      setWeatherData(initialWeatherData);
      setLastUpdated(new Date().toISOString());
    }
  }, [initialWeatherData, setWeatherData, setLastUpdated]);

  // 자정에 데이터 갱신 설정
  useEffect(() => {
    // 자정까지의 시간 계산
    const msUntilMidnight = weatherUtil.calculateMsUntilMidnight();

    // 자정 갱신 타이머 설정
    const midnightTimer = setTimeout(() => {
      // 갱신 플래그 설정
      setRefreshQueued(true);
    }, msUntilMidnight);

    // 컴포넌트 언마운트 시 타이머 제거
    return () => clearTimeout(midnightTimer);
  }, []);

  // 갱신 플래그가 설정되면 날씨 데이터 갱신
  useEffect(() => {
    if (!refreshQueued) return;

    const refreshWeatherData = async () => {
      try {
        // 새로운 날씨 데이터 가져오기
        const newData = await weatherApi.getJejuWeather({ skipCache: true });

        if (newData.length > 0) {
          // 스토어 업데이트
          setWeatherData(newData);
          setLastUpdated(new Date().toISOString());
        }
      } catch (error) {
        console.error('날씨 데이터 갱신 오류:', error);
      } finally {
        // 갱신 플래그 초기화
        setRefreshQueued(false);

        // 다음 자정 갱신 설정
        const msUntilNextMidnight = weatherUtil.calculateMsUntilMidnight();
        setTimeout(() => {
          setRefreshQueued(true);
        }, msUntilNextMidnight);
      }
    };

    // 데이터 갱신 실행
    refreshWeatherData();
  }, [refreshQueued, setWeatherData, setLastUpdated]);

  // UI를 렌더링하지 않는 컴포넌트
  return null;
};

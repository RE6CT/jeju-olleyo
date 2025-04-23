'use client';

import { create } from 'zustand';

import { WeatherState } from '@/types/home.weather.type';

/**
 * 날씨 데이터 관리를 위한 Zustand 스토어
 * 서버에서 가져온 날씨 데이터를 클라이언트에서 관리하고 필요할 때 갱신합니다.
 */
const useWeatherStore = create<WeatherState>((set) => ({
  weatherData: [],
  lastUpdated: null,
  error: null,

  setWeatherData: (data) => set({ weatherData: data }),
  setLastUpdated: (timestamp) => set({ lastUpdated: timestamp }),
  setError: (error) => set({ error }),
}));

export default useWeatherStore;

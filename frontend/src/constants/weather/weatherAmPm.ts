import type { ValueOf } from '@/utils/shared';

export const WEATHER_AM_PM = {
  am: '오전',
  pm: '오후',
} as const;

export type WeatherAmPm = ValueOf<typeof WEATHER_AM_PM>;

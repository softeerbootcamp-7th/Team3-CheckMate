import { CDN_BASE_URL } from '@/constants/shared';
import type { WeatherForecastToday } from '@/types/weather';

// 임시 더미 데이터 -> 오늘 날씨 예보에 들어가는 데이터
// 경보 발령시
export const mockTodayForecastData: WeatherForecastToday = {
  mainText: '강한 비바람이 예상돼요',
  subText:
    '저녁 매장 방문 고객은 줄고, 테이크아웃·배달 수요가 늘 가능성이 있어요',
  weatherAlert: {
    iconPath: `${CDN_BASE_URL}/assets/images/heavy_rain.svg`,
    message: '폭우주의',
  },
};

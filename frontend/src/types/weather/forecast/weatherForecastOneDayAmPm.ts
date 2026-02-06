import type { WeatherForecastOneDayHalf } from './weatherForecastOneDayHalf';

// 하루 별 오전, 오후 날씨 예보
export interface WeatherForecastOneDayAmPm {
  date: Date; // 날짜 데이터 -> 여기서 월, 화, 수 등 뽑아낼 수 있음
  am: WeatherForecastOneDayHalf;
  pm: WeatherForecastOneDayHalf;
}

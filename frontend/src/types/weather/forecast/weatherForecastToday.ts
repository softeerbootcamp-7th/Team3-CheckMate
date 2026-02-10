// 오늘 날씨 예보
export interface WeatherForecastToday {
  mainText: string; // '강한 비바람'
  subText: string; // '저녁 매장 방문 고객은 줄고, 테이크아웃·배달 수요가 늘 가능성이 있어요',
  weatherAlert?: {
    // 날씨 특보가 있을때만 날라오는 데이터
    iconPath: string;
    message: string;
  };
}

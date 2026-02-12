// 라인 차트, 바 차트 공통 데이터 구조 정의
export interface ChartData {
  mainX: { amount: number | string | null }[];
  mainY: { amount: number | string | null }[];
}

export interface ChartSeries {
  data: ChartData;
  color: string;
}

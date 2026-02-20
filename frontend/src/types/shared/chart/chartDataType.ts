// 라인 차트, 바 차트 공통 데이터 구조 정의
export interface ChartDatum {
  amount: number | string | null;
  unit: string;
}
export interface ChartData {
  mainX: ChartDatum[];
  mainY: ChartDatum[];
}

export interface ChartSeries {
  data: ChartData;
  color: string;
}

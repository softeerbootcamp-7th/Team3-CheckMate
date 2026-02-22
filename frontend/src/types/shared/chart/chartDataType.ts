// 라인 차트, 바 차트 공통 데이터 구조 정의
export interface ChartDatum {
  amount: number | string | null;
  unit: string;
}
// 각 값의 이름(메뉴이름)까지 포함되어 있는 데이터 구조
export interface ChartDatumWithLabel extends ChartDatum {
  label: string;
}
export interface ChartData {
  mainX: ChartDatum[];
  mainY: ChartDatum[] | ChartDatumWithLabel[][];
}

export interface ChartSeries {
  data: ChartData;
  color: string;
}

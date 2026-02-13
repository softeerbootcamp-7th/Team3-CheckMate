import type { LineChartDatum } from '../line-chart';

// LineChartDatum과 동일한 구조를 가짐
// export interface LineChartDatum {
//   amount: number | string | null;
//   unit: string;
// }

export type BarChartDatum = LineChartDatum;

export interface BarChartData {
  mainX: BarChartDatum[]; // 시간 목록
  mainY: BarChartDatum[]; // 단일 막대 그래프 데이터 목록
}
export interface BarChartSeries {
  data: BarChartData;
  color: string;
}

// ======== 스택바에 사용되는 데이터 타입

// 스택 바의 한 조각 데이터
export interface StackBarSegment extends BarChartDatum {
  label: string; // 메뉴 이름, 카테고리 이름 등
  color?: string;
}
// 조각들 모인 스택바 데이터
export type StackBarDatum = StackBarSegment[];

// 퍼센테이지 정보 추가
export interface StackBarSegmentWithPercentage extends StackBarSegment {
  percentage: number;
}

export interface StackBarChartData {
  mainX: BarChartDatum[]; // 시간목록
  mainY: StackBarDatum[];
}

export interface StackBarChartSeries {
  data: StackBarChartData;
  color: string;
}

//======= 모든 바 차트 타입
export type AllBarChartSeries = BarChartSeries | StackBarChartSeries;

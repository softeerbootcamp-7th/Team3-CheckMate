import type { ChartDatum } from '../chart';

export interface LineChartData {
  mainX: ChartDatum[];
  subX: ChartDatum[];
  mainY: ChartDatum[];
  subY: ChartDatum[];
}

export interface LineChartSeries {
  data: LineChartData;
  color: string;
}

export interface Coordinate {
  x: number;
  y: number | null;
}

import type { ChartDatum } from '@/types/shared/chart';

export interface BarLineChartData {
  mainX: ChartDatum[];
  subX: ChartDatum[];
  mainY: ChartDatum[]; // bar
  subY: ChartDatum[]; // line
}

export interface BarLineChartSeries {
  data: BarLineChartData;
  color: string;
}

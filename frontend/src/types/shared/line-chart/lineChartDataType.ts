export interface LineChartDatum {
  amount: number | string | null;
  unit: string;
}

export interface LineChartData {
  mainX: LineChartDatum[];
  subX: LineChartDatum[];
  mainY: LineChartDatum[];
  subY: LineChartDatum[];
}

export interface LineChartSeries {
  data: LineChartData;
  color: string;
}

export interface Coordinate {
  x: number;
  y: number | null;
}

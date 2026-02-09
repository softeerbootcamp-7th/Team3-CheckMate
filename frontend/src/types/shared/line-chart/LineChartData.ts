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

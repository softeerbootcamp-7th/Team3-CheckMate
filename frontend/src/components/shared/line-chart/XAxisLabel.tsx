import type { LineChartSeries } from '@/types/shared';

interface XAxisLabelProps {
  cordinate: (number | null)[][];
  viewBoxHeight: number;
  series: LineChartSeries;
}

export const XAxisLabel = ({
  cordinate,
  viewBoxHeight,
  series,
}: XAxisLabelProps) => {
  return (
    <g className="flex justify-between">
      {cordinate.map(([x], index) => (
        <text
          key={index}
          x={x ?? 0}
          y={viewBoxHeight - 5}
          textAnchor="middle"
          className="text-grey-900 body-small-medium"
        >
          <tspan>{series.data.mainX[index].amount}</tspan>
        </text>
      ))}
    </g>
  );
};

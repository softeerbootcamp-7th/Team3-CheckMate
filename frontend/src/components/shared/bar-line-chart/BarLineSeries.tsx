import { BAR_CHART } from '@/constants/shared';

import { Bar } from '../bar-chart';
import { Dot } from '../line-chart';

interface BarLineSeriesProps {
  barX: number;
  barY: number;
  lineX: number;
  lineY: number;
  color: string;
  tooltipContentText: string;
  barWidth: number;
  barHeight: number;
  interactionPathD: string;
}

export const BarLineSeries = ({
  barX,
  barY,
  lineX,
  lineY,
  color,
  tooltipContentText,
  barWidth,
  barHeight,
  interactionPathD,
}: BarLineSeriesProps) => {
  return (
    <g>
      <path d={interactionPathD} fill="transparent" stroke="transparent" />
      <Dot
        x={lineX}
        y={lineY}
        color={color}
        ariaLabel={tooltipContentText}
        hasHoverEffect={false}
      />
      <Bar
        barMiddleX={barX}
        barTopY={barY}
        width={barWidth}
        height={barHeight}
        bgColor={color}
        radius={BAR_CHART.BAR_RADIUS}
        hasGradient
        barColorChangeOnHover={false}
      />
    </g>
  );
};

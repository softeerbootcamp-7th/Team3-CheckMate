import { useDrawBarLine } from '@/hooks/shared';
import type { Coordinate } from '@/types/shared';

import { BarLineSeries } from './BarLineSeries';
import { BarLineSeriesWithTooltip } from './BarLineSeriesWithTooltip';

interface BarLineSeriesRendererProps {
  barX: number;
  barY: number;
  lineX: number;
  lineY: number;
  color: string;
  tooltipContentText: string;
  hasXAxis: boolean;
  viewBoxHeight: number;
  viewBoxWidth: number;
  xCoordinate: Coordinate[];
  activeTooltip: boolean;
}

export const BarLineSeriesRenderer = ({
  barX,
  barY,
  lineX,
  lineY,
  color,
  tooltipContentText,
  hasXAxis,
  viewBoxHeight,
  viewBoxWidth,
  xCoordinate,
  activeTooltip,
}: BarLineSeriesRendererProps) => {
  const { barHeight, barWidth, interactionPathD } = useDrawBarLine({
    barX,
    barY,
    lineY,
    hasXAxis,
    viewBoxHeight,
    viewBoxWidth,
    xCoordinate,
  });

  if (!activeTooltip) {
    return (
      <BarLineSeries
        barX={barX}
        barY={barY}
        lineX={lineX}
        lineY={lineY}
        color={color}
        tooltipContentText={tooltipContentText}
        barWidth={barWidth}
        barHeight={barHeight}
        interactionPathD={interactionPathD}
      />
    );
  }

  return (
    <BarLineSeriesWithTooltip
      barX={barX}
      barY={barY}
      lineX={lineX}
      lineY={lineY}
      color={color}
      tooltipContentText={tooltipContentText}
      interactionPathD={interactionPathD}
      barWidth={barWidth}
      barHeight={barHeight}
    />
  );
};

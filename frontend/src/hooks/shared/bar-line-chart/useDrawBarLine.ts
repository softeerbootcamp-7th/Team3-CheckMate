import type { Coordinate } from '@/types/shared';
import { getBarHeight, getBarWidth } from '@/utils/shared';

interface UseDrawBarLineProps {
  barX: number;
  barY: number;
  lineY: number;
  hasXAxis: boolean;
  viewBoxHeight: number;
  viewBoxWidth: number;
  xCoordinate: Coordinate[];
}

export const useDrawBarLine = ({
  barX,
  barY,
  lineY,
  hasXAxis,
  viewBoxHeight,
  viewBoxWidth,
  xCoordinate,
}: UseDrawBarLineProps) => {
  const barHeight = getBarHeight({
    y: barY,
    hasXAxis,
    viewBoxHeight,
  });
  const barWidth = getBarWidth({ viewBoxWidth, xCoordinate });

  const tooltipTriggerMiddle = barX;
  const tooltipTriggerTop = Math.min(barY, lineY);
  const tooltipTriggerWidth = barWidth;
  const tooltipTriggerHeight = getBarHeight({
    y: Math.min(lineY, barY),
    hasXAxis,
    viewBoxHeight,
  });

  const bottomY = tooltipTriggerTop + tooltipTriggerHeight;
  const leftX = tooltipTriggerMiddle - tooltipTriggerWidth / 2;
  const rightX = tooltipTriggerMiddle + tooltipTriggerWidth / 2;

  const tooltipTriggerPathD = `
  M ${tooltipTriggerMiddle} ${tooltipTriggerTop}
  H ${leftX}
  V ${bottomY}
  H ${rightX}
  V ${tooltipTriggerTop}
  Z
  `;

  return {
    barHeight,
    barWidth,
    tooltipTriggerPathD,
  };
};

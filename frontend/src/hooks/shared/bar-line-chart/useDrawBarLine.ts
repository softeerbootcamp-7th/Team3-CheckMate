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
  const barWidth = getBarWidth({
    viewBoxWidth,
    xDataLength: xCoordinate.length,
  });

  const interactionMiddle = barX;
  const interactionTop = Math.min(barY, lineY);
  const interactionWidth = barWidth;
  const interactionHeight = getBarHeight({
    y: Math.min(lineY, barY),
    hasXAxis,
    viewBoxHeight,
  });

  const bottomY = interactionTop + interactionHeight;
  const leftX = interactionMiddle - interactionWidth / 2;
  const rightX = interactionMiddle + interactionWidth / 2;

  const interactionPathD = `
  M ${interactionMiddle} ${interactionTop}
  H ${leftX}
  V ${bottomY}
  H ${rightX}
  V ${interactionTop}
  Z
  `;

  return {
    barHeight,
    barWidth,
    interactionPathD,
  };
};

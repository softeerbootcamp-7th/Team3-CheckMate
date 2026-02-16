import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/shared/shadcn-ui';
import { BAR_CHART } from '@/constants/shared';
import { useDrawBarLine } from '@/hooks/shared';
import type { Coordinate } from '@/types/shared';

import { Bar } from '../bar-chart';
import { Dot } from '../line-chart';

interface BarLineSeriesProps {
  barX: number;
  barY: number;
  lineX: number;
  lineY: number;
  color: string;
  hasXAxis: boolean;
  viewBoxHeight: number;
  viewBoxWidth: number;
  xCoordinate: Coordinate[];
  tooltipContentText: string;
}

export const BarLineSeries = ({
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
}: BarLineSeriesProps) => {
  const { barHeight, barWidth, tooltipTriggerPathD } = useDrawBarLine({
    barX,
    barY,
    lineY,
    hasXAxis,
    viewBoxHeight,
    viewBoxWidth,
    xCoordinate,
  });

  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <g>
          <path
            d={tooltipTriggerPathD}
            fill="transparent"
            stroke="transparent"
            className="peer z-1"
            pointerEvents="all"
          />
          <Dot
            x={lineX}
            y={lineY}
            color={color}
            ariaLabel={tooltipContentText}
            hasHoverEffect
            className="peer-hover:brightness-75 peer-hover:saturate-200"
          />
          <Bar
            barMiddleX={barX}
            barTopY={barY}
            width={barWidth}
            height={barHeight}
            bgColor={color}
            radius={BAR_CHART.BAR_RADIUS}
            hasGradient
            barColorChangeOnHover
            className="peer-hover:[&_path]:fill-brand-main"
          />
        </g>
      </TooltipTrigger>
      <TooltipContent
        side="top"
        className="transition-duration-200 bg-black px-250! text-gray-50 [&_svg]:-translate-y-1 [&_svg]:rotate-0 [&_svg]:text-black"
      >
        <p className="text-grey-0 caption-medium-semibold">
          {tooltipContentText}
        </p>
      </TooltipContent>
    </Tooltip>
  );
};

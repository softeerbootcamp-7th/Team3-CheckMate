import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/shared/shadcn-ui';
import type { Coordinate, LineChartSeries } from '@/types/shared';
import { filterCoordinate } from '@/utils/shared';

import { Dot } from './Dot';

interface DotsProps {
  series: LineChartSeries;
  activeTooltip: boolean;
  tooltipContent: (...args: string[]) => string;
  coordinate: Coordinate[];
  color: string;
}

export const Dots = ({
  series,
  activeTooltip,
  tooltipContent,
  coordinate,
  color,
}: DotsProps) => {
  const filteredCoordinate = filterCoordinate(coordinate);
  if (!activeTooltip) {
    return (
      <>
        {filteredCoordinate.map(({ x, y }, index) => (
          <Dot
            key={index}
            x={x}
            y={y}
            color={color}
            ariaLabel={`${series.data.mainX[index].amount} ${series.data.mainX[index].unit}`}
            hasHoverEffect={false}
          />
        ))}
      </>
    );
  }

  return (
    <>
      {filteredCoordinate.map(({ x, y }, index) => {
        const mainYDatum = `${series.data.mainY[index].amount ?? ''}${series.data.mainY[index].unit ?? ''}`;
        const subYDatum = `${series.data.subY[index]?.amount ?? ''}${series.data.subY[index]?.unit ?? ''}`;
        const tooltipContentText = tooltipContent(mainYDatum, subYDatum);
        return (
          <Tooltip key={index}>
            <TooltipTrigger asChild>
              <g>
                <Dot
                  x={x}
                  y={y}
                  color={color}
                  ariaLabel={tooltipContentText}
                  hasHoverEffect={true}
                />
              </g>
            </TooltipTrigger>
            <TooltipContent
              side="top"
              className="rounded-150 bg-grey-900 [&_svg]:fill-grey-900 [&_svg]:-translate-y-1 [&_svg]:rotate-0"
            >
              <p className="text-grey-100 caption-medium-semibold">
                {tooltipContentText}
              </p>
            </TooltipContent>
          </Tooltip>
        );
      })}
    </>
  );
};

import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/shared/shadcn-ui';
import { LINE_CHART } from '@/constants/shared';
import type { LineChartSeries } from '@/types/shared';

interface DotsProps {
  series: LineChartSeries;
  activeTooltip: boolean;
  tooltipContent: (...args: string[]) => string;
  coordinate: (number | null)[][];
  color: string;
}

export const Dots = ({
  series,
  activeTooltip,
  tooltipContent,
  coordinate,
  color,
}: DotsProps) => {
  const { DOT_RADIUS } = LINE_CHART;

  const filteredCoordinate: number[][] = coordinate.filter(
    (point): point is number[] => point[1] !== null,
  );

  if (!activeTooltip) {
    return (
      <>
        {filteredCoordinate.map(([x, y], index) => (
          <circle
            key={index}
            cx={x}
            cy={y}
            r={DOT_RADIUS}
            fill={color}
            stroke="none"
            role="graphics-symbol"
            tabIndex={0}
            aria-label={`${series.data.mainX[index].amount} ${series.data.mainX[index].unit}`}
            style={{
              transition: 'cx 0.5s ease-in-out, cy 0.5s ease-in-out',
            }}
          />
        ))}
      </>
    );
  }

  return (
    <>
      {filteredCoordinate.map(([x, y], index) => {
        const mainYDatum = `${series.data.mainY[index].amount ?? ''}${series.data.mainY[index].unit ?? ''}`;
        const subYDatum = `${series.data.subY[index]?.amount ?? ''}${series.data.subY[index]?.unit ?? ''}`;
        const tooltipContentText = tooltipContent(mainYDatum, subYDatum);
        return (
          <Tooltip key={index}>
            <TooltipTrigger asChild>
              <circle
                cx={x}
                cy={y}
                r={DOT_RADIUS}
                fill={color}
                role="graphics-symbol"
                stroke="none"
                className="hover:brightness-75 hover:saturate-200"
                tabIndex={0}
                aria-label={tooltipContentText}
                style={{
                  transition: 'cx 0.5s ease-in-out, cy 0.5s ease-in-out',
                }}
              />
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

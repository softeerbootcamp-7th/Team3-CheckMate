import type { LineChartSeries } from '@/types/shared';

interface GetCoordinateArgs {
  svgRect: DOMRect;
  adjustedHeight: number;
  series: LineChartSeries;
  maximumY: number;
}

interface Coordinate {
  x: number;
  y: number | null;
}

export const getCoordinate = ({
  svgRect,
  adjustedHeight,
  series,
  maximumY,
}: GetCoordinateArgs): Coordinate[] => {
  const { width: svgWidth } = svgRect;
  const xDataLength = series.data.mainX.length;

  const intervalX = svgWidth / xDataLength;
  const lastX = intervalX * (xDataLength - 1);
  const offsetX = (svgWidth - lastX) / 2;

  return Array.from({ length: xDataLength }).map<Coordinate>((_, index) => {
    return {
      x: index * intervalX + offsetX,
      y:
        series.data.mainY[index].amount === null
          ? null
          : adjustedHeight -
            (Number(series.data.mainY[index].amount) / maximumY) *
              adjustedHeight,
    };
  });
};

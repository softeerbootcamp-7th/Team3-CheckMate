import type { ChartSeries } from '@/types/shared';

interface GetCoordinateArgs<T extends ChartSeries> {
  svgRect: DOMRect;
  adjustedHeight: number;
  series: T;
  maximumY: number;
}

interface Coordinate {
  x: number;
  y: number | null;
}

export const getCoordinateGeneric = <T extends ChartSeries>({
  svgRect,
  adjustedHeight,
  series,
  maximumY,
}: GetCoordinateArgs<T>): Coordinate[] => {
  const { width: svgWidth } = svgRect;
  const xDataLength = series.data.mainX.length;

  const intervalX = svgWidth / xDataLength;
  const lastX = intervalX * (xDataLength - 1);
  const offsetX = (svgWidth - lastX) / 2;

  return Array.from({ length: xDataLength }).map<Coordinate>((_, index) => {
    return {
      x: index * intervalX + offsetX,
      y:
        series.data.mainY[index]?.amount === null ||
        series.data.mainY[index]?.amount === undefined
          ? null
          : adjustedHeight -
            (Number(series.data.mainY[index].amount) / maximumY) *
              adjustedHeight,
    };
  });
};

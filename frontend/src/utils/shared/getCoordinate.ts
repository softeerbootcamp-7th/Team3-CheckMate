import type { ChartSeries } from '@/types/shared';

// 바, 라인 그래프에서 사용되는 데이터별 좌표 점 계산 유틸
interface GetCoordinateArgs<T extends ChartSeries> {
  svgWidth: number;
  adjustedHeight: number;
  series: T;
  maximumY: number;
}

interface Coordinate {
  x: number;
  y: number | null;
}

export const getCoordinate = <T extends ChartSeries>({
  svgWidth,
  adjustedHeight,
  series,
  maximumY,
}: GetCoordinateArgs<T>): Coordinate[] => {
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

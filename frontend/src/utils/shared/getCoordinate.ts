import type { ChartDatum } from '@/types/shared';

// 바, 라인 그래프에서 사용되는 데이터별 좌표 점 계산 유틸
interface GetCoordinateArgs {
  svgWidth: number;
  adjustedHeight: number;
  maximumY: number;
  xDataLength: number;
  yData: ChartDatum[];
}

interface Coordinate {
  x: number;
  y: number | null;
}

export const getCoordinate = ({
  svgWidth,
  adjustedHeight,
  maximumY,
  xDataLength,
  yData,
}: GetCoordinateArgs): Coordinate[] => {
  if (xDataLength === 0 || yData.length === 0 || maximumY === 0) {
    return [];
  }

  const intervalX = svgWidth / xDataLength;
  const lastX = intervalX * (xDataLength - 1);
  const offsetX = (svgWidth - lastX) / 2;

  return Array.from({ length: xDataLength }).map<Coordinate>((_, index) => {
    return {
      x: index * intervalX + offsetX,
      y:
        yData[index]?.amount === null || yData[index]?.amount === undefined
          ? null
          : adjustedHeight -
            (Number(yData[index].amount) / maximumY) * adjustedHeight,
    };
  });
};

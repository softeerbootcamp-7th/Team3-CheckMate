import type { Coordinate } from '@/types/shared';

export const getXCoordinate = ({
  svgWidth,
  xDataLength,
}: {
  svgWidth: number;
  xDataLength: number;
}): Coordinate[] => {
  const intervalX = svgWidth / xDataLength;
  const lastX = intervalX * (xDataLength - 1);
  const offsetX = (svgWidth - lastX) / 2;

  return Array.from({ length: xDataLength }).map<Coordinate>((_, index) => {
    return {
      x: index * intervalX + offsetX,
      y: 0,
    };
  });
};

import type { Coordinate } from '@/types/shared';

export const getXCoordinate = ({
  svgRect,
  xDataLength,
}: {
  svgRect: DOMRect;
  xDataLength: number;
}): Coordinate[] => {
  const { width: svgWidth } = svgRect;

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

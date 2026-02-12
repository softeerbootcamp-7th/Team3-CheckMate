import type { Coordinate } from '@/types/shared';

export const filterCoordinate = (coordinate: Coordinate[]) => {
  return coordinate.filter(
    (point): point is Omit<Coordinate, 'y'> & { y: number } => point.y !== null,
  );
};

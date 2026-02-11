import type { Coordinate } from '@/types/shared';
import { filterCoordinate } from '@/utils/shared';

interface UseDrawLinePathProps {
  coordinate: Coordinate[];
}

export const useDrawLinePath = ({ coordinate }: UseDrawLinePathProps) => {
  const filteredCoordinate = filterCoordinate(coordinate);
  const pathD = filteredCoordinate.reduce<string>((acc, { x, y }, index) => {
    if (index === 0) {
      return `M ${x} ${y}`;
    }
    return `${acc} L ${x} ${y}`;
  }, '');

  return {
    filteredCoordinate,
    pathD,
  };
};

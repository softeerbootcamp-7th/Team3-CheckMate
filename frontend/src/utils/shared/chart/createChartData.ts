import type { ChartDatum } from '@/types/shared';

export const createChartData = <T>(
  items: T[],
  pick: (item: T) => string | number,
  unit: string,
): ChartDatum[] => {
  return items.map((item) => ({
    amount: pick(item),
    unit,
  }));
};
